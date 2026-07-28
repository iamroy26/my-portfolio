import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalStyles from "/src/components/GlobalStyles.jsx";
import RouteEffects from "./components/RouteEffects.jsx";
import { usePersistedDark } from "./hooks/usePersistedDark";
import PortfolioPage from "./pages/PortfolioPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import TaskManagerApp from "./apps/TaskManagerApp.jsx";
import WeatherApp from "./apps/WeatherApp.jsx";
import MovieFinderApp from "./apps/MovieFinderApp.jsx";
import NotesApp from "./apps/NotesApp.jsx";
import LandingCloneApp from "./apps/LandingCloneApp.jsx";
import PotwayMinistriesApp from "./apps/PotwayMinistriesApp.jsx";
import EcommerceApp from "./apps/EcommerceApp.jsx";
import BrothersLaundryApp from "./apps/BrothersLaundryApp.jsx";

export default function App() {
  const [dark, setDark] = usePersistedDark(true);

  return (
    <BrowserRouter>
      <GlobalStyles dark={dark} />
      <RouteEffects />
      <Routes>
        <Route path="/" element={<PortfolioPage dark={dark} setDark={setDark} />} />
        <Route path="/apps/tasks" element={<TaskManagerApp dark={dark} />} />
        <Route path="/apps/weather" element={<WeatherApp dark={dark} />} />
        <Route path="/apps/movies" element={<MovieFinderApp dark={dark} />} />
        <Route path="/apps/notes" element={<NotesApp dark={dark} />} />
        <Route path="/apps/landing" element={<LandingCloneApp dark={dark} />} />
        <Route path="/apps/potway" element={<PotwayMinistriesApp />} />
        <Route path="/apps/shop" element={<EcommerceApp />} />
        <Route path="/apps/brothers-laundry" element={<BrothersLaundryApp />} />
        <Route path="*" element={<NotFound dark={dark} />} />
      </Routes>
    </BrowserRouter>
  );
}
