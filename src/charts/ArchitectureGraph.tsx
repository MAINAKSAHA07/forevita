import { useEffect, useRef, useState } from 'react'
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

const layeredRows: ArchitectureId[][] = [
  ['member', 'clinician', 'admin'],
  ['api'],
  ['supabase', 'okf', 'stripe'],
  ['claude'],
]

type LayoutResult = {
  laid: LaidOut[]
  height: number
  minWidth?: number
}

function layoutLayered(width: number): LayoutResult {
  const pad = 16
  const gap = 10
  const rowGap = 22
  const nodeH = 40
  const laid: LaidOut[] = []
  let y = pad

  for (const row of layeredRows) {
    const count = row.length
    const nodeW = Math.max(96, Math.min(168, (width - pad * 2 - gap * (count - 1)) / count))
    const rowWidth = count * nodeW + (count - 1) * gap
    let x = (width - rowWidth) / 2

    for (const id of row) {
      const node = architectureNodes.find((item) => item.id === id)
      if (!node) continue
      laid.push({ id: node.id, label: node.label, x, y, w: nodeW, h: nodeH })
      x += nodeW + gap
    }

    y += nodeH + rowGap
  }

  return { laid, height: y + pad - rowGap }
}

function layoutWide(width: number): LayoutResult {
  const pad = 16
  const cols = 4
  const rows = 3
  const nodeH = 40
  const minNodeW = 96
  const maxNodeW = 132
  const nodeW = Math.max(minNodeW, Math.min(maxNodeW, (width - pad * 2 - 12 * (cols - 1)) / cols))
  const colGap = cols > 1 ? (width - pad * 2 - cols * nodeW) / (cols - 1) : 0
  const rowGap = 24
  const height = pad * 2 + rows * nodeH + (rows - 1) * rowGap

  const laid: LaidOut[] = architectureNodes.map((node) => ({
    id: node.id,
    label: node.label,
    x: pad + node.col * (nodeW + colGap),
    y: pad + node.row * (nodeH + rowGap),
    w: nodeW,
    h: nodeH,
  }))

  return { laid, height, minWidth: pad * 2 + cols * nodeW + (cols - 1) * colGap }
}

function linkPath(source: LaidOut, target: LaidOut, reduced: boolean) {
  const x1 = source.x + source.w / 2
  const y1 = source.y + source.h / 2
  const x2 = target.x + target.w / 2
  const y2 = target.y + target.h / 2
  const dx = x2 - x1
  const dy = y2 - y1

  if (reduced) {
    return `M${x1},${y1} L${x2},${y2}`
  }

  if (Math.abs(dx) >= Math.abs(dy)) {
    const sx = dx > 0 ? source.x + source.w : source.x
    const tx = dx > 0 ? target.x : target.x + target.w
    const mx = (sx + tx) / 2
    return `M${sx},${y1} C${mx},${y1} ${mx},${y2} ${tx},${y2}`
  }

  const sy = dy > 0 ? source.y + source.h : source.y
  const ty = dy > 0 ? target.y : target.y + target.h
  const my = (sy + ty) / 2
  return `M${x1},${sy} C${x1},${my} ${x2},${my} ${x2},${ty}`
}

export function ArchitectureGraph({ activeId, onSelect, reduced, theme }: ArchitectureGraphProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [graphHeight, setGraphHeight] = useState(340)

  useEffect(() => {
    const wrap = wrapRef.current
    const svgEl = svgRef.current
    if (!wrap || !svgEl) return
    const svg = d3.select(svgEl)

    const render = () => {
      const width = wrap.clientWidth
      const layered = width < 768
      const styles = getComputedStyle(wrap)
      const ink = styles.getPropertyValue('--ink').trim()
      const onAccent = styles.getPropertyValue('--on-accent').trim()
      const accent = styles.getPropertyValue('--accent').trim()
      const line = styles.getPropertyValue('--line').trim()
      const elevated = styles.getPropertyValue('--elevated').trim()

      const layout = layered ? layoutLayered(width) : layoutWide(width)
      const { laid, height } = layout
      const viewWidth = layout.minWidth ? Math.max(width, layout.minWidth) : width

      svg.attr('viewBox', `0 0 ${viewWidth} ${height}`).attr('width', viewWidth).attr('height', height)
      svg.selectAll('*').remove()
      setGraphHeight(height)

      const byId = new Map(laid.map((node) => [node.id, node]))

      svg
        .append('g')
        .selectAll('path')
        .data(architectureLinks)
        .join('path')
        .attr('d', (d) => {
          const source = byId.get(d.source)
          const target = byId.get(d.target)
          if (!source || !target) return ''
          return linkPath(source, target, Boolean(reduced))
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
        .attr('fill', (d) => (d.id === activeId ? onAccent : ink))
        .attr('font-size', layered ? 12 : 13)
        .attr('font-family', 'Outfit Variable, Outfit, sans-serif')
        .text((d) => d.label)
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
    <div ref={wrapRef} className="w-full min-w-0 overflow-x-auto [scrollbar-width:thin] md:overflow-visible">
      <svg
        ref={svgRef}
        className="block w-full min-w-0 md:min-w-full"
        style={{ height: graphHeight }}
        role="img"
        aria-label="How ForeVita surfaces, API, Supabase, OKF knowledge, Stripe, and Claude connect"
      />
    </div>
  )
}
