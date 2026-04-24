import { Link, useLocation } from "react-router-dom";
import {
  Settings, Download, Menu, X, User, LogOut, UserCircle, Keyboard, ChevronDown,
  LayoutDashboard, Info, MessageSquare, Factory, Package, Cpu, TestTube2, BookOpen,
} from "lucide-react";
import { useState } from "react";
import { useInstallPrompt } from "@/hooks/useInstallPrompt";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PaletteSwitcher } from "@/components/PaletteSwitcher";
import { FontSwitcher } from "@/components/FontSwitcher";
import { NotificationBell } from "@/components/NotificationBell";
import { Button } from "@/components/ui/button";
import { groupProductsByFamily } from "@/data/productFamilies";
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

/**
 * Top-level navigation order (per latest IA refresh):
 *   Industries → Products/Platforms → Services → Generated Scenarios →
 *   Dashboard → Downloads → More (library) → README → (Config / Settings)
 *
 * README sits immediately before the user / settings cluster on the right
 * so reference docs are the last thing users see before account controls.
 * "Generate" stays as the entry to "/" so users can always jump back to the
 * generator without losing the new IA.
 */
const PRIMARY_LINKS = [
  { to: "/industries", label: "Industries", icon: Factory, match: "/industries" },
  { to: "/platforms", label: "Products", icon: Package, match: "/platforms" },
  { to: "/services", label: "Services", icon: Cpu, match: "/services" },
  { to: "/scenarios", label: "Scenarios", icon: TestTube2, match: "/scenarios" },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, match: "/dashboard" },
  { to: "/downloads", label: "Downloads", icon: Download, match: "/downloads" },
  { to: "/readme", label: "README", icon: BookOpen, match: "/readme" },
] as const;

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
  const startsWith = (path: string) => location.pathname === path || location.pathname.startsWith(path + "/");
  const libraryActive = libraryLinks.some((l) => location.pathname === l.to);
  const productGroups = groupProductsByFamily();

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border backdrop-blur-md bg-background/80">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-2">
          {/* LEFT: KR Brand → portfolio */}
          <a
            href="https://kalilurrahman.lovable.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 group shrink-0"
            aria-label="Kalilur Rahman portfolio"
            title="Kalilur Rahman portfolio"
          >
            <div className="w-9 h-9 rounded-full bg-card border border-primary/30 flex items-center justify-center group-hover:border-primary transition-colors">
              <span className="text-sm font-bold text-primary" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                KR
              </span>
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
            <NavLink to="/industries" label="Industries" icon={Factory} active={startsWith("/industries")} />

            {/* Products dropdown (grouped by family) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors inline-flex items-center gap-1 ${
                    startsWith("/platforms") || location.pathname.startsWith("/p/") || isActive("/sap") || isActive("/salesforce")
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  <Package className="w-3.5 h-3.5" />
                  Products <ChevronDown className="w-3 h-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border-border w-72 max-h-[70vh] overflow-y-auto">
                <DropdownMenuItem asChild>
                  <Link to="/platforms" className="cursor-pointer font-medium">
                    Browse all products →
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {productGroups.map((group) => (
                  <div key={group.family.key} className="py-1">
                    <DropdownMenuLabel className="text-[10px] uppercase tracking-wider text-muted-foreground py-1">
                      {group.family.label}
                    </DropdownMenuLabel>
                    {group.products.map((p) => (
                      <DropdownMenuItem key={p.key} asChild>
                        <Link to={p.route} className="cursor-pointer flex items-center justify-between text-sm">
                          <span className="truncate">{p.label}</span>
                          <span className="text-[10px] font-mono text-muted-foreground ml-2">{p.idPrefix}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <NavLink to="/services" label="Services" icon={Cpu} active={startsWith("/services")} />
            <NavLink to="/scenarios" label="Scenarios" icon={TestTube2} active={startsWith("/scenarios")} />
            <NavLink to="/dashboard" label="Dashboard" icon={LayoutDashboard} active={isActive("/dashboard")} />
            <NavLink to="/downloads" label="Downloads" icon={Download} active={startsWith("/downloads")} />

            {/* Library dropdown (kept for templates/history/etc.) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors inline-flex items-center gap-1 ${
                    libraryActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  More <ChevronDown className="w-3 h-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border-border">
                {libraryLinks.map((l) => (
                  <DropdownMenuItem key={l.to} asChild>
                    <Link to={l.to} className="cursor-pointer">{l.label}</Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/about" className="cursor-pointer inline-flex items-center gap-2">
                    <Info className="w-3.5 h-3.5" /> About
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/feedback" className="cursor-pointer inline-flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5" /> Feedback
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* README sits immediately before the user / settings cluster so
                reference docs are the last nav stop before account controls. */}
            <NavLink to="/readme" label="README" icon={BookOpen} active={startsWith("/readme")} />

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
            <FontSwitcher />

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
            {PRIMARY_LINKS.map((link) => (
              <MobileLink
                key={link.to}
                to={link.to}
                label={link.label}
                onNavigate={closeMobile}
                active={startsWith(link.match)}
              />
            ))}

            <Accordion type="multiple" className="border-none">
              <AccordionItem value="products" className="border-none">
                <AccordionTrigger className="py-2 px-3 text-sm hover:no-underline">All products by family</AccordionTrigger>
                <AccordionContent className="pb-1">
                  <div className="pl-3 space-y-2">
                    {productGroups.map((group) => (
                      <div key={group.family.key}>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground px-3 py-1">
                          {group.family.label}
                        </div>
                        {group.products.map((p) => (
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
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="library" className="border-none">
                <AccordionTrigger className="py-2 px-3 text-sm hover:no-underline">More</AccordionTrigger>
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
                    <Link
                      to="/about"
                      onClick={closeMobile}
                      className={`block px-3 py-1.5 text-sm rounded-md ${
                        isActive("/about") ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      About
                    </Link>
                    <Link
                      to="/feedback"
                      onClick={closeMobile}
                      className={`block px-3 py-1.5 text-sm rounded-md ${
                        isActive("/feedback") ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Feedback
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

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
