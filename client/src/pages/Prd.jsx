import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchRequirements } from "../api.js";
import { Badge, Sticky, Tag } from "../components/Shared.jsx";
import { Reveal, Count, StaggerLines } from "../hooks/useMotion.jsx";

const prioTone = { P0: "p0", P1: "orange", P2: "amber" };

export default function Prd() {
  const [requirements, setRequirements] = useState([]);
  useEffect(() => {
    fetchRequirements().then(setRequirements);
  }, []);

  return (
    <>
      <header style={{ padding: "64px 0 20px" }}>
        <div className="container" style={{ position: "relative" }}>
          <Badge>DOC STATUS: APPROVED ✓</Badge>
          <h1 style={{ marginTop: 22 }}>
            <StaggerLines lines={[<>PRD: <span className="hl hl-yellow">Nisargi Shah</span></>]} />
          </h1>
          <p className="lead" style={{ marginTop: 16 }}>
            Most portfolios tell you what someone did. A PRD tells you why they're worth building with. Review it the
            way you'd review any product doc — critically.
          </p>
        </div>
      </header>

      <section style={{ paddingTop: 28 }}>
        <div className="container">
          <Reveal className="doc">
            <div className="hero-notes" style={{ position: "absolute", top: -18, right: 28 }}>
              <Sticky tone="pink" style={{ maxWidth: 170 }}>
                REVIEWER NOTE:<br />scroll to §06 —<br />she listed her own risks. bold.
              </Sticky>
            </div>

            <Tag tone="purple">PRODUCT REQUIREMENTS DOCUMENT</Tag>
            <h2 style={{ margin: "14px 0 0", fontSize: 32 }}>Candidate-as-a-Product v1.0</h2>

            <dl className="doc-meta">
              <dt>AUTHOR</dt><dd>Nisargi Shah (dogfooding this product since 2003)</dd>
              <dt>REVIEWERS</dt><dd>You — hiring manager / recruiter / future teammate</dd>
              <dt>STATUS</dt><dd style={{ color: "var(--green)", fontWeight: 600 }}>Approved — open to opportunities</dd>
              <dt>TARGET RELEASE</dt><dd>Your next sprint</dd>
              <dt>LOCATION</dt><dd>Navi Mumbai, India · open to relocation</dd>
              <dt>CONTACT</dt>
              <dd>
                <a href="mailto:nisargi3112@gmail.com">nisargi3112@gmail.com</a> ·{" "}
                <a href="https://www.linkedin.com/in/nisargi-shah/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </dd>
            </dl>

            <Reveal className="doc-section">
              <h3>01 — Problem statement</h3>
              <p style={{ fontSize: 15.5 }}>
                Teams building data-heavy products lose weeks translating between engineers, business stakeholders, and
                vendors. Analysts who can read a model's output often can't run a stakeholder meeting; PMs who can run
                the meeting often can't read the model. <strong>The market lacks people who have actually owned a
                product end-to-end across that divide</strong> — not observed one, owned one.
              </p>
            </Reveal>

            <Reveal className="doc-section">
              <h3>02 — Proposed solution</h3>
              <p style={{ fontSize: 15.5 }}>
                One hire fluent in both dialects. At 23, I have already: owned an industrial ML product from
                requirement-gathering to production deployment, run business analysis across 5 concurrent IoT projects,
                managed a vendor relationship with GE Vernova, and built geospatial data pipelines at ISRO. B.Tech CS
                (9.31 CGPA) under the hood.
              </p>
            </Reveal>

            <Reveal className="doc-section">
              <h3>03 — Target users</h3>
              <div className="persona-grid">
                <div className="card flat persona">
                  <div className="avatar" style={{ background: "var(--purple-light)", color: "#534AB7" }}>PM</div>
                  <strong style={{ fontFamily: "var(--font-display)" }}>The product leader</strong>
                  <blockquote>"I need an APM who won't drown in ambiguity — someone who has shipped, not just studied frameworks."</blockquote>
                  <p style={{ fontSize: 13, marginTop: 10, color: "var(--green)", fontFamily: "var(--font-mono)" }}>✓ served by: end-to-end GT product ownership</p>
                </div>
                <div className="card flat persona">
                  <div className="avatar" style={{ background: "var(--green-light)", color: "var(--teal-dark)" }}>DL</div>
                  <strong style={{ fontFamily: "var(--font-display)" }}>The data team lead</strong>
                  <blockquote>"I need an analyst who understands deployment reality — MLOps, messy sensors, actual users."</blockquote>
                  <p style={{ fontSize: 13, marginTop: 10, color: "var(--green)", fontFamily: "var(--font-mono)" }}>✓ served by: production ML on 150K+ assets</p>
                </div>
                <div className="card flat persona">
                  <div className="avatar" style={{ background: "#FAECE7", color: "#993C1D" }}>F</div>
                  <strong style={{ fontFamily: "var(--font-display)" }}>The founder</strong>
                  <blockquote>"I need one person who can talk to customers in the morning and query the database after lunch."</blockquote>
                  <p style={{ fontSize: 13, marginTop: 10, color: "var(--green)", fontFamily: "var(--font-mono)" }}>✓ served by: full-stack generalist profile</p>
                </div>
              </div>
            </Reveal>

            <Reveal className="doc-section">
              <h3>04 — Requirements (all shipped)</h3>
              {requirements.map((r) => (
                <div className="req-row" key={r.text}>
                  <Tag tone={prioTone[r.priority]}>{r.priority}</Tag>
                  <span className="req-text">{r.text}</span>
                  <span className="req-status">{r.status}</span>
                </div>
              ))}
            </Reveal>

            <Reveal className="doc-section">
              <h3>05 — Success metrics</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
                <div style={{ background: "#FAFAF5", borderRadius: 8, padding: 16 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 24, fontWeight: 700 }}><Count to={150} suffix="K+" /></span>
                  <p style={{ fontSize: 12, color: "var(--muted)" }}>assets under APM across 10 sites</p>
                </div>
                <div style={{ background: "#FAFAF5", borderRadius: 8, padding: 16 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 24, fontWeight: 700, color: "var(--purple)" }}>3–8 d</span>
                  <p style={{ fontSize: 12, color: "var(--muted)" }}>advance warning before equipment failure</p>
                </div>
                <div style={{ background: "#FAFAF5", borderRadius: 8, padding: 16 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 24, fontWeight: 700 }}><Count to={1000} /></span>
                  <p style={{ fontSize: 12, color: "var(--muted)" }}>critical assets on early event detection</p>
                </div>
                <div style={{ background: "#FAFAF5", borderRadius: 8, padding: 16 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 24, fontWeight: 700, color: "var(--green)" }}><Count to={9.31} decimals={2} /></span>
                  <p style={{ fontSize: 12, color: "var(--muted)" }}>CGPA, B.Tech Computer Science</p>
                </div>
                <div style={{ background: "#FAFAF5", borderRadius: 8, padding: 16 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 24, fontWeight: 700 }}>~80</span>
                  <p style={{ fontSize: 12, color: "var(--muted)" }}>rotary assets instrumented via 3 IoT projects</p>
                </div>
                <div style={{ background: "#FAFAF5", borderRadius: 8, padding: 16 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 24, fontWeight: 700, color: "var(--orange)" }}>#53</span>
                  <p style={{ fontSize: 12, color: "var(--muted)" }}>international rank, Mathematics Olympiad</p>
                </div>
              </div>
            </Reveal>

            <Reveal className="doc-section">
              <h3>06 — Risks &amp; mitigations</h3>
              <div style={{ display: "grid", gap: 10 }}>
                {[
                  ["Early-career profile — under two years post-graduation.", "Shipped a production ML product in year one. Most careers don't compound this fast."],
                  ["Domain experience concentrated in industrial IoT.", "The domain changed three times already (web → space → energy). The method — learn fast, ship — transferred every time."],
                  ["Might outgrow the role quickly.", "That's not a risk. That's the roadmap."],
                ].map(([risk, mit]) => (
                  <div key={risk} style={{ background: "#FAFAF5", borderRadius: 8, padding: "14px 18px", fontSize: 14.5 }}>
                    <span style={{ color: "var(--red)", fontFamily: "var(--font-mono)", fontWeight: 700 }}>RISK:</span> {risk}
                    <br />
                    <span style={{ color: "var(--green)", fontFamily: "var(--font-mono)", fontWeight: 700 }}>MITIGATION:</span> {mit}
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="doc-section">
              <h3>07 — Out of scope</h3>
              <ul style={{ listStyle: "none", fontSize: 14.5, color: "var(--muted)" }}>
                <li style={{ padding: "6px 0" }}>✗ Saying "let's circle back" without a date attached</li>
                <li style={{ padding: "6px 0" }}>✗ Roadmaps that are actually wishlists</li>
                <li style={{ padding: "6px 0" }}>✗ Dashboards nobody opens twice</li>
                <li style={{ padding: "6px 0" }}>✗ Estimating in "it should be quick"</li>
              </ul>
            </Reveal>

            <Reveal className="doc-section" style={{ marginBottom: 0 }}>
              <h3>08 — Appendix</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18 }}>
                <div>
                  <strong style={{ fontFamily: "var(--font-display)", fontSize: 15 }}>Education</strong>
                  <p style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 6 }}>
                    B.Tech Computer Science, Pandit Deendayal Energy University — CGPA 9.31 (2021–2025)
                  </p>
                </div>
                <div>
                  <strong style={{ fontFamily: "var(--font-display)", fontSize: 15 }}>Certifications</strong>
                  <p style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 6 }}>
                    McKinsey Forward Program (McKinsey &amp; Company) · Google Cloud GenAI Fundamentals · Incubation &amp; Entrepreneurship, IIT Bombay (NPTEL)
                  </p>
                </div>
                <div>
                  <strong style={{ fontFamily: "var(--font-display)", fontSize: 15 }}>Also ships with</strong>
                  <p style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 6 }}>
                    Editor-in-Chief, dept. newsletter · Black belt, Karate · English, Hindi, Gujarati; French (beginner)
                  </p>
                </div>
              </div>
            </Reveal>
          </Reveal>

          <Reveal className="card" style={{ marginTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div>
              <strong style={{ fontFamily: "var(--font-display)", fontSize: 18 }}>Sign-off required</strong>
              <p style={{ fontSize: 13.5, color: "var(--muted)" }}>Approve this PRD and move it to your sprint.</p>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="btn primary" to="/roadmap">See the roadmap →</Link>
              <Link className="btn orange" to="/contact">Approve &amp; book demo</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
