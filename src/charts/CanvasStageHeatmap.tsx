import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { canvasStageBreakdown } from '../data/plan'
import { count } from '../lib/format'

type CanvasStageHeatmapProps = {
  theme: 'light' | 'dark'
}

const keys = ['native', 'plugin', 'partial', 'open', 'forevita'] as const

const labels: Record<(typeof keys)[number], string> = {
  native: 'Native',
  plugin: 'Plugin',
  partial: 'Partial',
  open: 'Open',
  forevita: 'ForeVita',
}

export function CanvasStageHeatmap({ theme }: CanvasStageHeatmapProps) {
  const tick = theme === 'dark' ? '#9aa39c' : '#5c6560'
  const grid = theme === 'dark' ? '#2a322e' : '#d5dcd7'
  const fills =
    theme === 'dark'
      ? ['#1c4f36', '#4a8a68', '#8fcbaa', '#b7dcc8', '#3d4a42']
      : ['#143828', '#1c4f36', '#2f6a4a', '#6ba584', '#9aa39c']

  const data = canvasStageBreakdown.map((row) => ({ ...row }))

  return (
    <div className="h-[280px] w-full min-w-0 sm:h-[340px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 4, right: 8, left: 4, bottom: 0 }}
        >
          <CartesianGrid stroke={grid} horizontal={false} strokeDasharray="2 6" />
          <XAxis type="number" tick={{ fill: tick, fontSize: 10, fontFamily: 'IBM Plex Mono' }} axisLine={false} tickLine={false} />
          <YAxis
            type="category"
            dataKey="stage"
            width={72}
            tick={{ fill: tick, fontSize: 10, fontFamily: 'Outfit Variable, Outfit, sans-serif' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: theme === 'dark' ? 'rgba(143,203,170,0.08)' : 'rgba(28,79,54,0.06)' }}
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null
              return (
                <div className="rounded-lg border border-line bg-elevated/95 px-3 py-2 text-sm text-ink shadow-sm backdrop-blur-md">
                  <p className="font-medium">{label}</p>
                  <ul className="mt-1 space-y-0.5 text-xs text-muted">
                    {payload
                      .filter((entry) => Number(entry.value) > 0)
                      .map((entry) => (
                        <li key={String(entry.dataKey)}>
                          {labels[entry.dataKey as (typeof keys)[number]]}: {count.format(Number(entry.value))}
                        </li>
                      ))}
                  </ul>
                </div>
              )
            }}
          />
          {keys.map((key, index) => (
            <Bar key={key} dataKey={key} stackId="stage" fill={fills[index]} radius={index === keys.length - 1 ? [0, 4, 4, 0] : 0} maxBarSize={14} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
