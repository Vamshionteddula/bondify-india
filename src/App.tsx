import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Trading from "./pages/Trading";
import Portfolio from "./pages/Portfolio";
import Analytics from "./pages/Analytics";
import Tokenization from "./pages/Tokenization";
import Grievances from "./pages/Grievances";
import Assistant from "./pages/Assistant";
import Documents from "./pages/Documents";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import "./i18n";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
            </Route>
            <Route path="/trading" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<Trading />} />
            </Route>
            <Route path="/portfolio" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<Portfolio />} />
            </Route>
            <Route path="/tokenization" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<Tokenization />} />
            </Route>
            <Route path="/analytics" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<Analytics />} />
            </Route>
            <Route path="/grievances" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<Grievances />} />
            </Route>
            <Route path="/assistant" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<Assistant />} />
            </Route>
            <Route path="/documents" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<Documents />} />
            </Route>
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
