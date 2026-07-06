import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProjects } from "../api.js";
import { Badge, Sticky, Tag } from "../components/Shared.jsx";
import { Reveal, StaggerLines } from "../hooks/useMotion.jsx";

const columns = [
  { key: "production", title: "IN PRODUCTION", color: "var(--teal-dark)", dot: "var(--green)" },
  { key: "shipped", title: "SHIPPED", color: "#534AB7", dot: "var(--purple)" },
  { key: "backlog", title: "LEARNING BACKLOG", color: "#854F0B", dot: "#EF9F27" },
];

export default function Board() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    fetchProjects().then(setProjects);
  }, []);

  return (
    <>
      <header style={{ padding: "64px 0 30px" }}>
        <div className="container" style={{ position: "relative" }}>
          <div className="hero-notes" style={{ position: "absolute", top: 0, right: 0 }}>
            <Sticky tone="teal" style={{ maxWidth: 170 }}>
              STANDUP SUMMARY:<br />no blockers.<br />never blockers.
            </Sticky>
          </div>
          <Badge>VELOCITY: HIGH · BLOCKERS: 0</Badge>
          <h1 style={{ marginTop: 22 }}>
            <StaggerLines lines={[<>Sprint: <span className="hl">career</span></>, "highlights"]} />
          </h1>
          <p className="lead" style={{ marginTop: 16 }}>
            Every project I've shipped, in the format PMs trust most. Cards don't lie — they're either done or they're
            not.
          </p>
        </div>
      </header>

      <section style={{ paddingTop: 24 }}>
        <div className="container">
          <div className="kanban">
            {columns.map((col, ci) => {
              const cards = projects.filter((p) => p.column === col.key);
              return (
                <Reveal key={col.key} delay={ci * 0.1}>
                  <p className="kanban-col-head" style={{ color: col.color }}>
                    <span className="dot" style={{ background: col.dot }} />
                    {col.title} <span className="count">({cards.length})</span>
                  </p>
                  {cards.map((p) => (
                    <div
                      className={`kcard ${p.dashed ? "dashed" : ""}`}
                      key={p.title}
                      style={p.title.includes("hardest problem") ? { borderColor: "var(--orange)" } : undefined}
                    >
                      <h4>{p.title}</h4>
                      <p>{p.description}</p>
                      <div className="kfoot">
                        <div>
                          {p.tags.map((t) => (
                            <Tag key={t.label} tone={t.tone}>{t.label}</Tag>
                          ))}
                        </div>
                        {p.title.includes("hardest problem") ? (
                          <Link to="/contact" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--orange)" }}>
                            assign to me →
                          </Link>
                        ) : (
                          <span className="pts">{p.points}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </Reveal>
              );
            })}
          </div>

          <Reveal className="card" style={{ marginTop: 40, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div>
              <strong style={{ fontFamily: "var(--font-display)", fontSize: 18 }}>Sprint review scheduled?</strong>
              <p style={{ fontSize: 13.5, color: "var(--muted)" }}>30 minutes. Bring questions, I'll bring receipts.</p>
            </div>
            <Link className="btn orange" to="/contact">Book a demo →</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
