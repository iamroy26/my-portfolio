import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

export default function ScrollProgress({ dark }) {
  const { pathname } = useLocation();
  const { accent, accent2 } = useTheme(dark);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (pathname !== "/") return;

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (pathname !== "/") return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 200,
        background: "transparent",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: `linear-gradient(90deg, ${accent}, ${accent2})`,
          transition: "width 0.1s ease-out",
          boxShadow: `0 0 12px ${accent}60`,
        }}
      />
    </div>
  );
}
