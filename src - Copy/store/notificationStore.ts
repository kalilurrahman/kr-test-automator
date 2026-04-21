import { create } from "zustand";

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
}

interface NotificationState {
  notifications: Notification[];
  addNotification: (title: string, message: string) => void;
  markAllRead: () => void;
  clearAll: () => void;
  unreadCount: () => number;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  addNotification: (title, message) =>
    set((state) => ({
      notifications: [
        { id: crypto.randomUUID(), title, message, timestamp: Date.now(), read: false },
        ...state.notifications,
      ].slice(0, 20),
    })),
  markAllRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),
  clearAll: () => set({ notifications: [] }),
  unreadCount: () => get().notifications.filter((n) => !n.read).length,
}));
