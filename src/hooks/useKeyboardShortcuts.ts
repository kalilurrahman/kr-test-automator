import { useEffect, useCallback } from "react";

interface UseKeyboardShortcutsOptions {
  onGenerate?: () => void;
  canGenerate?: boolean;
}

export function useKeyboardShortcuts({ onGenerate, canGenerate }: UseKeyboardShortcutsOptions) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Ctrl+Enter or Cmd+Enter to generate
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        if (canGenerate && onGenerate) onGenerate();
      }
      // Ctrl+S or Cmd+S — prevent default browser save
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        // Scripts auto-save on generation, so just show feedback is handled elsewhere
      }
    },
    [onGenerate, canGenerate]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}
