import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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

  const project = await prisma.project.create({
    data: {
      name,
      clientName: clientName ?? null,
      deadline: deadline ? new Date(deadline) : null,
      status: 'NEW',
      currentPhase: 'MOODBOARD',
      phases: {
        create: [
          { type: 'MOODBOARD', index: 1, status: 'ACTIVE' },
          { type: 'LAYOUT', index: 2, status: 'LOCKED' },
          { type: 'DESIGN', index: 3, status: 'LOCKED' },
          { type: 'MATERIAL', index: 4, status: 'LOCKED' },
          { type: 'CONSTRUCTION', index: 5, status: 'LOCKED' },
        ],
      },
    },
    include: { phases: true },
  })

  return NextResponse.json(project)
}

