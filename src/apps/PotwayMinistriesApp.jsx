import { Link } from "react-router-dom";
import AllAppsBar from "../components/AllAppsBar";
import ProjectLogo from "../components/ProjectLogo";
import { PROJECT_MEDIA } from "../data/projectImages";

const NAV = ["Home", "About", "Services", "Events", "Contact"];

const SERVICES = [
  { day: "Sunday", time: "9:00 AM", name: "Morning Worship", type: "Living Way Center" },
  { day: "Tuesday", time: "6:30 PM", name: "Bible Teaching Service", type: "Living Way Center" },
  { day: "Thursday", time: "6:30 PM", name: "Corporate Prayer", type: "Living Way Center" },
];

const EVENTS = [
  { date: "Every Sun", title: "Sunday Worship", desc: "Join us for praise, prayer, and the Word." },
  { date: "Sep 06", title: "Youth Service - Higher Grounds", desc: "A day of worship and fellowship for young people." },
  { date: "Oct 24 - 25", title: "National Convention", desc: "Meeting all branches to serve the Lord together at Faith-Community Center - Opeikuma." },
];

const GOLD = "#c9a227";
const GOLD_LIGHT = "#e8d48b";
const NAVY = "#0c1222";
const NAVY_CARD = "#141c2e";

export default function PotwayMinistriesApp() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ minHeight: "100vh", background: NAVY, color: "#f8f6f0", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Link
        to="/"
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 100,
          padding: "10px 16px",
          borderRadius: 10,
          background: "rgba(201,162,39,0.15)",
          border: `1px solid ${GOLD}60`,
          color: GOLD_LIGHT,
          fontSize: 12,
          fontWeight: 600,
          textDecoration: "none",
          backdropFilter: "blur(8px)",
        }}
      >
        ← Portfolio
      </Link>

      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          borderBottom: `1px solid ${GOLD}25`,
          background: "rgba(12,18,34,0.92)",
          backdropFilter: "blur(12px)",
          padding: "0 1.5rem",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            height: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <button
            type="button"
            onClick={() => scrollTo("home")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              color: "inherit",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <ProjectLogo src={PROJECT_MEDIA.potway.logo} alt="Potway Ministries" size={44} borderColor={`${GOLD}70`} />
              <div style={{ fontSize: "1.15rem", fontWeight: 800, letterSpacing: "0.04em" }}>
                POTWAY <span style={{ color: GOLD }}>MINISTRIES</span>
              </div>
            </div>
          </button>
          <nav className="hide-mobile" style={{ display: "flex", gap: 8 }}>
            {NAV.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => scrollTo(item.toLowerCase())}
                style={{
                  padding: "8px 14px",
                  border: "none",
                  background: "transparent",
                  color: "#c4c9d4",
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 500,
                  fontFamily: "inherit",
                }}
              >
                {item}
              </button>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => scrollTo("contact")}
            style={{
              padding: "10px 20px",
              borderRadius: 8,
              border: "none",
              background: `linear-gradient(135deg, ${GOLD}, #a8841a)`,
              color: NAVY,
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Plan a Visit
          </button>
        </div>
      </header>

      <section
        id="home"
        style={{
          position: "relative",
          padding: "5rem 1.5rem 6rem",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse at 50% 0%, ${GOLD}18 0%, transparent 55%)`,
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 720, margin: "0 auto", position: "relative" }}>
          <p style={{ color: GOLD, fontSize: 13, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "1rem" }}>
            Welcome Home
          </p>
          <h1 style={{ fontSize: "clamp(2.25rem, 6vw, 3.5rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: "1.25rem" }}>
            Raising a generation that <span style={{ color: GOLD_LIGHT }}>walks in purpose</span>
          </h1>
          <p style={{ fontSize: "1.15rem", color: "#a8b0c4", lineHeight: 1.8, marginBottom: "2rem" }}>
            Potway Ministries is a Christ-centered community in Accra, Ghana — where faith, family, and fellowship come
            together.
          </p>
          <p
            style={{
              fontStyle: "italic",
              color: GOLD_LIGHT,
              fontSize: "1.05rem",
              marginBottom: "2.5rem",
              opacity: 0.9,
            }}
          >
            "For where two or three gather in my name, there am I with them." — Matthew 18:20
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => scrollTo("services")}
              style={{
                padding: "14px 28px",
                borderRadius: 10,
                border: "none",
                background: `linear-gradient(135deg, ${GOLD}, #a8841a)`,
                color: NAVY,
                fontWeight: 700,
                fontSize: 15,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Service Times
            </button>
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              style={{
                padding: "14px 28px",
                borderRadius: 10,
                border: `1px solid ${GOLD}50`,
                background: "transparent",
                color: GOLD_LIGHT,
                fontWeight: 600,
                fontSize: 15,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      <section id="about" style={{ padding: "4rem 1.5rem", background: NAVY_CARD }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "3rem", alignItems: "center" }}>
          <div>
            <p style={{ color: GOLD, fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>
              About Us
            </p>
            <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "1rem" }}>Our Mission</h2>
            <p style={{ color: "#a8b0c4", lineHeight: 1.85, marginBottom: "1rem" }}>
              Potway Ministries exists to spread the Gospel, disciple believers, and serve our community with the love
              of Christ. We believe every person has a God-given purpose.
            </p>
            <p style={{ color: "#a8b0c4", lineHeight: 1.85 }}>
              Whether you are new to faith or have walked with God for years, you have a place here. Come as you are —
              leave transformed.
            </p>
          </div>
          <div
            style={{
              padding: "2rem",
              borderRadius: 16,
              border: `1px solid ${GOLD}30`,
              background: `linear-gradient(145deg, ${GOLD}12, transparent)`,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 48, marginBottom: "1rem" }}></div>
            <h3 style={{ fontWeight: 700, fontSize: "1.2rem", marginBottom: 8 }}>Faith · Hope · Love</h3>
            <p style={{ color: "#a8b0c4", fontSize: 14, lineHeight: 1.7 }}>
              Worship · Prayer · Word · Community
            </p>
          </div>
        </div>
      </section>

      <section id="services" style={{ padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: GOLD, fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>
            Join Us
          </p>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "2.5rem" }}>Service Times</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {SERVICES.map((s) => (
              <article
                key={s.name + s.time}
                style={{
                  padding: "1.5rem",
                  borderRadius: 14,
                  border: `1px solid ${GOLD}25`,
                  background: NAVY_CARD,
                  textAlign: "left",
                }}
              >
                <p style={{ color: GOLD, fontWeight: 700, fontSize: 13, marginBottom: 8 }}>{s.day}</p>
                <p style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: 6 }}>{s.time}</p>
                <h3 style={{ fontWeight: 700, marginBottom: 6 }}>{s.name}</h3>
                <p style={{ color: "#a8b0c4", fontSize: 14 }}>{s.type}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="events" style={{ padding: "4rem 1.5rem", background: NAVY_CARD }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ color: GOLD, fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12, textAlign: "center" }}>
            What's On
          </p>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "2rem", textAlign: "center" }}>Upcoming Events</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {EVENTS.map((e) => (
              <article
                key={e.title}
                style={{
                  padding: "1.5rem",
                  borderRadius: 14,
                  border: `1px solid ${GOLD}20`,
                  background: NAVY,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 10px",
                    borderRadius: 6,
                    background: `${GOLD}20`,
                    color: GOLD_LIGHT,
                    fontSize: 12,
                    fontWeight: 600,
                    marginBottom: 12,
                  }}
                >
                  {e.date}
                </span>
                <h3 style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: 8 }}>{e.title}</h3>
                <p style={{ color: "#a8b0c4", fontSize: 14, lineHeight: 1.65 }}>{e.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" style={{ padding: "4rem 1.5rem" }}>
        <div
          style={{
            maxWidth: 640,
            margin: "0 auto",
            textAlign: "center",
            padding: "2.5rem",
            borderRadius: 20,
            border: `1px solid ${GOLD}30`,
            background: `linear-gradient(160deg, ${GOLD}10, ${NAVY_CARD})`,
          }}
        >
          <h2 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "1rem" }}>We'd Love to Meet You</h2>
          <p style={{ color: "#a8b0c4", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            Darkuman opposite MTTD Police Station, Accra, Ghana
            <br />
            potwayministries@email.com
            <br />
            +233 30 256 1256
          </p>
          <button
            type="button"
            style={{
              padding: "14px 32px",
              borderRadius: 10,
              border: "none",
              background: `linear-gradient(135deg, ${GOLD}, #a8841a)`,
              color: NAVY,
              fontWeight: 700,
              fontSize: 15,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Get Directions
          </button>
        </div>
      </section>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem" }}>
        <AllAppsBar />
      </div>

      <footer
        style={{
          borderTop: `1px solid ${GOLD}20`,
          padding: "2rem 1.5rem",
          textAlign: "center",
          color: "#6b7280",
          fontSize: 14,
        }}
      >
        <p style={{ marginBottom: 8 }}>
          <strong style={{ color: GOLD_LIGHT }}>POTWAY MINISTRIES</strong> · © {new Date().getFullYear()}
        </p>
        <p style={{ fontSize: 12 }}>Website created by Shadrack Quaye</p>
      </footer>
    </div>
  );
}
