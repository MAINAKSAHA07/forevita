import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { risks } from '../data/plan'

type RiskId = (typeof risks)[number]['id']

type RiskBubblesProps = {
  activeId: RiskId
  onSelect: (id: RiskId) => void
  reduced: boolean
  theme: 'light' | 'dark'
}

export function RiskBubbles({ activeId, onSelect, reduced, theme }: RiskBubblesProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const svgEl = svgRef.current
    if (!wrap || !svgEl) return
    const svg = d3.select(svgEl)

    const render = () => {
      const width = wrap.clientWidth
      const compact = width < 520
      const height = compact ? 260 : 320
      const margin = compact
        ? { top: 12, right: 8, bottom: 32, left: 28 }
        : { top: 16, right: 12, bottom: 36, left: 40 }
      const styles = getComputedStyle(wrap)
      const ink = styles.getPropertyValue('--ink').trim()
      const muted = styles.getPropertyValue('--muted').trim()
      const accent = styles.getPropertyValue('--accent').trim()
      const line = styles.getPropertyValue('--line').trim()

      svg.attr('viewBox', `0 0 ${width} ${height}`).attr('width', width).attr('height', height)
      svg.selectAll('*').remove()

      const innerW = width - margin.left - margin.right
      const innerH = height - margin.top - margin.bottom
      const root = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

      const x = d3.scaleLinear().domain([1, 5.4]).range([0, innerW])
      const y = d3.scaleLinear().domain([1, 5.4]).range([innerH, 0])
      const r = d3.scaleSqrt().domain([2, 5]).range(compact ? [8, 20] : [10, 28])

      const axis = (g: d3.Selection<SVGGElement, unknown, null, undefined>, axisGen: d3.Axis<d3.NumberValue>) => {
        g.call(axisGen.ticks(4).tickSize(-innerH).tickPadding(8))
        g.selectAll('line').attr('stroke', line).attr('stroke-dasharray', '2 6')
        g.select('.domain').remove()
        g.selectAll('text').attr('fill', muted).attr('font-size', 11).attr('font-family', 'IBM Plex Mono, ui-monospace, monospace')
      }

      axis(root.append('g').attr('transform', `translate(0,${innerH})`) as never, d3.axisBottom(x))
      axis(root.append('g') as never, d3.axisLeft(y).tickSize(-innerW))

      root
        .append('text')
        .attr('x', innerW)
        .attr('y', innerH + 32)
        .attr('text-anchor', 'end')
        .attr('fill', muted)
        .attr('font-size', 11)
        .text('Likelihood')

      root
        .append('text')
        .attr('x', 0)
        .attr('y', -6)
        .attr('fill', muted)
        .attr('font-size', 11)
        .text('Impact')

      const nodes = root
        .selectAll('g.risk')
        .data([...risks])
        .join('g')
        .attr('class', 'risk')
        .attr('transform', (d) => `translate(${x(d.likelihood)},${y(d.impact)})`)
        .style('cursor', 'pointer')
        .on('pointerdown', (event: PointerEvent, d) => {
          event.preventDefault()
          onSelect(d.id)
        })
        .on('keydown', (event: KeyboardEvent, d) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            onSelect(d.id)
          }
        })

      nodes
        .append('circle')
        .attr('r', (d) => r(d.impact))
        .attr('fill', (d) => (d.id === activeId ? accent : ink))
        .attr('fill-opacity', (d) => (d.id === activeId ? 0.92 : theme === 'dark' ? 0.35 : 0.16))
        .attr('stroke', (d) => (d.id === activeId ? accent : ink))
        .attr('stroke-width', (d) => (d.id === activeId ? 2 : 1))
        .attr('tabindex', 0)
        .attr('role', 'button')
        .attr('aria-label', (d) => `${d.title}. Impact ${d.impact} of 5, likelihood ${d.likelihood} of 5.`)

      if (!compact) {
        nodes
          .append('text')
          .attr('text-anchor', 'middle')
          .attr('dy', '0.35em')
          .attr('fill', (d) => (d.id === activeId ? (theme === 'dark' ? ink : '#f4f7f5') : ink))
          .attr('font-size', 10)
          .attr('font-family', 'IBM Plex Mono, ui-monospace, monospace')
          .text((d) => d.title.split(' ')[0] ?? '')
      }

      void reduced
    }

    render()
    const observer = new ResizeObserver(render)
    observer.observe(wrap)
    return () => {
      observer.disconnect()
      svg.selectAll('*').remove()
    }
  }, [activeId, onSelect, reduced, theme])

  return (
    <div ref={wrapRef} className="w-full min-w-0">
      <svg ref={svgRef} className="h-[260px] w-full sm:h-[320px]" role="img" aria-label="Engagement risks plotted by impact and likelihood" />
    </div>
  )
}
