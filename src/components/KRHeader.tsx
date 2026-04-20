import { Link, useLocation } from "react-router-dom";
import { Settings, Download, Menu, X, User, LogOut, UserCircle, Keyboard, ChevronDown, LayoutDashboard, Info, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useInstallPrompt } from "@/hooks/useInstallPrompt";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PaletteSwitcher } from "@/components/PaletteSwitcher";
import { NotificationBell } from "@/components/NotificationBell";
import { Button } from "@/components/ui/button";
import { PRODUCT_CATALOG } from "@/data/productCatalog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const libraryLinks = [
  { to: "/templates", label: "Templates" },
  { to: "/history", label: "History" },
  { to: "/collections", label: "Collections" },
  { to: "/compare", label: "Compare" },
];

const KRHeader = () => {
  const location = useLocation();
  const { isInstallable, install } = useInstallPrompt();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { user, loading, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;
  const productActive = PRODUCT_CATALOG.some((p) => location.pathname === p.route || location.pathname.startsWith(p.route + "/"));
  const libraryActive = libraryLinks.some((l) => location.pathname === l.to);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border backdrop-blur-md bg-background/80">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-2">
          {/* LEFT: KR Brand */}
          <a
            href="https://www.linkedin.com/in/kalilurrahman"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 group shrink-0"
          >
            <div className="w-9 h-9 rounded-full bg-card border border-primary/30 flex items-center justify-center">
              <span className="text-sm font-bold text-primary" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                KR
              </span>
            </div>
            <div className="hidden lg:block">
              <div className="text-sm font-semibold text-foreground leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Kalilur Rahman
              </div>
              <div className="text-[10px] text-muted-foreground leading-tight">
                Global IT Executive · Builder
              </div>
            </div>
          </a>

          {/* CENTER: App name */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <Settings className="w-5 h-5 text-primary" />
            <span
              className="text-lg font-bold tracking-wide text-foreground hidden sm:inline"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              TestForge AI
            </span>
          </Link>

          {/* RIGHT: Nav + Auth + Install */}
          <div className="hidden lg:flex items-center gap-1">
            <NavLink to="/" label="Generate" active={isActive("/")} />
            <NavLink to="/dashboard" label="Dashboard" icon={LayoutDashboard} active={isActive("/dashboard")} />

            {/* Products dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors inline-flex items-center gap-1 ${
                    productActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  Products <ChevronDown className="w-3 h-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border-border w-64 max-h-[70vh] overflow-y-auto">
                <DropdownMenuLabel className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  All platforms
                </DropdownMenuLabel>
                {PRODUCT_CATALOG.map((p) => (
                  <DropdownMenuItem key={p.key} asChild>
                    <Link to={p.route} className="cursor-pointer flex items-center justify-between">
                      <span>{p.label}</span>
                      <span className="text-[10px] font-mono text-muted-foreground">{p.idPrefix}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Library dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors inline-flex items-center gap-1 ${
                    libraryActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  Library <ChevronDown className="w-3 h-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border-border">
                {libraryLinks.map((l) => (
                  <DropdownMenuItem key={l.to} asChild>
                    <Link to={l.to} className="cursor-pointer">{l.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <NavLink to="/about" label="About" icon={Info} active={isActive("/about")} />
            <NavLink to="/feedback" label="Feedback" icon={MessageSquare} active={isActive("/feedback")} />

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
              aria-label="Keyboard shortcuts"
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
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="lg:hidden border-t border-border bg-background px-4 py-3 max-h-[80vh] overflow-y-auto">
            <MobileLink to="/" label="Generate" onNavigate={closeMobile} active={isActive("/")} />
            <MobileLink to="/dashboard" label="Dashboard" onNavigate={closeMobile} active={isActive("/dashboard")} />

            <Accordion type="multiple" className="border-none">
              <AccordionItem value="products" className="border-none">
                <AccordionTrigger className="py-2 px-3 text-sm hover:no-underline">Products</AccordionTrigger>
                <AccordionContent className="pb-1">
                  <div className="pl-3 space-y-0.5">
                    {PRODUCT_CATALOG.map((p) => (
                      <Link
                        key={p.key}
                        to={p.route}
                        onClick={closeMobile}
                        className={`block px-3 py-1.5 text-sm rounded-md ${
                          isActive(p.route) ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {p.label}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="library" className="border-none">
                <AccordionTrigger className="py-2 px-3 text-sm hover:no-underline">Library</AccordionTrigger>
                <AccordionContent className="pb-1">
                  <div className="pl-3 space-y-0.5">
                    {libraryLinks.map((l) => (
                      <Link
                        key={l.to}
                        to={l.to}
                        onClick={closeMobile}
                        className={`block px-3 py-1.5 text-sm rounded-md ${
                          isActive(l.to) ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <MobileLink to="/about" label="About" onNavigate={closeMobile} active={isActive("/about")} />
            <MobileLink to="/feedback" label="Feedback" onNavigate={closeMobile} active={isActive("/feedback")} />

            {isInstallable && (
              <button
                onClick={() => { install(); closeMobile(); }}
                className="w-full text-left px-3 py-2 text-sm rounded-md text-primary inline-flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Install app
              </button>
            )}

            {!loading && !user && (
              <button
                onClick={() => { setAuthOpen(true); closeMobile(); }}
                className="block w-full text-left px-3 py-2 text-sm rounded-md text-primary"
              >
                Sign In
              </button>
            )}
            {!loading && user && (
              <button
                onClick={() => { signOut(); closeMobile(); }}
                className="block w-full text-left px-3 py-2 text-sm rounded-md text-muted-foreground"
              >
                Sign Out
              </button>
            )}
          </nav>
        )}
      </header>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </>
  );
};

const NavLink = ({
  to, label, icon: Icon, active,
}: { to: string; label: string; icon?: typeof LayoutDashboard; active: boolean }) => (
  <Link
    to={to}
    className={`px-3 py-1.5 text-sm rounded-md transition-colors inline-flex items-center gap-1.5 ${
      active ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-accent"
    }`}
  >
    {Icon && <Icon className="w-3.5 h-3.5" />}
    {label}
  </Link>
);

const MobileLink = ({
  to, label, onNavigate, active,
}: { to: string; label: string; onNavigate: () => void; active: boolean }) => (
  <Link
    to={to}
    onClick={onNavigate}
    className={`block px-3 py-2 text-sm rounded-md ${
      active ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
    }`}
  >
    {label}
  </Link>
);

export default KRHeader;
