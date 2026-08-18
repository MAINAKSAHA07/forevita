import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from 'recharts'
import { canvasCapabilityByArea } from '../data/plan'
import { count } from '../lib/format'

type WeekLoadProps = {
  theme: 'light' | 'dark'
}

const keys = ['Native', 'Plugin', 'Partial', 'Open', 'ForeVita'] as const

const labels: Record<(typeof keys)[number], string> = {
  Native: 'Native',
  Plugin: 'Plugin / SDK',
  Partial: 'Partial',
  Open: 'Open',
  ForeVita: 'ForeVita only',
}

export function WeekLoad({ theme }: WeekLoadProps) {
  const tick = theme === 'dark' ? '#9aa39c' : '#5c6560'
  const grid = theme === 'dark' ? '#2a322e' : '#d5dcd7'
  const fills =
    theme === 'dark'
      ? ['#1c4f36', '#4a8a68', '#8fcbaa', '#b7dcc8', '#24352c']
      : ['#143828', '#1c4f36', '#2f6a4a', '#4a8a68', '#8fcbaa']

  return (
    <div className="h-[240px] w-full min-w-0 sm:h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={[...canvasCapabilityByArea]} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <CartesianGrid stroke={grid} vertical={false} strokeDasharray="2 6" />
          <XAxis dataKey="area" tick={{ fill: tick, fontSize: 12, fontFamily: 'IBM Plex Mono' }} axisLine={false} tickLine={false} />
          <YAxis
            allowDecimals={false}
            tick={{ fill: tick, fontSize: 11, fontFamily: 'IBM Plex Mono' }}
            axisLine={false}
            tickLine={false}
            width={28}
          />
          <Tooltip
            cursor={{ fill: theme === 'dark' ? 'rgba(143,203,170,0.08)' : 'rgba(28,79,54,0.06)' }}
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null
              const total = payload.reduce((sum, entry) => sum + Number(entry.value ?? 0), 0)
              return (
                <div className="rounded-lg border border-line bg-elevated px-3 py-2 text-sm text-ink">
                  <p className="font-medium">
                    {label}: {count.format(total)}
                  </p>
                  <ul className="mt-1 space-y-0.5 text-muted">
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
          <Legend
            wrapperStyle={{ fontSize: 11, fontFamily: 'Outfit Variable, Outfit, sans-serif', color: tick }}
            formatter={(value) => labels[value as (typeof keys)[number]] ?? value}
          />
          {keys.map((key, index) => (
            <Bar key={key} dataKey={key} stackId="capability" fill={fills[index]} maxBarSize={42} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
