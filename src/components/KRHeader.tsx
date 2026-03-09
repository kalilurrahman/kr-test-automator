import { Link, useLocation } from "react-router-dom";
import { Settings, Download, Menu, X } from "lucide-react";
import { useState } from "react";
import { useInstallPrompt } from "@/hooks/useInstallPrompt";

const navLinks = [
  { to: "/", label: "Generate" },
  { to: "/templates", label: "Templates" },
  { to: "/history", label: "History" },
];

const KRHeader = () => {
  const location = useLocation();
  const { isInstallable, install } = useInstallPrompt();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border backdrop-blur-md bg-background/80">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* LEFT: KR Brand */}
        <a
          href="https://kalilurrahman.lovable.app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 group"
        >
          <div className="w-9 h-9 rounded-full bg-card border border-primary/30 flex items-center justify-center">
            <span className="text-sm font-bold text-primary" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              KR
            </span>
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-semibold text-foreground leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Kalilur Rahman
            </div>
            <div className="text-[10px] text-muted-foreground leading-tight">
              Global IT Executive · Builder
            </div>
          </div>
        </a>

        {/* CENTER: App name */}
        <Link to="/" className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-primary" />
          <span
            className="text-lg font-bold tracking-wide text-foreground"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            TestForge AI
          </span>
        </Link>

        {/* RIGHT: Nav + Install */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                location.pathname === link.to
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {isInstallable && (
            <button
              onClick={install}
              className="ml-2 px-3 py-1.5 text-sm rounded-md border border-primary/30 text-primary hover:bg-primary/10 flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Install
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2 text-sm rounded-md ${
                location.pathname === link.to
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default KRHeader;
