import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchReleases } from "../api.js";
import { Badge, Sticky, Tag, Gherkin } from "../components/Shared.jsx";
import { Reveal, StaggerLines } from "../hooks/useMotion.jsx";

const toneCycle = ["purple", "teal", "orange", "amber", "purple"];
const pillClass = { NEXT: "version-pill next", GA: "version-pill ga" };

export default function Roadmap() {
  const [releases, setReleases] = useState([]);
  useEffect(() => {
    fetchReleases().then(setReleases);
  }, []);

  return (
    <>
      <header style={{ padding: "64px 0 30px" }}>
        <div className="container" style={{ position: "relative" }}>
          <div className="hero-notes" style={{ position: "absolute", top: 0, right: 0 }}>
            <Sticky style={{ maxWidth: 170 }}>
              SHIPPING CADENCE:<br />every version ships<br />bigger than the last.
            </Sticky>
          </div>
          <Badge>RELEASE TRAIN — ON SCHEDULE</Badge>
          <h1 style={{ marginTop: 22 }}>
            <StaggerLines lines={[<>The <span className="hl hl-teal">roadmap</span>,</>, "with release notes."]} />
          </h1>
          <p className="lead" style={{ marginTop: 16 }}>
            Experience sections list duties. Release notes list what actually shipped — with acceptance criteria in
            Gherkin, because "responsible for" is not a testable statement.
          </p>
        </div>
      </header>

      <section style={{ paddingTop: 24 }}>
        <div className="container">
          <div className="timeline">
            {releases.map((r) => (
              <Reveal className={`release ${r.kind === "current" ? "current" : ""} ${r.kind === "future" ? "future" : ""}`} key={r.version}>
                <div className="release-head">
                  <span className={pillClass[r.label] || "version-pill"}>
                    {r.version} — {r.label}
                  </span>
                  <span className="release-date">{r.dateRange}</span>
                </div>
                <h3>{r.title}</h3>
                <p className="role">{r.role}</p>

                <div className="card flat" style={r.kind === "future" ? { borderStyle: "dashed" } : undefined}>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--purple)", letterSpacing: 1, marginBottom: 12 }}>
                    RELEASE NOTES
                  </p>
                  <ul>
                    {r.notes.map((n) => (
                      <li key={n.heading}>
                        <strong>{n.heading}:</strong> {n.body}
                      </li>
                    ))}
                  </ul>
                  {r.gherkin && (
                    <div style={{ marginTop: 16 }}>
                      <Gherkin feature={r.gherkin.feature} lines={r.gherkin.lines} />
                    </div>
                  )}
                  {r.tags.length > 0 && (
                    <div className="tags-row">
                      {r.tags.map((t, i) => (
                        <Tag key={t} tone={toneCycle[i % toneCycle.length]}>{t}</Tag>
                      ))}
                    </div>
                  )}
                  {r.kind === "future" && (
                    <Link className="btn orange" style={{ marginTop: 14, fontSize: 13, padding: "9px 18px" }} to="/contact">
                      Propose scope →
                    </Link>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="card" style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div>
              <strong style={{ fontFamily: "var(--font-display)", fontSize: 18 }}>Want the work items behind the releases?</strong>
              <p style={{ fontSize: 13.5, color: "var(--muted)" }}>Every project, on one sprint board.</p>
            </div>
            <Link className="btn primary" to="/board">Open sprint board →</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
