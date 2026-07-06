import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProfile } from "../api.js";
import { Badge, Sticky, Tag } from "../components/Shared.jsx";
import { Reveal, Count, Typing, StaggerLines } from "../hooks/useMotion.jsx";

const accentStyles = {
  white: {},
  teal: { background: "var(--teal)" },
  orange: { background: "var(--orange)" },
};
const accentText = {
  white: {},
  teal: { color: "var(--teal-dark)" },
  orange: { color: "#FFD9CE" },
};

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [todoDone, setTodoDone] = useState(false);
  useEffect(() => {
    fetchProfile().then(setProfile);
  }, []);
  if (!profile) return null;

  return (
    <>
      <header style={{ position: "relative", padding: "80px 0 60px" }}>
        <div className="container" style={{ position: "relative" }}>
          <div className="hero-notes" style={{ position: "absolute", top: -16, right: 0, zIndex: 2, width: 180 }}>
            <Sticky>
              LAUNCH CHECKLIST:<br />
              ☑ ship ML product<br />
              ☑ intern @ ISRO<br />
              ☑ 9.31 CGPA<br />
              <span
                style={{ cursor: "pointer", textDecoration: todoDone ? "line-through" : "none" }}
                onClick={() => setTodoDone(true)}
              >
                {todoDone ? "☑" : "☐"} join your team
              </span>
            </Sticky>
          </div>

          <Badge>SPRINT ∞ — STATUS: {profile.status}</Badge>

          <h1 style={{ margin: "26px 0 0" }}>
            <StaggerLines
              lines={[
                "Every career is",
                "a product.",
                <>
                  <span className="outline">Here's my</span> <span className="hl">launch.</span>
                </>,
              ]}
            />
          </h1>

          <p className="lead" style={{ marginTop: 22 }}>
            I'm <strong>{profile.name}</strong> — a product-minded analyst who{" "}
            <Typing
              words={[
                "ships ML products end-to-end.",
                "translates engineers ↔ business.",
                "predicts failures 3–8 days early.",
                "managed 5 epics at once.",
              ]}
            />
            <br />
            <br />
            At Reliance Industries I owned a gas-turbine failure-prediction product from first requirement to
            production. Before that, I taught satellites to read soil at ISRO. This site is my portfolio, written the
            way I work — as a PRD, a roadmap, and a sprint board.
          </p>

          <div style={{ display: "flex", gap: 14, marginTop: 30, flexWrap: "wrap" }}>
            <Link className="btn primary" to="/prd">Read the PRD →</Link>
            <a className="btn" href="/Nisargi_Shah_Resume_AssociateProductManager.pdf" download>Spec sheet (PDF) ↓</a>
          </div>

          <div style={{ display: "flex", gap: 14, marginTop: 44, flexWrap: "wrap" }}>
            {profile.stats.map((s, i) => (
              <Reveal key={s.label} className="stat-sticker" delay={i * 0.1} style={{ ...accentStyles[s.accent], transform: `rotate(${[-1.4, 1.6, -2, 1.2][i % 4]}deg)`, transitionDelay: `${i * 0.1}s` }}>
                <span className="num" style={s.accent === "orange" ? { color: "#fff" } : undefined}>
                  {s.value === "150K+" ? <Count to={150} suffix="K+" /> : s.value === "5" ? <Count to={5} /> : s.value}
                </span>
                <span className="lbl" style={accentText[s.accent]}>{s.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </header>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <span key={k}>
              CHANGELOG: <em>v1.0 GA</em> @ RELIANCE INDUSTRIES ✦ <em>v0.9 RC</em> @ ISRO ✦ <em>v0.6 BETA</em> @ AM/NS ✦{" "}
              <em>v0.1 ALPHA</em> @ PDEU ✦ NEXT RELEASE: <em>v2.0</em> @ YOUR TEAM ✦{" "}
            </span>
          ))}
        </div>
      </div>

      <section>
        <div className="container">
          <Reveal className="section-head">
            <span className="num">01</span>
            <h2>
              What ships <span className="hl hl-yellow">in the box</span>
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            <Reveal className="card">
              <Tag tone="p0">CORE FEATURE</Tag>
              <h3 style={{ margin: "14px 0 10px" }}>Product ownership</h3>
              <p style={{ fontSize: 14.5, color: "var(--muted)" }}>
                Owned the full lifecycle of an in-house ML product — gathered requirements from reliability engineers,
                defined features, coordinated the dev team, and drove deployment. Not shadowed. Owned.
              </p>
              <div className="tags-row">
                <Tag tone="purple">requirements → prod</Tag>
                <Tag tone="teal">GT health monitoring</Tag>
              </div>
            </Reveal>
            <Reveal className="card" delay={0.1}>
              <Tag tone="p0">CORE FEATURE</Tag>
              <h3 style={{ margin: "14px 0 10px" }}>Data science, applied</h3>
              <p style={{ fontSize: 14.5, color: "var(--muted)" }}>
                Failure prediction, anomaly detection, MLOps pipelines — deployed on real turbines, not notebooks. Plus
                geospatial pipelines at ISRO: soil-moisture estimation at 100 m resolution.
              </p>
              <div className="tags-row">
                <Tag tone="purple">Python · SQL</Tag>
                <Tag tone="teal">MLOps</Tag>
                <Tag tone="orange">Power BI · Tableau</Tag>
              </div>
            </Reveal>
            <Reveal className="card" delay={0.2}>
              <Tag tone="p0">CORE FEATURE</Tag>
              <h3 style={{ margin: "14px 0 10px" }}>Stakeholder API</h3>
              <p style={{ fontSize: 14.5, color: "var(--muted)" }}>
                Fluent interface between engineering, operations, and vendors. Partnered with GE Vernova on APM across
                150,000+ assets and 10 sites while running business analysis on 5 concurrent projects.
              </p>
              <div className="tags-row">
                <Tag tone="purple">vendor mgmt</Tag>
                <Tag tone="teal">Gantt planning</Tag>
                <Tag tone="orange">GE Vernova</Tag>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 20 }}>
        <div className="container">
          <Reveal className="section-head">
            <span className="num">02</span>
            <h2>
              Flagship feature: <span className="hl hl-teal">predicting failure</span>
            </h2>
          </Reveal>
          <div className="case-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 28, alignItems: "start" }}>
            <Reveal left>
              <p className="kicker" style={{ marginBottom: 10 }}>// GT HEALTH MONITORING · RELIANCE INDUSTRIES</p>
              <p style={{ fontSize: 16, marginBottom: 16 }}>
                Gas turbines fail expensively and without much notice. Reliability engineers needed warnings, not
                autopsies. I owned the product that delivered them:
              </p>
              <ul style={{ listStyle: "none" }}>
                {[
                  ["DISCOVER", "sat with reliability engineers to turn tribal knowledge into requirements", "var(--purple)"],
                  ["DEFINE", "scoped failure prediction + anomaly detection with an MLOps pipeline", "var(--purple)"],
                  ["DELIVER", "coordinated the dev team and drove final production deployment", "var(--purple)"],
                  ["IMPACT", "3–8 days of advance failure warning; unplanned outages prevented", "var(--green)"],
                ].map(([k, v, c], i, arr) => (
                  <li key={k} style={{ padding: "10px 0", borderBottom: i < arr.length - 1 ? "1.5px dashed #E3E0D4" : "none", fontSize: 14.5 }}>
                    <strong style={{ fontFamily: "var(--font-mono)", color: c }}>{k}</strong> — {v}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="gherkin">
                <span className="feat">Feature:</span> Prevent unplanned turbine outages<br />
                <span className="kw">Given</span> a gas turbine streaming sensor data<br />
                <span className="kw">When</span> the models detect failure signatures<br />
                <span className="kw">Then</span> operations get a warning <span className="val">3–8 days early</span><br />
                <span className="kw">And</span> production losses are prevented ✓
              </div>
              <Sticky tone="teal" style={{ margin: "26px auto 0", maxWidth: 220 }}>
                PM NOTE: this one feature<br />pays for the whole hire.
              </Sticky>
            </Reveal>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 20 }}>
        <div className="container">
          <Reveal className="section-head">
            <span className="num">03</span>
            <h2>Release history</h2>
            <Link to="/roadmap" style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--ink)" }}>full roadmap →</Link>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18 }}>
            <Reveal className="card flat">
              <span className="version-pill ga">v1.0 GA</span>
              <h3 style={{ margin: "12px 0 6px", fontSize: 17 }}>Reliance Industries</h3>
              <p style={{ fontSize: 13.5, color: "var(--muted)" }}>Analyst, Digital &amp; IoT. Shipped ML product; 150K+ assets; 5 concurrent epics.</p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--faint)", marginTop: 10 }}>AUG 2025 → PRESENT</p>
            </Reveal>
            <Reveal className="card flat" delay={0.1}>
              <span className="version-pill">v0.9 RC</span>
              <h3 style={{ margin: "12px 0 6px", fontSize: 17 }}>ISRO — Space Application Centre</h3>
              <p style={{ fontSize: 13.5, color: "var(--muted)" }}>Data Science Intern. Satellite imagery pipeline, geospatial analysis @ 100 m.</p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--faint)", marginTop: 10 }}>JAN 2025 → MAY 2025</p>
            </Reveal>
            <Reveal className="card flat" delay={0.2}>
              <span className="version-pill">v0.6 BETA</span>
              <h3 style={{ margin: "12px 0 6px", fontSize: 17 }}>AM/NS India</h3>
              <p style={{ fontSize: 13.5, color: "var(--muted)" }}>Web Dev Intern. Rebuilt an employee notification product end-to-end.</p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--faint)", marginTop: 10 }}>JUN 2023 → JUL 2023</p>
            </Reveal>
            <Reveal className="card flat" delay={0.3} style={{ borderStyle: "dashed" }}>
              <span className="version-pill next">v2.0 — NEXT</span>
              <h3 style={{ margin: "12px 0 6px", fontSize: 17 }}>Your team</h3>
              <p style={{ fontSize: 13.5, color: "var(--muted)" }}>Accepting proposals. Requirements negotiable, delivery guaranteed.</p>
              <Link to="/contact" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--orange)", display: "inline-block", marginTop: 10 }}>book a demo →</Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal className="card" style={{ background: "var(--ink)", color: "var(--board)", textAlign: "center", padding: "56px 30px", boxShadow: "6px 6px 0 rgba(17,17,17,0.2)" }}>
            <p className="kicker" style={{ color: "var(--teal)", marginBottom: 12 }}>// DECISION TIME</p>
            <h2 style={{ color: "var(--board)" }}>
              Ready to review <span style={{ color: "var(--yellow)" }}>the full spec?</span>
            </h2>
            <p style={{ color: "#B8B5A8", maxWidth: 480, margin: "14px auto 28px", fontSize: 15 }}>
              Start with the PRD — problem statement, requirements, success metrics, and the risks section most
              candidates would hide.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link className="btn yellow" to="/prd">Open the PRD</Link>
              <Link className="btn orange" to="/contact">Book a demo</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
