import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

function daysBetween(a: Date, b: Date) {
  const ms = Math.max(0, b.getTime() - a.getTime())
  return Math.ceil(ms / (1000 * 60 * 60 * 24))
}

export default async function TimelinePage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
    include: { phases: { orderBy: { index: 'asc' } } },
  })

  const allPhases = projects.flatMap(p => p.phases).filter(p => p.startDate && p.endDate)
  const start = allPhases.length ? new Date(Math.min(...allPhases.map(p => new Date(p.startDate!).getTime()))) : new Date()
  const end = allPhases.length ? new Date(Math.max(...allPhases.map(p => new Date(p.endDate!).getTime()))) : new Date()
  const totalDays = Math.max(1, daysBetween(start, end))

  return (
    <main className="p-6 mx-auto max-w-6xl space-y-6">
      <h1 className="text-2xl font-semibold">Timeline (Gantt)</h1>
      <div className="space-y-4">
        {projects.map((p) => (
          <section key={p.id} className="bg-white border rounded p-3">
            <div className="mb-2 flex items-center justify-between">
              <div className="font-medium">{p.name}</div>
              <div className="text-xs text-gray-600">{p.clientName ?? '-'} • {p.currentPhase}</div>
            </div>
            <div className="relative h-14 border rounded bg-gray-50 overflow-hidden">
              {p.phases.map((ph) => {
                if (!ph.startDate || !ph.endDate) return null
                const s = new Date(ph.startDate)
                const e = new Date(ph.endDate)
                const leftPct = (daysBetween(start, s) / totalDays) * 100
                const widthPct = (daysBetween(s, e) / totalDays) * 100
                const color = ph.status === 'ACTIVE' ? 'bg-yellow-400' : ph.status === 'APPROVED' ? 'bg-green-500' : 'bg-gray-400'
                return (
                  <div key={ph.id} className={`absolute top-2 h-10 text-[10px] text-white ${color} rounded`}
                       style={{ left: `${leftPct}%`, width: `${Math.max(1, widthPct)}%` }}>
                    <div className="px-2 py-1 truncate">{ph.type}</div>
                  </div>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}

