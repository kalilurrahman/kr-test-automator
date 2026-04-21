import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import KRHeader from "@/components/KRHeader";
import KRFooter from "@/components/KRFooter";
import KeyboardShortcutsDialog from "@/components/KeyboardShortcutsDialog";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import Templates from "./pages/Templates";
import History from "./pages/History";
import Collections from "./pages/Collections";
import SharedScript from "./pages/SharedScript";
import Profile from "./pages/Profile";
import Compare from "./pages/Compare";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Feedback from "./pages/Feedback";
import IosInstallHint from "@/components/IosInstallHint";
import NotFound from "./pages/NotFound";
import { useThemePalette } from "@/hooks/useThemePalette";

// Heavy modules — code-split them.
const SAP = lazy(() => import("./pages/SAP"));
const Salesforce = lazy(() => import("./pages/Salesforce"));
const PlatformPage = lazy(() => import("./pages/PlatformPage"));
const TestCaseDetail = lazy(() => import("./pages/TestCaseDetail"));

const ModuleFallback = ({ label }: { label: string }) => (
  <div className="min-h-[calc(100vh-64px)] flex items-center justify-center text-muted-foreground text-sm">
    {label}
  </div>
);

const queryClient = new QueryClient();

function AppShell() {
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  // Initialise palette on mount (also persists across reloads)
  useThemePalette();

  useEffect(() => {
    const handler = () => setShortcutsOpen((o) => !o);
    window.addEventListener("toggle-shortcuts-help", handler);
    return () => window.removeEventListener("toggle-shortcuts-help", handler);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <KRHeader />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/sap" element={<Suspense fallback={<ModuleFallback label="Loading SAP repository…" />}><SAP /></Suspense>} />
          <Route path="/salesforce" element={<Suspense fallback={<ModuleFallback label="Loading Salesforce repository…" />}><Salesforce /></Suspense>} />
          <Route path="/p/:platformId" element={<Suspense fallback={<ModuleFallback label="Loading repository…" />}><PlatformPage /></Suspense>} />
          <Route path="/t/:id" element={<Suspense fallback={<ModuleFallback label="Resolving test case…" />}><TestCaseDetail /></Suspense>} />
          <Route path="/history" element={<History />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/shared/:shareId" element={<SharedScript />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <KRFooter />
      <KeyboardShortcutsDialog open={shortcutsOpen} onOpenChange={setShortcutsOpen} />
      <IosInstallHint />
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppShell />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
