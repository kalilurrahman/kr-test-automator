import { Palette as PaletteIcon, Check } from "lucide-react";
import { useThemePalette } from "@/hooks/useThemePalette";
import { PALETTES } from "@/lib/themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function PaletteSwitcher() {
  const { palette, setPalette } = useThemePalette();
  const active = PALETTES.find((p) => p.id === palette);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-8 h-8 p-0"
          title={`Theme palette: ${active?.label}`}
          aria-label="Switch theme palette"
        >
          <PaletteIcon className="w-4 h-4" />
          <span
            className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full ring-1 ring-background"
            style={{ background: active?.swatch }}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-card border-border">
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Theme palette
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {PALETTES.map((p) => (
          <DropdownMenuItem
            key={p.id}
            onClick={() => setPalette(p.id)}
            className="cursor-pointer flex items-center gap-3"
          >
            <span
              className="w-4 h-4 rounded-full ring-1 ring-border shrink-0"
              style={{ background: p.swatch }}
            />
            <div className="flex-1 min-w-0">
              <div className="text-sm leading-tight">{p.label}</div>
              <div className="text-[10px] text-muted-foreground truncate">
                {p.description}
              </div>
            </div>
            {p.id === palette && <Check className="w-3.5 h-3.5 text-primary shrink-0" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
