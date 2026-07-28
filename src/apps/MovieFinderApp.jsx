import { useState } from "react";
import AppShell from "./AppShell";
import { PROJECT_MEDIA } from "../data/projectImages";
import { useTheme } from "../hooks/useTheme";
import { DEMO_MOVIES } from "./demoMovies";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
console.log("API KEY:", API_KEY);

export default function MovieFinderApp({ dark }) {
  const { border, muted, text, accent, surface } = useTheme(dark);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(DEMO_MOVIES);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const search = async (e) => {
  e.preventDefault();

  const q = query.trim();

  if (!q) {
    setResults(DEMO_MOVIES);
    setSelected(null);
    return;
  }

  setLoading(true);
  setError("");

  try {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(q)}&type=movie`
    );

    const data = await res.json();

    console.log(data);

    if (data.Response === "True") {
      setResults(data.Search);
      setSelected(null);
    } else {
      setError(data.Error);
      setResults([]);
    }

  } catch (error) {
    console.log(error);
    setError("Something went wrong");
  }

  setLoading(false);
};

  const card = {
    borderRadius: 14,
    border: `1px solid ${border}`,
    background: dark ? "rgba(255,255,255,0.03)" : "#fff",
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
  };

  const poster = (m) =>
    m.Poster && m.Poster !== "N/A" ? m.Poster : "https://via.placeholder.com/300x450?text=No+Poster";

  return (
    <AppShell title="Movie Finder" subtitle="OMDb API + demo catalog" logo={PROJECT_MEDIA.movies.logo} dark={dark}>
      <form onSubmit={search} style={{ display: "flex", gap: 10, marginBottom: "1rem" }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          style={{
            flex: 1,
            padding: "12px 16px",
            borderRadius: 10,
            border: `1px solid ${border}`,
            background: surface,
            color: text,
            fontSize: 15,
          }}
        />
        <button type="submit" className="btn-primary" disabled={loading} style={{ padding: "12px 20px" }}>
          {loading ? "..." : "Search"}
        </button>
      </form>

      {error && (
        <p className="mono" style={{ fontSize: 12, color: muted, marginBottom: "1rem" }}>
          {error}
        </p>
      )}

      <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 1.2fr" : "1fr", gap: "1.5rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: 12,
            alignContent: "start",
          }}
        >
          {results.map((m) => (
            <article
              key={m.imdbID}
              onClick={() => setSelected(m)}
              style={{
                ...card,
                outline: selected?.imdbID === m.imdbID ? `2px solid ${accent}` : "none",
              }}
            >
              <img src={poster(m)} alt={m.Title} style={{ width: "100%", aspectRatio: "2/3", objectFit: "cover" }} />
              <div style={{ padding: "10px 12px" }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{m.Title}</h3>
                <p className="mono" style={{ fontSize: 11, color: muted }}>
                  {m.Year} · ⭐ {m.imdbRating || "—"}
                </p>
              </div>
            </article>
          ))}
        </div>

        {selected && (
          <div
            style={{
              borderRadius: 14,
              border: `1px solid ${border}`,
              background: dark ? "rgba(255,255,255,0.03)" : "#fff",
              padding: "1.25rem",
              position: "sticky",
              top: 80,
            }}
          >
            <img
              src={poster(selected)}
              alt={selected.Title}
              style={{ width: "100%", maxWidth: 220, borderRadius: 10, marginBottom: "1rem" }}
            />
            <h2 className="display" style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 8 }}>
              {selected.Title} ({selected.Year})
            </h2>
            <p style={{ color: muted, fontSize: 13, marginBottom: 8 }}>{selected.Genre}</p>
            <p style={{ lineHeight: 1.7, fontSize: 15 }}>{selected.Plot}</p>
            <p style={{ marginTop: 12, color: accent, fontWeight: 600 }}>IMDb {selected.imdbRating}/10</p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
