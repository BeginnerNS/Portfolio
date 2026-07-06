import { useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useProgressBar } from "../hooks/useMotion.jsx";

export function ProgressBar() {
  const pct = useProgressBar();
  return <div id="progress" style={{ width: `${pct}%` }} />;
}

export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

export function Nav() {
  return (
    <nav>
      <div className="nav-inner">
        <Link className="logo" to="/">
          NISARGI.SHIP <span className="v">v1.0</span>
        </Link>
        <div className="nav-links">
          <NavLink to="/prd" className={({ isActive }) => (isActive ? "active" : "")}>PRD</NavLink>
          <NavLink to="/roadmap" className={({ isActive }) => (isActive ? "active" : "")}>Roadmap</NavLink>
          <NavLink to="/board" className={({ isActive }) => (isActive ? "active" : "")}>Sprint board</NavLink>
          <NavLink to="/contact" className="btn-demo">Book a demo</NavLink>
        </div>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <p>NISARGI SHAH © 2026 — built like a product: PRD'd, roadmapped, shipped. Stack: MongoDB · Express · React · Node.</p>
        <p>
          <a href="mailto:nisargi3112@gmail.com">nisargi3112@gmail.com</a> ·{" "}
          <a href="https://www.linkedin.com/in/nisargi-shah/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        </p>
      </div>
    </footer>
  );
}

export function Badge({ children }) {
  return (
    <span className="badge">
      <span className="pulse" />
      {children}
    </span>
  );
}

export function Sticky({ tone = "", style, children }) {
  return (
    <div className={`sticky ${tone}`} style={style}>
      {children}
    </div>
  );
}

export function Tag({ tone = "purple", children }) {
  return <span className={`tag tag-${tone}`}>{children}</span>;
}

export function Gherkin({ feature, lines }) {
  return (
    <div className="gherkin">
      <span className="feat">Feature:</span> {feature}
      <br />
      {lines.map((l, i) => (
        <span key={i}>
          <span className="kw">{l.keyword}</span> {l.text}
          <br />
        </span>
      ))}
    </div>
  );
}
