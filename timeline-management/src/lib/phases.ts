import { addWorkingDays } from '@/lib/workdays'

export const PHASE_ORDER = [
  'MOODBOARD',
  'LAYOUT',
  'DESIGN',
  'MATERIAL',
  'CONSTRUCTION',
] as const

export const DEFAULT_DURATIONS: Record<(typeof PHASE_ORDER)[number], number> = {
  MOODBOARD: 3,
  LAYOUT: 5,
  DESIGN: 10,
  MATERIAL: 4,
  CONSTRUCTION: 12,
}

export function buildSequentialPhases(start: Date) {
  const phases: {
    type: (typeof PHASE_ORDER)[number]
    index: number
    status: 'ACTIVE' | 'LOCKED'
    startDate: Date
    endDate: Date
  }[] = []

  let cursor = new Date(start)
  PHASE_ORDER.forEach((type, idx) => {
    const startDate = new Date(cursor)
    const endDate = addWorkingDays(startDate, DEFAULT_DURATIONS[type])
    phases.push({
      type,
      index: idx + 1,
      status: idx === 0 ? 'ACTIVE' : 'LOCKED',
      startDate,
      endDate,
    })
    cursor = new Date(endDate)
  })
  return phases
}

