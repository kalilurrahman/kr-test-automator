import { Link, useLocation } from "react-router-dom";
import { Settings, Download, Menu, X, User, LogOut, UserCircle, Keyboard } from "lucide-react";
import { useState } from "react";
import { useInstallPrompt } from "@/hooks/useInstallPrompt";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PaletteSwitcher } from "@/components/PaletteSwitcher";
import { NotificationBell } from "@/components/NotificationBell";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { to: "/", label: "Generate" },
  { to: "/sap", label: "SAP Tests" },
  { to: "/salesforce", label: "Salesforce" },
  { to: "/workday/index.html", label: "Workday", isExternal: true },
  { to: "/templates", label: "Templates" },
  { to: "/history", label: "History" },
  { to: "/collections", label: "Collections" },
  { to: "/compare", label: "Compare" },
];

const staticLinks = [
  { href: "/workday/index.html", label: "Workday" },
  { href: "/ServiceNow/index.html", label: "ServiceNow" },
  { href: "/Veeva/index.html", label: "Veeva" },
];

const KRHeader = () => {
  const location = useLocation();
  const { isInstallable, install } = useInstallPrompt();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { user, loading, signOut } = useAuth();

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border backdrop-blur-md bg-background/80">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* LEFT: KR Brand */}
          <a
            href="https://www.linkedin.com/in/kalilurrahman"
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

          {/* RIGHT: Nav + Auth + Install */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              link.isExternal ? (
                <a
                  key={link.to}
                  href={link.to}
                  className="px-3 py-1.5 text-sm rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                  {link.label}
                </a>
              ) : (
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
              )
            ))}

            {staticLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-sm rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-accent"
              >
                {link.label}
              </a>
            ))}

            {/* Auth */}
            {!loading && (
              user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="ml-2 gap-2">
                      <User className="w-4 h-4" />
                      <span className="max-w-[100px] truncate">{user.email?.split("@")[0]}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-card border-border">
                    <DropdownMenuItem onClick={() => window.location.href = "/profile"} className="gap-2 cursor-pointer">
                      <UserCircle className="w-4 h-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => window.location.href = "/settings"} className="gap-2 cursor-pointer">
                      <Settings className="w-4 h-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut()} className="gap-2 cursor-pointer">
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAuthOpen(true)}
                  className="ml-2 border-primary/30 text-primary hover:bg-primary/10"
                >
                  Sign In
                </Button>
              )
            )}

            <NotificationBell />
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("toggle-shortcuts-help"))}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              title="Keyboard shortcuts (Ctrl+/)"
            >
              <Keyboard className="w-4 h-4" />
            </button>
            <ThemeToggle />
            <PaletteSwitcher />

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
              link.isExternal ? (
                <a
                  key={link.to}
                  href={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 text-sm rounded-md text-muted-foreground hover:text-foreground"
                >
                  {link.label}
                </a>
              ) : (
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
              )
            ))}
            {staticLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 text-sm rounded-md text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            {!loading && !user && (
              <button
                onClick={() => { setAuthOpen(true); setMobileOpen(false); }}
                className="block w-full text-left px-3 py-2 text-sm rounded-md text-primary"
              >
                Sign In
              </button>
            )}
            {!loading && user && (
              <button
                onClick={() => { signOut(); setMobileOpen(false); }}
                className="block w-full text-left px-3 py-2 text-sm rounded-md text-muted-foreground"
              >
                Sign Out
              </button>
            )}
          </div>
        )}
      </header>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </>
  );
};

export default KRHeader;
