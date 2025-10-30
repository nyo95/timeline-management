import { create } from 'zustand'

type Notification = { id: string; message: string; type?: 'info' | 'success' | 'warn' | 'error' }

type Store = {
  items: Notification[]
  push: (n: Omit<Notification, 'id'>) => void
  remove: (id: string) => void
}

export const useNotifications = create<Store>((set) => ({
  items: [],
  push: (n) => set((s) => ({ items: [...s.items, { id: crypto.randomUUID(), ...n }] })),
  remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
}))

