import { Type, Check } from "lucide-react";
import { useFontPreset } from "@/hooks/useFontPreset";
import { FONT_PRESETS } from "@/lib/fonts";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Header dropdown that lets the user pick a typography preset. The actual
 * CSS variables are flipped on <html> by the underlying hook, so every page
 * reflects the change instantly — no reload required.
 */
export function FontSwitcher() {
  const { preset, setPreset } = useFontPreset();
  const active = FONT_PRESETS.find((p) => p.id === preset);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-8 h-8 p-0 relative"
          title={`Typography: ${active?.label}`}
          aria-label="Switch typography preset"
        >
          <Type className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-64 bg-card border-border max-h-[70vh] overflow-y-auto"
      >
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Typography preset
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {FONT_PRESETS.map((p) => (
          <DropdownMenuItem
            key={p.id}
            onClick={() => setPreset(p.id)}
            className="cursor-pointer flex items-center gap-3 py-2"
          >
            <span
              className="w-9 h-9 rounded-md border border-border flex items-center justify-center text-base font-semibold shrink-0 bg-background"
              style={{ fontFamily: p.display }}
            >
              {p.sample}
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-sm leading-tight" style={{ fontFamily: p.body }}>
                {p.label}
              </div>
              <div className="text-[10px] text-muted-foreground truncate">
                {p.description}
              </div>
            </div>
            {p.id === preset && (
              <Check className="w-3.5 h-3.5 text-primary shrink-0" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
