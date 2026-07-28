import { Link } from "react-router-dom";
import { DATA } from "../data/data";

function isExternal(path) {
  return path?.startsWith("http://") || path?.startsWith("https://");
}

export default function AllAppsBar({ compact = false }) {
  const apps = DATA.projects.filter((p) => p.demoPath && p.demoPath !== "/");

  return (
    <footer
      style={{
        marginTop: compact ? "2rem" : "3rem",
        padding: "1.25rem 1.5rem",
        borderTop: "1px solid rgba(128,128,128,0.2)",
        background: "rgba(128,128,128,0.04)",
      }}
    >
      <p
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#6b7280",
          marginBottom: 12,
        }}
      >
        All projects &amp; apps
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <Link
          to="/"
          style={{
            padding: "6px 12px",
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 600,
            textDecoration: "none",
            color: "#6366f1",
            border: "1px solid rgba(99,102,241,0.3)",
            background: "rgba(99,102,241,0.08)",
          }}
        >
          Portfolio
        </Link>
        {apps.map((p) => {
          const style = {
            padding: "6px 12px",
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 500,
            textDecoration: "none",
            color: "#374151",
            border: `1px solid ${p.color}40`,
            background: `${p.color}10`,
          };
          if (isExternal(p.demoPath)) {
            return (
              <a key={p.title} href={p.demoPath} target="_blank" rel="noreferrer" style={style}>
                {p.title} ↗
              </a>
            );
          }
          return (
            <Link key={p.title} to={p.demoPath} style={style}>
              {p.title}
            </Link>
          );
        })}
      </div>
    </footer>
  );
}

export { isExternal };
