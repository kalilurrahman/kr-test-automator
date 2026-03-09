import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const shortcuts = [
  { keys: ["Ctrl", "G"], description: "Generate test script" },
  { keys: ["Ctrl", "Enter"], description: "Generate (alt shortcut)" },
  { keys: ["Ctrl", "S"], description: "Save (auto-saves on generate)" },
  { keys: ["Ctrl", "K"], description: "Focus search on History page" },
  { keys: ["Ctrl", "/"], description: "Show this help" },
  { keys: ["Esc"], description: "Close dialogs / blur focus" },
];

const isMac = typeof navigator !== "undefined" && /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);

export default function KeyboardShortcutsDialog({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-sm">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
        </DialogHeader>
        <div className="space-y-1 mt-2">
          {shortcuts.map((s) => (
            <div key={s.description} className="flex items-center justify-between py-2 px-1">
              <span className="text-sm text-muted-foreground">{s.description}</span>
              <div className="flex items-center gap-1">
                {s.keys.map((k) => (
                  <kbd
                    key={k}
                    className="inline-flex items-center justify-center min-w-[1.75rem] px-1.5 py-0.5 rounded border border-border bg-muted text-[11px] font-mono text-muted-foreground"
                  >
                    {k === "Ctrl" ? (isMac ? "⌘" : "Ctrl") : k}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
