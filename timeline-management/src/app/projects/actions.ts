"use server"
import { prisma } from '@/lib/prisma'
import { buildSequentialPhases } from '@/lib/phases'

export async function createProject(formData: FormData) {
  const name = String(formData.get('name') || '').trim()
  const clientName = String(formData.get('clientName') || '').trim() || null
  const deadlineStr = String(formData.get('deadline') || '').trim()
  if (!name) throw new Error('Nama proyek wajib diisi')

  const baseDate = new Date()
  const phaseSeeds = buildSequentialPhases(baseDate)

  const project = await prisma.project.create({
    data: {
      name,
      clientName,
      deadline: deadlineStr ? new Date(deadlineStr) : null,
      status: 'NEW',
      currentPhase: 'MOODBOARD',
      phases: {
        create: phaseSeeds.map((p) => ({
          type: p.type as any,
          index: p.index,
          status: p.status as any,
          startDate: p.startDate,
          endDate: p.endDate,
        })),
      },
    },
  })
  return project
}

