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
import SharedScript from "./pages/SharedScript";
import NotFound from "./pages/NotFound";
import IosInstallHint from "@/components/IosInstallHint";
import { useThemePalette } from "@/hooks/useThemePalette";

// Heavy modules — code-split them so the initial bundle stays small.
const Templates = lazy(() => import("./pages/Templates"));
const History = lazy(() => import("./pages/History"));
const Collections = lazy(() => import("./pages/Collections"));
const Profile = lazy(() => import("./pages/Profile"));
const Compare = lazy(() => import("./pages/Compare"));
const Settings = lazy(() => import("./pages/Settings"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const About = lazy(() => import("./pages/About"));
const Feedback = lazy(() => import("./pages/Feedback"));
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
        <Suspense fallback={<ModuleFallback label="Loading…" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/sap" element={<SAP />} />
            <Route path="/salesforce" element={<Salesforce />} />
            <Route path="/p/:platformId" element={<PlatformPage />} />
            <Route path="/t/:id" element={<TestCaseDetail />} />
            <Route path="/history" element={<History />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/shared/:shareId" element={<SharedScript />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
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
