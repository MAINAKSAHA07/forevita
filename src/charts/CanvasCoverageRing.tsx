import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { canvasCapability } from '../data/plan'
import { count } from '../lib/format'

type CanvasCoverageRingProps = {
  theme: 'light' | 'dark'
}

const keys = ['Native', 'Plugin / SDK', 'Partial', 'Open', 'ForeVita only'] as const

export function CanvasCoverageRing({ theme }: CanvasCoverageRingProps) {
  const palette =
    theme === 'dark'
      ? ['#1c4f36', '#4a8a68', '#8fcbaa', '#b7dcc8', '#3d4a42']
      : ['#143828', '#1c4f36', '#2f6a4a', '#6ba584', '#9aa39c']

  const data = canvasCapability.map((item, index) => ({
    name: item.name,
    value: item.count,
    hint: item.hint,
    fill: palette[index],
  }))

  const total = canvasCapability.reduce((sum, item) => sum + item.count, 0)
  const onCanvas = canvasCapability
    .filter((item) => item.name !== 'ForeVita only')
    .reduce((sum, item) => sum + item.count, 0)
  const pct = Math.round((onCanvas / total) * 100)

  return (
    <div className="min-w-0">
      <div className="relative h-[200px] w-full sm:h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="58%"
            outerRadius="82%"
            paddingAngle={2}
            stroke="none"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.[0]) return null
              const item = payload[0].payload as (typeof data)[number]
              return (
                <div className="max-w-[26ch] rounded-lg border border-line bg-elevated/95 px-3 py-2 text-sm text-ink shadow-sm backdrop-blur-md">
                  <p>
                    {item.name}: {count.format(item.value)}
                  </p>
                  <p className="mt-1 text-xs text-muted">{item.hint}</p>
                </div>
              )
            }}
          />
        </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="tabular font-mono text-3xl font-medium text-ink sm:text-4xl">{pct}%</p>
          <p className="mt-1 max-w-[14ch] text-xs leading-snug text-muted">touch Canvas or need a platform decision</p>
        </div>
      </div>
      <ul className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1">
        {keys.map((label, index) => (
          <li key={label} className="inline-flex items-center gap-1.5 text-[11px] text-muted">
            <span className="size-2 shrink-0 rounded-full" style={{ background: palette[index] }} aria-hidden="true" />
            {label}
          </li>
        ))}
      </ul>
    </div>
  )
}
