import { Bell } from "lucide-react";
import { useNotificationStore } from "@/store/notificationStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NotificationBell() {
  const { notifications, unreadCount, markAllRead, clearAll } = useNotificationStore();
  const count = unreadCount();

  return (
    <DropdownMenu onOpenChange={(open) => { if (open) markAllRead(); }}>
      <DropdownMenuTrigger asChild>
        <button className="relative p-1.5 text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="w-4 h-4" />
          {count > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
              {count > 9 ? "9+" : count}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 bg-card border-border">
        <div className="px-3 py-2 border-b border-border flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">Notifications</span>
          {notifications.length > 0 && (
            <button onClick={clearAll} className="text-[10px] text-muted-foreground hover:text-foreground">
              Clear all
            </button>
          )}
        </div>
        {notifications.length === 0 ? (
          <div className="px-3 py-6 text-center text-xs text-muted-foreground">
            No notifications yet
          </div>
        ) : (
          notifications.slice(0, 8).map((n) => (
            <DropdownMenuItem key={n.id} className="flex-col items-start gap-0.5 px-3 py-2 cursor-default">
              <span className="text-xs font-medium text-foreground">{n.title}</span>
              <span className="text-[11px] text-muted-foreground">{n.message}</span>
              <span className="text-[10px] text-muted-foreground/60">
                {formatTime(n.timestamp)}
              </span>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function formatTime(ts: number) {
  const diff = Date.now() - ts;
  if (diff < 60000) return "Just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  return `${Math.floor(diff / 3600000)}h ago`;
}
