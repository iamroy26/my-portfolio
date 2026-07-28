import { useState } from "react";
import AppShell from "./AppShell";
import { PROJECT_MEDIA } from "../data/projectImages";
import { useTheme } from "../hooks/useTheme";
import { loadJson, saveJson } from "../utils/storage";

const KEY = "portfolio-tasks";

export default function TaskManagerApp({ dark }) {
  const { border, muted, text, accent, accent2, surface } = useTheme(dark);
  const [tasks, setTasks] = useState(() => loadJson(KEY, []));
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  const persist = (next) => {
    setTasks(next);
    saveJson(KEY, next);
  };

  const addTask = (e) => {
    e.preventDefault();
    const title = input.trim();
    if (!title) return;
    persist([...tasks, { id: crypto.randomUUID(), title, done: false, created: Date.now() }]);
    setInput("");
  };

  const toggle = (id) => persist(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const remove = (id) => persist(tasks.filter((t) => t.id !== id));

  const shown =
    filter === "active" ? tasks.filter((t) => !t.done) : filter === "done" ? tasks.filter((t) => t.done) : tasks;

  const card = {
    borderRadius: 14,
    border: `1px solid ${border}`,
    background: dark ? "rgba(255,255,255,0.03)" : "#fff",
    padding: "1.25rem",
  };

  return (
    <AppShell title="Task Manager" subtitle="Local storage · React" logo={PROJECT_MEDIA.tasks.logo} dark={dark}>
      <form onSubmit={addTask} style={{ display: "flex", gap: 10, marginBottom: "1.5rem" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
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
        <button type="submit" className="btn-primary" style={{ padding: "12px 20px" }}>
          Add
        </button>
      </form>

      <div style={{ display: "flex", gap: 8, marginBottom: "1.25rem" }}>
        {["all", "active", "done"].map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className="mono"
            style={{
              padding: "6px 14px",
              borderRadius: 8,
              border: `1px solid ${filter === f ? accent : border}`,
              background: filter === f ? `${accent}18` : "transparent",
              color: filter === f ? accent : muted,
              cursor: "pointer",
              fontSize: 12,
              textTransform: "capitalize",
            }}
          >
            {f}
          </button>
        ))}
        <span className="mono" style={{ marginLeft: "auto", fontSize: 12, color: muted, alignSelf: "center" }}>
          {tasks.filter((t) => t.done).length}/{tasks.length} done
        </span>
      </div>

      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
        {shown.length === 0 && (
          <li style={{ ...card, textAlign: "center", color: muted }}>No tasks yet. Add one above!</li>
        )}
        {shown.map((t) => (
          <li
            key={t.id}
            style={{
              ...card,
              display: "flex",
              alignItems: "center",
              gap: 12,
              opacity: t.done ? 0.65 : 1,
            }}
          >
            <button
              type="button"
              onClick={() => toggle(t.id)}
              style={{
                width: 22,
                height: 22,
                borderRadius: 6,
                border: `2px solid ${t.done ? accent2 : border}`,
                background: t.done ? accent2 : "transparent",
                cursor: "pointer",
                flexShrink: 0,
                color: "#fff",
                fontSize: 12,
              }}
            >
              {t.done ? "✓" : ""}
            </button>
            <span style={{ flex: 1, textDecoration: t.done ? "line-through" : "none", color: t.done ? muted : text }}>
              {t.title}
            </span>
            <button
              type="button"
              onClick={() => remove(t.id)}
              style={{
                border: "none",
                background: "transparent",
                color: muted,
                cursor: "pointer",
                fontSize: 18,
              }}
              aria-label="Delete"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </AppShell>
  );
}
