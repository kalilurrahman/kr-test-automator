import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import KRHeader from "@/components/KRHeader";
import KRFooter from "@/components/KRFooter";
import Index from "./pages/Index";
import Templates from "./pages/Templates";
import History from "./pages/History";
import Collections from "./pages/Collections";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-background">
            <KRHeader />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/templates" element={<Templates />} />
                <Route path="/history" element={<History />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <KRFooter />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
