import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { stages } from '../data/plan'

type ShapeDepthProps = {
  reduced: boolean
  theme: 'light' | 'dark'
}

export function ShapeDepth({ reduced, theme }: ShapeDepthProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const svgEl = svgRef.current
    if (!wrap || !svgEl) return

    const svg = d3.select(svgEl)

    const render = () => {
      const width = wrap.clientWidth
      const compact = width < 420
      const height = compact ? Math.min(240, Math.max(200, width * 0.9)) : Math.min(300, Math.max(240, width * 0.62))
      const styles = getComputedStyle(wrap)
      const ink = styles.getPropertyValue('--ink').trim()
      const muted = styles.getPropertyValue('--muted').trim()
      const accent = styles.getPropertyValue('--accent').trim()
      const accentSoft = styles.getPropertyValue('--accent-soft').trim()
      const elevated = styles.getPropertyValue('--elevated').trim()

      svg.attr('viewBox', `0 0 ${width} ${height}`).attr('width', width).attr('height', height)
      svg.selectAll('*').remove()

      const cx = width / 2
      const cy = height / 2 + (compact ? 0 : 4)
      const outerR = Math.min(width, height) * (compact ? 0.32 : 0.36)
      const innerR = outerR * 0.62
      const depthR = outerR * 0.38

      const pie = d3.pie<(typeof stages)[number]>().value(1).padAngle(0.02).sort(null)
      const arcs = pie([...stages])
      const outerArc = d3.arc<d3.PieArcDatum<(typeof stages)[number]>>().innerRadius(innerR).outerRadius(outerR)
      const depthArc = d3
        .arc<d3.PieArcDatum<(typeof stages)[number]>>()
        .innerRadius(depthR)
        .outerRadius(innerR - 6)

      const root = svg.append('g').attr('transform', `translate(${cx},${cy})`)

      root
        .selectAll('path.shape')
        .data(arcs)
        .join('path')
        .attr('class', 'shape')
        .attr('d', (d) => outerArc(d) ?? '')
        .attr('fill', accent)
        .attr('opacity', theme === 'dark' ? 0.92 : 0.9)

      root
        .selectAll('path.depth')
        .data(arcs)
        .join('path')
        .attr('class', 'depth')
        .attr('d', (d) => depthArc(d) ?? '')
        .attr('fill', accentSoft)
        .attr('stroke', elevated)
        .attr('stroke-width', 1)

      root
        .append('circle')
        .attr('r', depthR - 8)
        .attr('fill', elevated)

      root
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '-0.15em')
        .attr('fill', ink)
        .attr('font-size', 22)
        .attr('font-weight', 560)
        .attr('font-family', 'Outfit Variable, Outfit, sans-serif')
        .text('7 / 7')

      root
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '1.25em')
        .attr('fill', muted)
        .attr('font-size', 11)
        .attr('font-family', 'IBM Plex Mono, ui-monospace, monospace')
        .text('stages present')

      if (!compact) {
        const labelArc = d3
          .arc<d3.PieArcDatum<(typeof stages)[number]>>()
          .innerRadius(outerR + 14)
          .outerRadius(outerR + 14)

        root
          .selectAll('text.code')
          .data(arcs)
          .join('text')
          .attr('transform', (d) => `translate(${labelArc.centroid(d)})`)
          .attr('text-anchor', 'middle')
          .attr('dy', '0.35em')
          .attr('fill', muted)
          .attr('font-size', 11)
          .attr('font-family', 'IBM Plex Mono, ui-monospace, monospace')
          .text((d) => d.data.code)
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
  }, [reduced, theme])

  return (
    <div ref={wrapRef} className="w-full min-w-0">
      <svg
        ref={svgRef}
        className="w-full"
        role="img"
        aria-label="All seven journey stages are present. Depth stays thin on each stage."
      />
    </div>
  )
}
