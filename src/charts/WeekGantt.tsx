import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { ganttBars, streams, weeks, type StreamId } from '../data/plan'

const shortLabels: Record<StreamId, string> = {
  platform: 'Plat.',
  member: 'Member',
  ai: 'AI',
  clinician: 'Clin.',
  admin: 'Admin',
  qa: 'QA',
}

function shortLabel(id: StreamId) {
  return shortLabels[id]
}

type WeekGanttProps = {
  week: number
  onWeekChange: (week: number) => void
  reduced: boolean
  theme: 'light' | 'dark'
}

const WEEK_COUNT = weeks.length

export function WeekGantt({ week, onWeekChange, reduced, theme }: WeekGanttProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const weekRef = useRef(week)
  weekRef.current = week

  useEffect(() => {
    const wrap = wrapRef.current
    const svgEl = svgRef.current
    if (!wrap || !svgEl) return

    const svg = d3.select(svgEl)
    const styles = getComputedStyle(wrap)
    const ink = styles.getPropertyValue('--ink').trim()
    const muted = styles.getPropertyValue('--muted').trim()
    const accent = styles.getPropertyValue('--accent').trim()
    const accentSoft = styles.getPropertyValue('--accent-soft').trim()
    const line = styles.getPropertyValue('--line').trim()
    const duration = reduced ? 0 : 280

    const render = () => {
      const width = wrap.clientWidth
      const compact = width < 640
      const height = compact ? 240 : 300
      const margin = compact
        ? { top: 22, right: 4, bottom: 10, left: 58 }
        : { top: 24, right: 8, bottom: 16, left: 96 }
      const innerW = Math.max(width - margin.left - margin.right, 80)
      const innerH = height - margin.top - margin.bottom

      svg.attr('viewBox', `0 0 ${width} ${height}`).attr('width', width).attr('height', height)
      svg.selectAll('*').remove()

      const root = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

      const x = d3.scaleBand<number>().domain(d3.range(1, WEEK_COUNT + 1)).range([0, innerW]).padding(0.18)
      const y = d3.scaleBand<string>().domain(streams.map((s) => s.id)).range([0, innerH]).padding(0.28)

      const selected = weekRef.current
      const selectedX = x(selected)
      if (selectedX != null) {
        root
          .append('rect')
          .attr('x', selectedX - 4)
          .attr('y', -8)
          .attr('width', (x.bandwidth() ?? 0) + 8)
          .attr('height', innerH + 16)
          .attr('rx', 12)
          .attr('fill', accentSoft)
      }

      root
        .selectAll('text.week-label')
        .data(d3.range(1, WEEK_COUNT + 1))
        .join('text')
        .attr('class', 'week-label')
        .attr('x', (d) => (x(d) ?? 0) + x.bandwidth() / 2)
        .attr('y', -10)
        .attr('text-anchor', 'middle')
        .attr('fill', (d) => (d === selected ? accent : muted))
        .attr('font-size', 12)
        .attr('font-family', 'IBM Plex Mono, ui-monospace, monospace')
        .text((d) => `W${d}`)

      root
        .selectAll('text.stream-label')
        .data([...streams])
        .join('text')
        .attr('x', -12)
        .attr('y', (d) => (y(d.id) ?? 0) + (y.bandwidth() ?? 0) / 2)
        .attr('dy', '0.35em')
        .attr('text-anchor', 'end')
        .attr('fill', muted)
        .attr('font-size', compact ? 10 : 12)
        .attr('font-family', 'Outfit Variable, Outfit, sans-serif')
        .text((d) => (compact ? shortLabel(d.id) : d.label))

      const bars = root
        .selectAll('g.bar')
        .data(ganttBars)
        .join('g')
        .attr('class', 'bar')
        .style('cursor', 'pointer')

      bars
        .append('rect')
        .attr('x', (d) => x(d.week) ?? 0)
        .attr('y', (d) => y(d.stream) ?? 0)
        .attr('width', x.bandwidth())
        .attr('height', y.bandwidth())
        .attr('rx', 8)
        .attr('fill', (d) => (d.week === selected ? accent : ink))
        .attr('opacity', (d) => (d.week === selected ? 1 : theme === 'dark' ? 0.45 : 0.18))
        .attr('tabindex', 0)
        .attr('role', 'button')
        .attr('aria-label', (d) => `Week ${d.week}, ${d.label}`)

      bars
        .on('pointerdown', (event: PointerEvent, d) => {
          event.preventDefault()
          onWeekChange(d.week)
        })
        .on('keydown', (event: KeyboardEvent, d) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            onWeekChange(d.week)
          }
        })

      const hit = root
        .append('rect')
        .attr('fill', 'transparent')
        .attr('width', innerW)
        .attr('height', innerH)
        .style('cursor', 'ew-resize')
        .style('touch-action', 'none')

      let dragging = false
      let originX = 0
      let originWeek = selected
      const history: { t: number; x: number }[] = []

      const weekFromX = (px: number) => {
        const ratio = px / innerW
        return Math.max(1, Math.min(WEEK_COUNT, Math.ceil(ratio * WEEK_COUNT) || 1))
      }

      hit.on('pointerdown', (event: PointerEvent) => {
        const node = hit.node()
        if (!node) return
        node.setPointerCapture(event.pointerId)
        const [px] = d3.pointer(event, node)
        dragging = false
        originX = px
        originWeek = weekRef.current
        history.length = 0
        history.push({ t: performance.now(), x: px })
      })

      hit.on('pointermove', (event: PointerEvent) => {
        const node = hit.node()
        if (!node?.hasPointerCapture(event.pointerId)) return
        const [px] = d3.pointer(event, node)
        history.push({ t: performance.now(), x: px })
        if (history.length > 6) history.shift()
        if (!dragging && Math.abs(px - originX) > 10) dragging = true
        if (dragging) onWeekChange(weekFromX(px))
      })

      hit.on('pointerup', (event: PointerEvent) => {
        const node = hit.node()
        const [px] = d3.pointer(event, node)
        if (!dragging) {
          onWeekChange(weekFromX(px))
          return
        }
        const last = history.at(-1)
        const prev = history[0]
        let next = weekFromX(px)
        if (last && prev && last.t !== prev.t) {
          const velocity = ((last.x - prev.x) / (last.t - prev.t)) * 1000
          const projected = px + (velocity / 1000) * (0.998 / (1 - 0.998)) * 12
          next = weekFromX(projected)
        }
        onWeekChange(next || originWeek)
      })

      root
        .append('line')
        .attr('x1', 0)
        .attr('x2', innerW)
        .attr('y1', innerH + 10)
        .attr('y2', innerH + 10)
        .attr('stroke', line)
        .attr('stroke-width', 1)

      void duration
    }

    render()
    const observer = new ResizeObserver(render)
    observer.observe(wrap)
    return () => {
      observer.disconnect()
      svg.selectAll('*').remove()
    }
  }, [onWeekChange, reduced, theme, week])

  return (
    <div ref={wrapRef} className="w-full min-w-0">
      <svg ref={svgRef} className="h-[240px] w-full select-none sm:h-[300px]" role="img" aria-label="Five week delivery gantt by workstream" />
    </div>
  )
}
