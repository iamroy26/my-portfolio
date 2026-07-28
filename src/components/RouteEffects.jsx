import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

const TITLES = {
  "/": "Shadrack Quaye | Portfolio",
  "/apps/tasks": "Task Manager | Shadrack Quaye",
  "/apps/weather": "Weather Dashboard | Shadrack Quaye",
  "/apps/movies": "Movie Finder | Shadrack Quaye",
  "/apps/notes": "Notes App | Shadrack Quaye",
  "/apps/landing": "SaaS Landing | Shadrack Quaye",
  "/apps/potway": "Potway Ministries | Shadrack Quaye",
  "/apps/shop": "E-Commerce Store | Shadrack Quaye",
  "/apps/brothers-laundry": "Brothers' Laundry | Shadrack Quaye",
};

export default function RouteEffects() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = TITLES[pathname] || "Page not found | Shadrack Quaye";
  }, [pathname]);

  return <ScrollToTop />;
}
