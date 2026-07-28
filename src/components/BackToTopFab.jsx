import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Icon from "./Icon";
import { useTheme } from "../hooks/useTheme";

export default function BackToTopFab({ dark }) {
  const { pathname } = useLocation();
  const { border, muted, accent, accent2 } = useTheme(dark);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pathname !== "/") {
      setVisible(false);
      return;
    }
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 90,
        width: 48,
        height: 48,
        borderRadius: 14,
        border: `1px solid ${border}`,
        background: dark ? "rgba(10,10,13,0.9)" : "rgba(255,255,255,0.95)",
        backdropFilter: "blur(12px)",
        color: muted,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: `0 8px 32px rgba(0,0,0,${dark ? 0.4 : 0.12})`,
        transition: "all 0.25s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = accent2;
        e.currentTarget.style.borderColor = `${accent}50`;
        e.currentTarget.style.boxShadow = `0 8px 32px ${accent}30`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = muted;
        e.currentTarget.style.borderColor = border;
        e.currentTarget.style.boxShadow = `0 8px 32px rgba(0,0,0,${dark ? 0.4 : 0.12})`;
      }}
    >
      <Icon name="arrow" size={18} />
    </button>
  );
}
