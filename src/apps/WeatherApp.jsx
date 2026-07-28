import { useState, useEffect } from "react";
import AppShell from "./AppShell";
import { PROJECT_MEDIA } from "../data/projectImages";
import { useTheme } from "../hooks/useTheme";

const WMO = {
  0: "Clear",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Foggy",
  48: "Foggy",
  51: "Drizzle",
  61: "Rain",
  63: "Rain",
  65: "Heavy rain",
  71: "Snow",
  80: "Showers",
  95: "Thunderstorm",
};

const EMOJI = { 0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️", 45: "🌫️", 61: "🌧️", 71: "❄️", 95: "⛈️" };

function weatherEmoji(code) {
  if (EMOJI[code]) return EMOJI[code];
  if (code >= 51 && code < 70) return "🌧️";
  if (code >= 71 && code < 80) return "❄️";
  return "🌡️";
}

export default function WeatherApp({ dark }) {
  const { border, muted, text, accent, accent2, surface } = useTheme(dark);
  const [city, setCity] = useState("Accra");
  const [query, setQuery] = useState("Accra");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (e) => {
    e?.preventDefault();
    const name = query.trim();
    if (!name) return;
    setLoading(true);
    setError("");
    setCity(name);
    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=1`
      );
      const geo = await geoRes.json();
      if (!geo.results?.length) throw new Error("City not found");
      const { latitude, longitude, name: cityName, country } = geo.results[0];

      const wxRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto&forecast_days=5`
      );
      const wx = await wxRes.json();
      setData({ cityName, country, ...wx });
    } catch (err) {
      setError(err.message || "Failed to load weather");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const card = {
    borderRadius: 14,
    border: `1px solid ${border}`,
    background: dark ? "rgba(255,255,255,0.03)" : "#fff",
    padding: "1.25rem",
  };

  const current = data?.current;
  const code = current?.weather_code ?? 0;

  return (
    <AppShell title="Weather Dashboard" subtitle="Open-Meteo API · live data" logo={PROJECT_MEDIA.weather.logo} dark={dark}>
      <form onSubmit={fetchWeather} style={{ display: "flex", gap: 10, marginBottom: "1.5rem" }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="City name..."
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

      {error && <p style={{ color: "#f87171", marginBottom: "1rem" }}>{error}</p>}

      {!data && !loading && !error && (
        <p style={{ color: muted, textAlign: "center" }}>Search for a city to see live weather.</p>
      )}

      {current && (
        <>
          <div style={{ ...card, textAlign: "center", marginBottom: "1.25rem" }}>
            <div style={{ fontSize: 56 }}>{weatherEmoji(code)}</div>
            <h2 className="display" style={{ fontSize: "2rem", fontWeight: 700 }}>
              {data.cityName}, {data.country}
            </h2>
            <p style={{ fontSize: "3rem", fontWeight: 800, color: accent, margin: "0.5rem 0" }}>
              {Math.round(current.temperature_2m)}°C
            </p>
            <p style={{ color: muted }}>{WMO[code] || "Weather"}</p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 24,
                marginTop: "1rem",
                fontSize: 14,
                color: muted,
              }}
            >
              <span>💧 {current.relative_humidity_2m}% humidity</span>
              <span>💨 {current.wind_speed_10m} km/h wind</span>
            </div>
          </div>

          <h3 style={{ fontSize: 14, color: muted, marginBottom: 12 }} className="mono">
            5-DAY FORECAST
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: 10 }}>
            {data.daily.time.map((day, i) => (
              <div key={day} style={{ ...card, textAlign: "center", padding: "1rem" }}>
                <p className="mono" style={{ fontSize: 11, color: muted }}>
                  {new Date(day).toLocaleDateString(undefined, { weekday: "short" })}
                </p>
                <p style={{ fontSize: 28, margin: "6px 0" }}>{weatherEmoji(data.daily.weather_code[i])}</p>
                <p style={{ fontWeight: 600, color: accent2 }}>{Math.round(data.daily.temperature_2m_max[i])}°</p>
                <p style={{ fontSize: 12, color: muted }}>{Math.round(data.daily.temperature_2m_min[i])}°</p>
              </div>
            ))}
          </div>
        </>
      )}
    </AppShell>
  );
}
