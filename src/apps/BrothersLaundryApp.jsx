import { Link } from "react-router-dom";
import AllAppsBar from "../components/AllAppsBar";
import ProjectLogo from "../components/ProjectLogo";
import { PROJECT_MEDIA } from "../data/projectImages";

const SERVICES = [
  {
    title: "Wash & Fold",
    desc: "Everyday laundry washed, dried, and neatly folded — ready for your closet.",
    price: "From ₵25/load",
    image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=700&q=80",
  },
  {
    title: "Dry Cleaning",
    desc: "Professional care for suits, dresses, and delicate fabrics that need extra attention.",
    price: "From ₵40/item",
    image: "https://images.unsplash.com/photo-1610557892470-55d9e80d0ae6?w=700&q=80",
  },
  {
    title: "Ironing & Press",
    desc: "Crisp, wrinkle-free shirts and trousers — look sharp without the hassle.",
    price: "From ₵15/item",
    image: "https://images.unsplash.com/photo-1620799140408-8c4fd4f302e7?w=700&q=80",
  },
  {
    title: "Pickup & Delivery",
    desc: "We come to you. Schedule a pickup and get fresh laundry delivered to your door.",
    price: "Free over ₵100",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&q=80",
  },
  {
    title: "Stain Treatment",
    desc: "Tough stains on cotton, linen, and blends — treated with care before the wash.",
    price: "From ₵10/item",
    image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=700&q=80",
  },
  {
    title: "Commercial Laundry",
    desc: "Hotels, salons, and offices — reliable bulk service with flexible schedules.",
    price: "Custom quote",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80",
  },
];

const SKY = "#0ea5e9";
const SKY_DARK = "#0284c7";
const BG = "#f0f9ff";
const TEXT = "#0f172a";
const MUTED = "#64748b";

export default function BrothersLaundryApp() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ minHeight: "100vh", background: BG, color: TEXT, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Link
        to="/"
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 100,
          padding: "10px 16px",
          borderRadius: 10,
          background: "#fff",
          border: "1px solid #bae6fd",
          color: SKY_DARK,
          fontSize: 12,
          fontWeight: 600,
          textDecoration: "none",
          boxShadow: "0 4px 16px rgba(14,165,233,0.15)",
        }}
      >
        ← Portfolio
      </Link>

      <header
        style={{
          background: "#fff",
          borderBottom: "1px solid #e0f2fe",
          padding: "0 1.5rem",
          position: "sticky",
          top: 0,
          zIndex: 50,
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
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <ProjectLogo src="/brothers.png" alt="Brothers' Laundry" size={44} borderColor={`${SKY}60`} />
            <div style={{ fontSize: "1.2rem", fontWeight: 800, lineHeight: 1.2 }}>
              Brothers<span style={{ color: SKY }}>'</span> Laundry
            </div>
          </div>
          <nav className="hide-mobile" style={{ display: "flex", gap: 20, fontSize: 14, fontWeight: 500, color: MUTED }}>
            <button type="button" onClick={() => scrollTo("services")} style={{ border: "none", background: "none", cursor: "pointer", fontFamily: "inherit", color: "inherit" }}>Services</button>
            <button type="button" onClick={() => scrollTo("how")} style={{ border: "none", background: "none", cursor: "pointer", fontFamily: "inherit", color: "inherit" }}>How it works</button>
            <button type="button" onClick={() => scrollTo("contact")} style={{ border: "none", background: "none", cursor: "pointer", fontFamily: "inherit", color: "inherit" }}>Contact</button>
          </nav>
          <button
            type="button"
            onClick={() => scrollTo("contact")}
            style={{
              padding: "10px 20px",
              borderRadius: 10,
              border: "none",
              background: `linear-gradient(135deg, ${SKY}, ${SKY_DARK})`,
              color: "#fff",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Book Pickup
          </button>
        </div>
      </header>

      <section style={{ position: "relative", minHeight: 440, display: "flex", alignItems: "center" }}>
        <img
          src="/laundry.jpg"
          alt="Fresh laundry"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(2,132,199,0.88) 0%, rgba(14,165,233,0.55) 100%)" }} />
        <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto", padding: "4rem 1.5rem", width: "100%" }}>
          <p style={{ color: "#e0f2fe", fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Accra · Fresh & Fast
          </p>
          <h1 style={{ color: "#fff", fontSize: "clamp(2.25rem, 5vw, 3.25rem)", fontWeight: 800, margin: "1rem 0", maxWidth: 560, lineHeight: 1.1 }}>
            Laundry done right — by brothers you can trust
          </h1>
          <p style={{ color: "rgba(255,255,255,0.9)", maxWidth: 480, lineHeight: 1.75, marginBottom: "2rem", fontSize: "1.1rem" }}>
            Wash, dry clean, iron, and deliver. Spotless clothes, friendly service, fair prices.
          </p>
          <button
            type="button"
            onClick={() => scrollTo("services")}
            style={{
              padding: "14px 28px",
              borderRadius: 10,
              border: "none",
              background: "#fff",
              color: SKY_DARK,
              fontWeight: 700,
              fontSize: 15,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            View Services
          </button>
        </div>
      </section>

      <section id="services" style={{ maxWidth: 1100, margin: "0 auto", padding: "4rem 1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: 8 }}>Our Services</h2>
          <p style={{ color: MUTED, maxWidth: 480, margin: "0 auto" }}>
            Professional laundry care with beautiful results — pick a service below.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
          {SERVICES.map((s) => (
            <article
              key={s.title}
              style={{
                borderRadius: 16,
                overflow: "hidden",
                background: "#fff",
                boxShadow: "0 4px 24px rgba(14,165,233,0.08)",
                border: "1px solid #e0f2fe",
              }}
            >
              <div style={{ height: 200, overflow: "hidden" }}>
                <img
                  src={s.image}
                  alt={s.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  loading="lazy"
                />
              </div>
              <div style={{ padding: "1.35rem" }}>
                <h3 style={{ fontWeight: 700, fontSize: "1.15rem", marginBottom: 8 }}>{s.title}</h3>
                <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.65, marginBottom: 12 }}>{s.desc}</p>
                <p style={{ color: SKY_DARK, fontWeight: 700, 
                  fontSize: 15 }}>{s.price}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="how" style={{ background: "#fff", padding: "4rem 1.5rem", borderTop: "1px solid #e0f2fe" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "2.5rem" }}>How It Works</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32 }}>
            {[
              { step: "1", title: "Schedule", text: "Book online or call us for pickup." },
              { step: "2", title: "We Collect", text: "Our team picks up your laundry." },
              { step: "3", title: "We Clean", text: "Washed, dried, and pressed with care." },
              { step: "4", title: "Delivery", text: "Fresh clothes back at your door." },
            ].map((item) => (
              <div key={item.step}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: `${SKY}20`,
                    color: SKY_DARK,
                    fontWeight: 800,
                    fontSize: "1.25rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1rem",
                  }}
                >
                  {item.step}
                </div>
                <h3 style={{ fontWeight: 700, marginBottom: 8 }}>{item.title}</h3>
                <p style={{ color: MUTED, fontSize: 14 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" style={{ padding: "4rem 1.5rem" }}>
        <div
          style={{
            maxWidth: 560,
            margin: "0 auto",
            textAlign: "center",
            padding: "2.5rem",
            borderRadius: 20,
            background: `linear-gradient(135deg, ${SKY}, ${SKY_DARK})`,
            color: "#fff",
          }}
        >
          <h2 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: 12 }}>Ready for fresh laundry?</h2>
          <p style={{ opacity: 0.9, marginBottom: "1.5rem", lineHeight: 1.7 }}>
            Odorkor, Accra · Mon–Sat 7AM–7PM
            <br /> 
            +233 24 058 1260 · brotherslaundry@email.com
          </p>
          <button
            type="button"
            style={{
              padding: "14px 32px",
              borderRadius: 10,
              border: "none",
              background: "#fff",
              color: SKY_DARK,
              fontWeight: 700,
              fontSize: 15,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Call to Book
          </button>
        </div>
      </section>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem" }}>
        <AllAppsBar />
      </div>

      <footer style={{ textAlign: "center", padding: "2rem", color: MUTED, fontSize: 13 }}>
        <strong style={{ color: SKY_DARK }}>Brothers&apos; Laundry</strong> · © {new Date().getFullYear()} · Website demo by Shadrack Quaye
      </footer>
    </div>
  );
}
