import { useState } from "react";
import { Link } from "react-router-dom";
import AllAppsBar from "../components/AllAppsBar";
import ProjectLogo from "../components/ProjectLogo";
import { PROJECT_MEDIA } from "../data/projectImages";

const PRODUCTS = [
  {
    id: 1,
    name: "Linen Blend Shirt",
    price: 48,
    category: "Apparel",
    image: "/ecommerce/shirt.jpg",
  },
  {
    id: 2,
    name: "Classic Leather Sneakers",
    price: 120,
    category: "Footwear",
    image: "/ecommerce/sneaker.jpg",
  },
  {
    id: 3,
    name: "Minimalist Watch",
    price: 89,
    category: "Accessories",
    image: "/ecommerce/wrist_watch.jpg",
  },
  {
    id: 4,
    name: "Organic Skincare Set",
    price: 34,
    category: "Beauty",
    image: "/ecommerce/lotion.jpg",
  },
  {
    id: 5,
    name: "Wireless Headphones",
    price: 159,
    category: "Tech",
    image: "/ecommerce/headphone.jpg",
  },
  {
    id: 6,
    name: "Ceramic Home Vase",
    price: 142,
    category: "Home",
    image: "/ecommerce/ceramic-home-vase.jpg",
  },
  {
    id: 7,
    name: "Glasses",
    price: 78,
    category: "Accessories",
    image: "/ecommerce/glasses.jpg",
  },
  {
    id: 8,
    name: "iPhone 17 pro",
    price: 9800,
    category: "Tech",
    image: "/ecommerce/iPhone17.jpg",
  },
  {
    id: 9,
    name: "Samsung S22",
    price: 7200,
    category: "Tech",
    image: "/ecommerce/samsung.jpg",
  },
  {
    id: 10,
    name: "T-shirt",
    price: 50,
    category: "Apparel",
    image: "/ecommerce/t-shirts.jpg",
  },
  {
    id: 11,
    name: "Vans Sneakers",
    price: 180,
    category: "Footwear",
    image: "/ecommerce/vans.jpg",
  },
  {
    id: 12,
    name: "AirForce",
    price: 220,
    category: "Footwear",
    image: "/ecommerce/airforce.jpg",
  },
  {
    id: 13,
    name: "Marlov",
    price: 85,
    category: "Beauty",
    image: "/ecommerce/marlov.jpg",
  },
  {
    id: 14,
    name: "Classic Mirror",
    price: 105,
    category: "Home",
    image: "/ecommerce/mirror.jpg",
  },
  {
    id: 14,
    name: "pants",
    price: 120,
    category: "Apparel",
    image: "/ecommerce/trouser.jpg",
  },
];

const CATEGORIES = ["All", "Apparel", "Footwear", "Accessories", "Beauty", "Tech", "Home"];

const BG = "#fff";
const TEXT = "#111827";
const MUTED = "#6b7280";
const ACCENT = "#0f766e";
const BORDER = "#e5e7eb";

export default function EcommerceApp() {
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("All");
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (product) => setCart((c) => [...c, product]);
  const removeAt = (i) => setCart((c) => c.filter((_, idx) => idx !== i));
  const total = cart.reduce((s, p) => s + p.price, 0);

  const filtered =
    category === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === category);

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
          border: `1px solid ${BORDER}`,
          color: TEXT,
          fontSize: 12,
          fontWeight: 600,
          textDecoration: "none",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        ← Portfolio
      </Link>

      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${BORDER}`,
          padding: "0 1.5rem",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            height: 68,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <ProjectLogo src={PROJECT_MEDIA.shop.logo} alt="Luxe Market" size={40} borderColor={`${ACCENT}50`} />
            <span style={{ fontSize: "1.25rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
              LUXE<span style={{ color: ACCENT }}>MARKET</span>
            </span>
          </div>
          <button
            type="button"
            onClick={() => setCartOpen(!cartOpen)}
            style={{
              padding: "10px 18px",
              borderRadius: 10,
              border: `1px solid ${BORDER}`,
              background: "#fff",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 14,
              fontFamily: "inherit",
            }}
          >
            Cart ({cart.length}) · ${total}
          </button>
        </div>
      </header>

      <section
        style={{
          position: "relative",
          minHeight: 420,
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80"
          alt="Store interior"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 100%)",
          }}
        />
        <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "4rem 1.5rem", width: "100%" }}>
          <p style={{ color: "#a7f3d0", fontSize: 13, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>
            New season collection
          </p>
          <h1 style={{ color: "#fff", fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 800, margin: "1rem 0", maxWidth: 520, lineHeight: 1.1 }}>
            Curated goods for modern living
          </h1>
          <p style={{ color: "rgba(255,255,255,0.85)", maxWidth: 440, lineHeight: 1.7, marginBottom: "2rem" }}>
            Clean design. Quality products. Free delivery on orders over $75.
          </p>
          <button
            type="button"
            onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              padding: "14px 28px",
              borderRadius: 10,
              border: "none",
              background: ACCENT,
              color: "#fff",
              fontWeight: 700,
              fontSize: 15,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Shop Now
          </button>
        </div>
      </section>

      <section id="shop" style={{ maxWidth: 1200, margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "2rem" }}>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              style={{
                padding: "8px 16px",
                borderRadius: 100,
                border: `1px solid ${category === c ? ACCENT : BORDER}`,
                background: category === c ? `${ACCENT}12` : "#fff",
                color: category === c ? ACCENT : MUTED,
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 500,
                fontFamily: "inherit",
              }}
            >
              {c}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 24 }}>
          {filtered.map((p) => (
            <article
              key={p.id}
              style={{
                borderRadius: 16,
                overflow: "hidden",
                background: "#fff",
                border: `1px solid ${BORDER}`,
                transition: "box-shadow 0.25s",
              }}
            >
              <div style={{ aspectRatio: "4/5", overflow: "hidden" }}>
                <img
                  src={p.image}
                  alt={p.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  loading="lazy"
                />
              </div>
              <div style={{ padding: "1.25rem" }}>
                <p style={{ fontSize: 12, color: MUTED, marginBottom: 4 }}>{p.category}</p>
                <h3 style={{ fontWeight: 700, fontSize: "1.05rem", marginBottom: 8 }}>{p.name}</h3>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "1.2rem", fontWeight: 800, color: ACCENT }}>GH₵{p.price}</span>
                  <button
                    type="button"
                    onClick={() => addToCart(p)}
                    style={{
                      padding: "8px 14px",
                      borderRadius: 8,
                      border: "none",
                      background: TEXT,
                      color: "#fff",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {cartOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 80,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "flex-end",
          }}
          onClick={() => setCartOpen(false)}
        >
          <div
            style={{
              width: "min(400px, 100%)",
              height: "100%",
              background: "#fff",
              padding: "1.5rem",
              overflow: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontWeight: 800, marginBottom: "1.5rem" }}>Your Cart</h2>
            {cart.length === 0 ? (
              <p style={{ color: MUTED }}>Your cart is empty.</p>
            ) : (
              <>
                <ul style={{ listStyle: "none", marginBottom: "1.5rem" }}>
                  {cart.map((item, i) => (
                    <li
                      key={`${item.id}-${i}`}
                      style={{
                        display: "flex",
                        gap: 12,
                        marginBottom: 16,
                        paddingBottom: 16,
                        borderBottom: `1px solid ${BORDER}`,
                      }}
                    >
                      <img src={item.image} alt="" style={{ width: 56, height: 56, borderRadius: 8, objectFit: "cover" }} />
                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: 600, fontSize: 14 }}>{item.name}</p>
                        <p style={{ color: ACCENT, fontWeight: 700 }}>${item.price}</p>
                      </div>
                      <button type="button" onClick={() => removeAt(i)} style={{ border: "none", background: "none", cursor: "pointer", color: MUTED }}>
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
                <p style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: 12 }}>Total: ${total}</p>
                <button
                  type="button"
                  style={{
                    width: "100%",
                    padding: 14,
                    borderRadius: 10,
                    border: "none",
                    background: ACCENT,
                    color: "#fff",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  Checkout
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
        <AllAppsBar />
      </div>

      <footer style={{ borderTop: `1px solid ${BORDER}`, padding: "2rem", textAlign: "center", color: MUTED, fontSize: 13 }}>
        E-Commerce demo · Website by Shadrack Quaye
      </footer>
    </div>
  );
}