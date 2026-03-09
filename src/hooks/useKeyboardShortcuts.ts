import { useEffect, useCallback } from "react";
import { toast } from "sonner";

interface UseKeyboardShortcutsOptions {
  onGenerate?: () => void;
  canGenerate?: boolean;
}

export function useKeyboardShortcuts({ onGenerate, canGenerate }: UseKeyboardShortcutsOptions) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey;

      // Ctrl/Cmd+G — Generate
      if (mod && e.key === "g") {
        e.preventDefault();
        if (canGenerate && onGenerate) onGenerate();
        else if (!canGenerate) toast.info("Fill in platform & business case to generate");
      }

      // Ctrl/Cmd+Enter — Generate (alt shortcut)
      if (mod && e.key === "Enter") {
        e.preventDefault();
        if (canGenerate && onGenerate) onGenerate();
      }

      // Ctrl/Cmd+S — prevent default (auto-saved)
      if (mod && e.key === "s") {
        e.preventDefault();
        toast.info("Scripts auto-save on generation");
      }

      // Escape — close any open dialog (blur active element)
      if (e.key === "Escape") {
        const active = document.activeElement as HTMLElement;
        active?.blur?.();
      }

      // Ctrl/Cmd+/ — show shortcuts help
      if (mod && e.key === "/") {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("toggle-shortcuts-help"));
      }

      // Ctrl/Cmd+K — focus search (if on history page)
      if (mod && e.key === "k") {
        const searchInput = document.querySelector<HTMLInputElement>('input[placeholder="Search scripts..."]');
        if (searchInput) {
          e.preventDefault();
          searchInput.focus();
        }
      }
    },
    [onGenerate, canGenerate]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}
