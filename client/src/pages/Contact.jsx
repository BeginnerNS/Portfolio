import { useState } from "react";
import { Link } from "react-router-dom";
import { submitDemoRequest } from "../api.js";
import { Badge, Sticky, Tag } from "../components/Shared.jsx";
import { Reveal, StaggerLines } from "../hooks/useMotion.jsx";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setStatus(null);
    try {
      const res = await submitDemoRequest(form);
      setStatus({ ok: true, msg: res.message || "Demo request received. SLA: reply within 24h." });
      setForm({ name: "", email: "", company: "", message: "" });
    } catch (err) {
      setStatus({
        ok: false,
        msg: `${err.message} — or email nisargi3112@gmail.com directly.`,
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <header style={{ padding: "64px 0 30px" }}>
        <div className="container" style={{ position: "relative" }}>
          <div className="hero-notes" style={{ position: "absolute", top: 0, right: 0 }}>
            <Sticky style={{ maxWidth: 170 }}>
              SLA:<br />replies in &lt; 24h.<br />usually much faster.
            </Sticky>
          </div>
          <Badge>CALENDAR STATUS: OPEN</Badge>
          <h1 style={{ marginTop: 22 }}>
            <StaggerLines lines={[<>Book a <span className="hl hl-yellow">demo.</span></>]} />
          </h1>
          <p className="lead" style={{ marginTop: 16 }}>
            Every good product deserves a live walkthrough. 30 minutes — you bring the questions, I bring the receipts.
          </p>
        </div>
      </header>

      <section style={{ paddingTop: 24 }}>
        <div className="container">
          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 24, alignItems: "start" }}>
            <Reveal className="card">
              <Tag tone="purple">DEMO REQUEST FORM</Tag>
              <p style={{ fontSize: 14, color: "var(--muted)", margin: "12px 0 20px" }}>
                Submissions land straight in my inbox — triaged like any incoming feature request, replied to like a P0.
              </p>
              <form onSubmit={onSubmit}>
                <div className="field">
                  <label htmlFor="name">Name *</label>
                  <input id="name" name="name" value={form.name} onChange={onChange} required maxLength={120} placeholder="Ada Lovelace" />
                </div>
                <div className="field">
                  <label htmlFor="email">Email *</label>
                  <input id="email" name="email" type="email" value={form.email} onChange={onChange} required maxLength={200} placeholder="ada@company.com" />
                </div>
                <div className="field">
                  <label htmlFor="company">Company / team</label>
                  <input id="company" name="company" value={form.company} onChange={onChange} maxLength={200} placeholder="Where would I be shipping?" />
                </div>
                <div className="field">
                  <label htmlFor="message">Feature request</label>
                  <textarea id="message" name="message" value={form.message} onChange={onChange} maxLength={2000} placeholder="The role, the problem, the timeline — whatever's on your roadmap." />
                </div>
                <button className="btn orange" type="submit" disabled={busy}>
                  {busy ? <span className="spin">◌</span> : "Submit demo request →"}
                </button>
                {status && <div className={`form-status ${status.ok ? "ok" : "err"}`}>{status.ok ? "✓ " : "✗ "}{status.msg}</div>}
              </form>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="card flat" style={{ marginBottom: 18 }}>
                <Tag tone="teal">CONTACT ENDPOINTS</Tag>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, marginTop: 14, lineHeight: 2.2 }}>
                  <p><span style={{ color: "var(--faint)" }}>email:</span> <a href="mailto:nisargi3112@gmail.com" style={{ color: "var(--ink)" }}>nisargi3112@gmail.com</a></p>
                  <p><span style={{ color: "var(--faint)" }}>linkedin:</span> <a href="https://www.linkedin.com/in/nisargi-shah/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--ink)" }}>/in/nisargi-shah</a></p>
                  <p><span style={{ color: "var(--faint)" }}>location:</span> Navi Mumbai, IN</p>
                  <p><span style={{ color: "var(--faint)" }}>timezone:</span> IST (UTC+5:30)</p>
                </div>
              </div>

              <div className="card flat">
                <Tag tone="orange">SPEC SHEETS</Tag>
                <p style={{ fontSize: 13.5, color: "var(--muted)", margin: "12px 0 14px" }}>
                  The one-page version, for your ATS and your skim-readers.
                </p>
                <a className="btn yellow" style={{ fontSize: 13, padding: "10px 16px" }} href="/Nisargi_Shah_Resume_AssociateProductManager.pdf" download>
                  Resume (PDF) ↓
                </a>
              </div>

              <Sticky tone="pink" style={{ margin: "30px auto 0", maxWidth: 210 }}>
                WHAT THE DEMO COVERS:<br />
                00:00 — the turbine story<br />
                00:10 — 5 epics, 1 vendor<br />
                00:20 — your roadmap<br />
                00:30 — hard Q&amp;A
              </Sticky>
            </Reveal>
          </div>

          <Reveal className="card" style={{ background: "var(--ink)", color: "var(--board)", textAlign: "center", padding: "48px 30px", marginTop: 48 }}>
            <h2 style={{ color: "var(--board)" }}>
              Still comparing <span style={{ color: "var(--teal)" }}>candidates?</span>
            </h2>
            <p style={{ color: "#B8B5A8", maxWidth: 460, margin: "14px auto 24px", fontSize: 15 }}>
              Good. Comparison shopping is healthy — it's how I'd evaluate a product too. Just note which portfolio came
              with acceptance criteria.
            </p>
            <Link className="btn yellow" to="/prd">Re-read the PRD</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
