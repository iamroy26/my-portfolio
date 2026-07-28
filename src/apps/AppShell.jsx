import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import ProjectLogo from "../components/ProjectLogo";
import AllAppsBar from "../components/AllAppsBar";

export default function AppShell({ title, subtitle, logo, children, dark }) {
  const { bg, border, text, muted, accent } = useTheme(dark);

  return (
    <div style={{ minHeight: "100vh", background: bg, color: text }}>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          borderBottom: `1px solid ${border}`,
          background: dark ? "rgba(4,6,8,0.9)" : "rgba(240,244,248,0.9)",
          backdropFilter: "blur(16px)",
          padding: "0 1.5rem",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            color: text,
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          {logo ? <ProjectLogo src={logo} alt={title} size={40} borderColor={`${accent}40`} /> : null}
          <span>
            {title}
            {subtitle && (
              <span className="mono" style={{ display: "block", fontSize: 11, color: muted, fontWeight: 400 }}>
                {subtitle}
              </span>
            )}
          </span>
        </Link>
        <Link
          to="/"
          className="btn-ghost"
          style={{ padding: "8px 16px", fontSize: 13, textDecoration: "none" }}
        >
          ← Portfolio
        </Link>
      </header>
      <main style={{ maxWidth: 960, margin: "0 auto", padding: "2rem 1.5rem 4rem" }}>
        {children}
        <AllAppsBar />
      </main>
    </div>
  );
}
