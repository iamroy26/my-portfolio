import { useState, useEffect } from "react";
import Icon from "./Icon";
import { useTheme } from "../hooks/useTheme";

const NAV_LINKS = ["Home", "About", "Projects", "Experience", "Contact"];

export default function Navbar({ dark, setDark, initials = "SQ" }) {
  const { border, text, muted, accent, accent2, navBg } = useTheme(dark);
  const [activeNav, setActiveNav] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const scrollY = window.scrollY + 120;
      NAV_LINKS.forEach((n) => {
        const el = document.getElementById(n.toLowerCase());
        if (el && scrollY >= el.offsetTop) setActiveNav(el.id);
      });
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className="glass"
        style={{
          position: "fixed",
          top: scrolled ? 12 : 0,
          left: scrolled ? 16 : 0,
          right: scrolled ? 16 : 0,
          zIndex: 100,
          padding: "0 1.5rem",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: navBg,
          borderBottom: scrolled ? "none" : `1px solid ${border}`,
          borderRadius: scrolled ? 16 : 0,
          border: scrolled ? `1px solid ${border}` : undefined,
          boxShadow: scrolled ? `0 8px 32px rgba(0,0,0,${dark ? 0.35 : 0.08})` : "none",
          transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <button
          type="button"
          onClick={() => scrollTo("Home")}
          className="display"
          style={{
            fontWeight: 800,
            fontSize: 20,
            letterSpacing: "-0.03em",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "inherit",
            fontFamily: "inherit",
            padding: 0,
          }}
        >
          <span className="grad">{initials}</span>
          <span className="mono" style={{ color: muted, fontWeight: 400, fontSize: 11, marginLeft: 10, letterSpacing: "0.08em" }}>
            / portfolio
          </span>
        </button>

        <div className="hide-mobile" style={{ display: "flex", gap: 2 }}>
          {NAV_LINKS.map((n) => {
            const active = activeNav === n.toLowerCase();
            return (
              <button
                key={n}
                onClick={() => scrollTo(n)}
                className="mono"
                style={{
                  padding: "8px 14px",
                  borderRadius: 10,
                  border: "none",
                  cursor: "pointer",
                  background: active ? `${accent}18` : "transparent",
                  color: active ? accent2 : muted,
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  transition: "all 0.2s ease",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) => {
                  if (!active) e.target.style.color = text;
                }}
                onMouseLeave={(e) => {
                  if (!active) e.target.style.color = muted;
                }}
              >
                {n}
              </button>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button
            onClick={() => setDark(!dark)}
            aria-label="Toggle theme"
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              border: `1px solid ${border}`,
              background: "transparent",
              cursor: "pointer",
              color: muted,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `${accent}50`;
              e.currentTarget.style.color = accent;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = border;
              e.currentTarget.style.color = muted;
            }}
          >
            <Icon name={dark ? "sun" : "moon"} size={16} />
          </button>

          <a
            href="/Resume/Shadrack-Quaye-Resume.html"
            download="Shadrack-Quaye-Resume.html"
            className="btn-ghost hide-mobile"
            style={{
              padding: "8px 16px",
              fontSize: 13,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            Resume
          </a>

          <button
            className="btn-primary hide-mobile"
            onClick={() => scrollTo("Contact")}
            style={{ padding: "8px 20px", fontSize: 13 }}
          >
            Hire Me
          </button>

          <button
            className="show-mobile"
            style={{ background: "transparent", border: "none", cursor: "pointer", color: muted, padding: 4 }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <Icon name={menuOpen ? "close" : "menu"} size={22} />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          className="glass"
          style={{
            position: "fixed",
            top: scrolled ? 88 : 64,
            left: scrolled ? 16 : 0,
            right: scrolled ? 16 : 0,
            zIndex: 99,
            padding: "1rem",
            borderRadius: scrolled ? "0 0 16px 16px" : 0,
            border: `1px solid ${border}`,
            borderTop: "none",
          }}
        >
          {NAV_LINKS.map((n) => (
            <button
              key={n}
              onClick={() => scrollTo(n)}
              className="mono"
              style={{
                display: "block",
                width: "100%",
                padding: "14px 16px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: text,
                textAlign: "left",
                fontSize: 13,
                fontFamily: "inherit",
                letterSpacing: "0.06em",
              }}
            >
              {n}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
