import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import CalculatorPage from "@/pages/calculator";
import TimerPage from "@/pages/timer";
import CurrencyPage from "@/pages/currency";
import WeatherPage from "@/pages/weather";
import NewsPage from "@/pages/news";
import TutorialsPage from "@/pages/tutorials";
import RecipesPage from "@/pages/recipes";
import RecipeDetailPage from "@/pages/recipeDetail";
import RecipeAdminPage from "@/pages/recipeAdmin";
import TipsPage from "@/pages/tips";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/calculator" component={CalculatorPage} />
      <Route path="/timer" component={TimerPage} />
      <Route path="/currency" component={CurrencyPage} />
      <Route path="/weather" component={WeatherPage} />
      <Route path="/news" component={NewsPage} />
      <Route path="/tutorials" component={TutorialsPage} />
      <Route path="/recipes" component={RecipesPage} />
      <Route path="/recipe/:id" component={RecipeDetailPage} />
      <Route path="/recipe-admin" component={RecipeAdminPage} />
      <Route path="/tips" component={TipsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
