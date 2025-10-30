import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { buildSequentialPhases } from '@/lib/phases'

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
    include: { phases: true }
  })
  return NextResponse.json(projects)
}

export async function POST(req: Request) {
  const data = await req.json()
  const { name, clientName, deadline } = data
  if (!name) return NextResponse.json({ error: 'name required' }, { status: 400 })

  const baseDate = new Date()
  const phaseSeeds = buildSequentialPhases(baseDate)
  const project = await prisma.project.create({
    data: {
      name,
      clientName: clientName ?? null,
      deadline: deadline ? new Date(deadline) : null,
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
    include: { phases: true },
  })

  return NextResponse.json(project)
}
