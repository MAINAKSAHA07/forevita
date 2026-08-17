import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { architectureLinks, architectureNodes, type ArchitectureId } from '../data/plan'

type ArchitectureGraphProps = {
  activeId: ArchitectureId
  onSelect: (id: ArchitectureId) => void
  reduced: boolean
  theme: 'light' | 'dark'
}

type LaidOut = {
  id: ArchitectureId
  label: string
  x: number
  y: number
  w: number
  h: number
}

export function ArchitectureGraph({ activeId, onSelect, reduced, theme }: ArchitectureGraphProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const svgEl = svgRef.current
    if (!wrap || !svgEl) return
    const svg = d3.select(svgEl)

    const render = () => {
      const width = wrap.clientWidth
      const compact = width < 720
      const height = compact ? 520 : 340
      const styles = getComputedStyle(wrap)
      const ink = styles.getPropertyValue('--ink').trim()
      const muted = styles.getPropertyValue('--muted').trim()
      const accent = styles.getPropertyValue('--accent').trim()
      const accentSoft = styles.getPropertyValue('--accent-soft').trim()
      const line = styles.getPropertyValue('--line').trim()
      const elevated = styles.getPropertyValue('--elevated').trim()

      svg.attr('viewBox', `0 0 ${width} ${height}`).attr('width', width).attr('height', height)
      svg.selectAll('*').remove()

      const nodeW = compact ? Math.min(width - 32, 200) : Math.min(128, (width - 48) / 4.4)
      const nodeH = compact ? 36 : 40
      const cols = 4
      const rows = 3

      const laid: LaidOut[] = architectureNodes.map((node) => {
        if (compact) {
          const index = architectureNodes.findIndex((item) => item.id === node.id)
          return {
            id: node.id,
            label: node.label,
            x: (width - nodeW) / 2,
            y: 16 + index * 62,
            w: nodeW,
            h: nodeH,
          }
        }
        const colGap = (width - nodeW * cols) / (cols + 1)
        const rowGap = (height - nodeH * rows) / (rows + 1)
        return {
          id: node.id,
          label: node.label,
          x: colGap + node.col * (nodeW + colGap),
          y: rowGap + node.row * (nodeH + rowGap),
          w: nodeW,
          h: nodeH,
        }
      })

      const byId = new Map(laid.map((node) => [node.id, node]))

      const linkPath = (source: LaidOut, target: LaidOut) => {
        const x1 = source.x + source.w / 2
        const y1 = source.y + source.h / 2
        const x2 = target.x + target.w / 2
        const y2 = target.y + target.h / 2
        if (compact) {
          return `M${x1},${source.y + source.h} C${x1},${y1 + 20} ${x2},${y2 - 20} ${x2},${target.y}`
        }
        const mx = (x1 + x2) / 2
        return `M${source.x + source.w},${y1} C${mx},${y1} ${mx},${y2} ${target.x},${y2}`
      }

      svg
        .append('g')
        .selectAll('path')
        .data(architectureLinks)
        .join('path')
        .attr('d', (d) => {
          const source = byId.get(d.source)
          const target = byId.get(d.target)
          if (!source || !target) return ''
          return linkPath(source, target)
        })
        .attr('fill', 'none')
        .attr('stroke', (d) => (d.source === activeId || d.target === activeId ? accent : line))
        .attr('stroke-width', (d) => (d.source === activeId || d.target === activeId ? 2 : 1.25))
        .attr('stroke-opacity', 0.9)

      const groups = svg
        .append('g')
        .selectAll('g.node')
        .data(laid)
        .join('g')
        .attr('class', 'node')
        .attr('transform', (d) => `translate(${d.x},${d.y})`)
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

      groups
        .append('rect')
        .attr('width', (d) => d.w)
        .attr('height', (d) => d.h)
        .attr('rx', 10)
        .attr('fill', (d) => (d.id === activeId ? accent : elevated))
        .attr('stroke', (d) => (d.id === activeId ? accent : line))
        .attr('tabindex', 0)
        .attr('role', 'button')
        .attr('aria-label', (d) => d.label)

      groups
        .append('text')
        .attr('x', (d) => d.w / 2)
        .attr('y', (d) => d.h / 2)
        .attr('dy', '0.35em')
        .attr('text-anchor', 'middle')
        .attr('fill', (d) => (d.id === activeId ? (theme === 'dark' ? ink : '#f4f7f5') : ink))
        .attr('font-size', compact ? 12 : 13)
        .attr('font-family', 'Outfit Variable, Outfit, sans-serif')
        .text((d) => d.label)

      void muted
      void accentSoft
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
      <svg
        ref={svgRef}
        className="h-[520px] w-full sm:h-[340px]"
        role="img"
        aria-label="How ForeVita surfaces, API, Supabase, OKF knowledge, Stripe, and Claude connect"
      />
    </div>
  )
}
