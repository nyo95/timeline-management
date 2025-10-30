export function addWorkingDays(start: Date, days: number) {
  const result = new Date(start)
  let added = 0
  while (added < days) {
    result.setDate(result.getDate() + 1)
    const d = result.getDay()
    if (d !== 0 && d !== 6) added++ // skip Minggu(0) & Sabtu(6)
  }
  return result
}

export function workingDaysBetween(start: Date, end: Date) {
  const s = new Date(start)
  const e = new Date(end)
  let count = 0
  while (s < e) {
    s.setDate(s.getDate() + 1)
    const d = s.getDay()
    if (d !== 0 && d !== 6) count++
  }
  return count
}

