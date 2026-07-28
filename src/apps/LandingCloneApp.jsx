import { Link } from "react-router-dom";
import AppShell from "./AppShell";
import { PROJECT_MEDIA } from "../data/projectImages";
import { useTheme } from "../hooks/useTheme";

const FEATURES = [
  { icon: "⚡", title: "Lightning fast", desc: "Deploy in seconds with our edge network." },
  { icon: "🔒", title: "Secure by default", desc: "Enterprise-grade encryption on every request." },
  { icon: "📊", title: "Real-time analytics", desc: "Dashboards that update as your users do." },
];

const PLANS = [
  { name: "Starter", price: "0", features: ["3 projects", "Community support"] },
  { name: "Pro", price: "19", features: ["Unlimited projects", "Priority support", "Custom domains"], highlight: true },
  { name: "Team", price: "49", features: ["Everything in Pro", "SSO", "Audit logs"] },
];

export default function LandingCloneApp({ dark }) {
  const { border, muted, text, accent, accent2, surface } = useTheme(dark);

  return (
    <AppShell title="Nexus SaaS" subtitle="Landing page clone demo" logo={PROJECT_MEDIA.landing.logo} dark={dark}>
      <section
        style={{
          textAlign: "center",
          padding: "3rem 1rem 4rem",
          borderRadius: 20,
          background: `linear-gradient(145deg, ${accent}18, ${accent2}10)`,
          border: `1px solid ${border}`,
          marginBottom: "3rem",
        }}
      >
        <span className="mono" style={{ fontSize: 12, color: accent2 }}>
          ✦ Now in public beta
        </span>
        <h1 className="display" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, margin: "1rem 0" }}>
          Ship products <span className="grad">10× faster</span>
        </h1>
        <p style={{ color: muted, maxWidth: 480, margin: "0 auto 2rem", fontSize: "1.1rem", lineHeight: 1.7 }}>
          Nexus is the modern platform for teams who want beautiful landing pages, auth, and analytics — without the
          boilerplate.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button type="button" className="btn-primary">
            Start free trial
          </button>
          <button type="button" className="btn-ghost">
            Watch demo
          </button>
        </div>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 className="display" style={{ textAlign: "center", fontSize: "1.75rem", marginBottom: "2rem" }}>
          Why teams choose Nexus
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          {FEATURES.map((f) => (
            <div
              key={f.title}
              style={{
                padding: "1.5rem",
                borderRadius: 14,
                border: `1px solid ${border}`,
                background: surface,
              }}
            >
              <span style={{ fontSize: 32 }}>{f.icon}</span>
              <h3 style={{ fontWeight: 700, margin: "12px 0 8px" }}>{f.title}</h3>
              <p style={{ color: muted, fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="display" style={{ textAlign: "center", fontSize: "1.75rem", marginBottom: "2rem" }}>
          Simple pricing
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {PLANS.map((p) => (
            <div
              key={p.name}
              style={{
                padding: "1.5rem",
                borderRadius: 14,
                border: `1px solid ${p.highlight ? accent : border}`,
                background: p.highlight ? `${accent}10` : surface,
                boxShadow: p.highlight ? `0 0 40px ${accent}20` : "none",
              }}
            >
              <h3 style={{ fontWeight: 700 }}>{p.name}</h3>
              <p style={{ fontSize: "2rem", fontWeight: 800, margin: "12px 0", color: accent }}>
                ${p.price}
                <span style={{ fontSize: 14, color: muted, fontWeight: 400 }}>/mo</span>
              </p>
              <ul style={{ listStyle: "none", color: muted, fontSize: 14, lineHeight: 2 }}>
                {p.features.map((f) => (
                  <li key={f}>✓ {f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <p style={{ textAlign: "center", marginTop: "3rem", color: muted, fontSize: 14 }}>
        This is a demo landing clone.{" "}
        <Link to="/" style={{ color: accent }}>
          Back to portfolio →
        </Link>
      </p>
    </AppShell>
  );
}
