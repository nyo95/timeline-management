import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="p-6 mx-auto max-w-5xl space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard Proyek</h1>
        <div className="space-x-2">
          <Link className="px-3 py-2 rounded bg-black text-white" href="#">Buat Proyek</Link>
          <Link className="px-3 py-2 rounded bg-gray-200" href="#">Timeline</Link>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded border p-4 bg-white">
          <h2 className="font-medium">Ringkasan</h2>
          <p className="text-sm text-gray-600">Kerangka awal siap. Tambahkan data proyek.</p>
        </div>
        <div className="rounded border p-4 bg-white">
          <h2 className="font-medium">Proyek Aktif</h2>
          <p className="text-sm text-gray-600">Tampilkan kartu proyek di sini.</p>
        </div>
        <div className="rounded border p-4 bg-white">
          <h2 className="font-medium">Notifikasi</h2>
          <p className="text-sm text-gray-600">Approval & deadline akan tampil di sini.</p>
        </div>
      </section>

      <section className="rounded border p-4 bg-white">
        <h2 className="font-medium mb-2">Gantt (Placeholder)</h2>
        <div className="h-32 grid grid-cols-12 gap-1">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="bg-gray-100 border text-xs flex items-center justify-center">{i + 1}</div>
          ))}
        </div>
      </section>
    </main>
  )
}

