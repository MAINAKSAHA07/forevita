import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { canvasCapability } from '../data/plan'
import { count } from '../lib/format'

type ScopeBarsProps = {
  theme: 'light' | 'dark'
}

export function ScopeBars({ theme }: ScopeBarsProps) {
  const tick = theme === 'dark' ? '#9aa39c' : '#5c6560'
  const grid = theme === 'dark' ? '#2a322e' : '#d5dcd7'
  const fill = theme === 'dark' ? '#8fcbaa' : '#1c4f36'

  return (
    <div className="h-[220px] w-full min-w-0 sm:h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={[...canvasCapability]}
          layout="vertical"
          margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
        >
          <CartesianGrid stroke={grid} horizontal={false} strokeDasharray="2 6" />
          <XAxis type="number" tick={{ fill: tick, fontSize: 11, fontFamily: 'IBM Plex Mono' }} axisLine={false} tickLine={false} />
          <YAxis
            type="category"
            dataKey="name"
            width={92}
            tick={{ fill: tick, fontSize: 11, fontFamily: 'Outfit Variable, Outfit, sans-serif' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: theme === 'dark' ? 'rgba(143,203,170,0.12)' : 'rgba(28,79,54,0.08)' }}
            content={({ active, payload }) => {
              if (!active || !payload?.[0]) return null
              const item = payload[0].payload as (typeof canvasCapability)[number]
              return (
                <div className="max-w-[28ch] rounded-lg border border-line bg-elevated px-3 py-2 text-sm text-ink shadow-sm">
                  <p>
                    {item.name}: {count.format(item.count)} of 238
                  </p>
                  <p className="mt-1 text-muted">{item.hint}</p>
                </div>
              )
            }}
          />
          <Bar dataKey="count" fill={fill} radius={[0, 8, 8, 0]} maxBarSize={22} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
