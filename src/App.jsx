import { Router, Route, Switch } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

// Import pages
import Home from "@/pages/home";
import UPSCAgeCalculator from "@/pages/upsc-age-calculator";
import SSCAgeCalculator from "@/pages/ssc-age-calculator";
import MarksCalculator from "@/pages/marks-calculator";
import Blog from "@/pages/blog";
import UPSCSyllabus from "@/pages/upsc-syllabus";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/upsc-age-calculator" component={UPSCAgeCalculator} />
          <Route path="/ssc-age-calculator" component={SSCAgeCalculator} />
          <Route path="/marks-calculator" component={MarksCalculator} />
          <Route path="/blog" component={Blog} />
          <Route path="/upsc-syllabus" component={UPSCSyllabus} />
          <Route component={NotFound} />
        </Switch>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;