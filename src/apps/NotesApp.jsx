import { useState } from "react";
import AppShell from "./AppShell";
import { PROJECT_MEDIA } from "../data/projectImages";
import { useTheme } from "../hooks/useTheme";
import { loadJson, saveJson } from "../utils/storage";

const KEY = "portfolio-notes";

export default function NotesApp({ dark }) {
  const { border, muted, text, accent, accent2, surface } = useTheme(dark);
  const [notes, setNotes] = useState(() => loadJson(KEY, []));
  const [activeId, setActiveId] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const active = notes.find((n) => n.id === activeId);

  const persist = (next) => {
    setNotes(next);
    saveJson(KEY, next);
  };

  const selectNote = (note) => {
    setActiveId(note.id);
    setTitle(note.title);
    setBody(note.body);
  };

  const newNote = () => {
    const note = { id: crypto.randomUUID(), title: "Untitled", body: "", updated: Date.now() };
    persist([note, ...notes]);
    selectNote(note);
  };

  const save = () => {
    if (!activeId) return;
    const next = notes.map((n) =>
      n.id === activeId ? { ...n, title: title.trim() || "Untitled", body, updated: Date.now() } : n
    );
    persist(next);
  };

  const remove = (id) => {
    persist(notes.filter((n) => n.id !== id));
    if (activeId === id) {
      setActiveId(null);
      setTitle("");
      setBody("");
    }
  };

  const panel = {
    borderRadius: 14,
    border: `1px solid ${border}`,
    background: dark ? "rgba(255,255,255,0.03)" : "#fff",
  };

  return (
    <AppShell title="Notes App" subtitle="Save · edit · delete · local storage" logo={PROJECT_MEDIA.notes.logo} dark={dark}>
      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "1rem", minHeight: 420 }}>
        <aside style={{ ...panel, padding: "0.75rem", display: "flex", flexDirection: "column" }}>
          <button type="button" className="btn-primary" onClick={newNote} style={{ width: "100%", marginBottom: 12 }}>
            + New note
          </button>
          <ul style={{ listStyle: "none", overflow: "auto", flex: 1 }}>
            {notes.length === 0 && <li style={{ color: muted, fontSize: 14, padding: 8 }}>No notes yet</li>}
            {notes.map((n) => (
              <li key={n.id}>
                <button
                  type="button"
                  onClick={() => selectNote(n)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "10px 12px",
                    marginBottom: 6,
                    borderRadius: 8,
                    border: `1px solid ${activeId === n.id ? accent : "transparent"}`,
                    background: activeId === n.id ? `${accent}15` : "transparent",
                    color: text,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{n.title}</div>
                  <div style={{ fontSize: 12, color: muted, marginTop: 2 }}>
                    {new Date(n.updated).toLocaleDateString()}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div style={{ ...panel, padding: "1.25rem", display: "flex", flexDirection: "column" }}>
          {activeId ? (
            <>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note title"
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  border: "none",
                  background: "transparent",
                  color: text,
                  marginBottom: 12,
                  width: "100%",
                }}
              />
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Start writing..."
                style={{
                  flex: 1,
                  minHeight: 280,
                  resize: "none",
                  border: `1px solid ${border}`,
                  borderRadius: 10,
                  padding: "12px 14px",
                  background: surface,
                  color: text,
                  fontSize: 15,
                  lineHeight: 1.7,
                }}
              />
              <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                <button type="button" className="btn-primary" onClick={save}>
                  Save
                </button>
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => remove(activeId)}
                  style={{ color: accent2, borderColor: `${accent2}50` }}
                >
                  Delete
                </button>
              </div>
            </>
          ) : (
            <p style={{ color: muted, margin: "auto", textAlign: "center" }}>
              Select a note or create a new one.
            </p>
          )}
        </div>
      </div>
    </AppShell>
  );
}
