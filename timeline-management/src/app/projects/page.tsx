import { prisma } from '@/lib/prisma'
import { createProject } from './actions'

export const dynamic = 'force-dynamic'

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
    include: { phases: { orderBy: { index: 'asc' } } },
  })

  return (
    <main className="p-6 mx-auto max-w-6xl space-y-8">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Proyek</h1>
      </header>

      <section className="rounded border bg-white p-4">
        <h2 className="font-medium mb-3">Buat Proyek</h2>
        <form action={createProject} className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input name="name" required placeholder="Nama proyek" className="border rounded px-3 py-2" />
          <input name="clientName" placeholder="Nama klien" className="border rounded px-3 py-2" />
          <input name="deadline" type="date" className="border rounded px-3 py-2" />
          <button type="submit" className="px-3 py-2 rounded bg-black text-white">Simpan</button>
        </form>
        <p className="text-xs text-gray-500 mt-2">Phases default akan dibuat (Moodboard → Construction) dengan durasi kerja standar.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {projects.map((p) => (
          <article key={p.id} className="rounded border bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{p.name}</h3>
                <p className="text-sm text-gray-600">Klien: {p.clientName ?? '-'} • Status: {p.status}</p>
              </div>
              <div className="text-right text-sm text-gray-600">
                <div>Current: {p.currentPhase}</div>
                <div>Deadline: {p.deadline ? new Date(p.deadline).toLocaleDateString('id-ID') : '-'}</div>
              </div>
            </div>
            <div className="mt-3">
              <div className="h-2 bg-gray-100 rounded">
                <div
                  className="h-2 bg-green-600 rounded"
                  style={{ width: `${Math.min(100, (p.phases.filter(x => x.status !== 'LOCKED').length / Math.max(1, p.phases.length)) * 100)}%` }}
                />
              </div>
              <div className="mt-2 grid grid-cols-5 gap-1 text-xs text-gray-700">
                {p.phases.map(ph => (
                  <div key={ph.id} className={`text-center px-2 py-1 rounded border ${ph.status === 'ACTIVE' ? 'bg-yellow-100 border-yellow-300' : ph.status === 'APPROVED' ? 'bg-green-100 border-green-300' : 'bg-gray-50'}`}>
                    {ph.type}
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}

