import { useEffect, useRef, useState } from "react";

export function Reveal({ as: Tag = "div", className = "", delay = 0, left = false, children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      className={`${left ? "reveal-left" : "reveal"} ${className}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function Count({ to, suffix = "", decimals = 0, duration = 1400 }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (now) => {
          const p = Math.min((now - t0) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay((to * eased).toFixed(decimals));
          if (p < 1) requestAnimationFrame(tick);
          else setDisplay(to.toLocaleString(undefined, { minimumFractionDigits: decimals }));
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, decimals, duration]);
  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export function Typing({ words, typeMs = 70, deleteMs = 35, holdMs = 1600 }) {
  const [text, setText] = useState(words[0] || "");
  useEffect(() => {
    let wi = 0,
      ci = words[0].length,
      deleting = false,
      timer;
    const loop = () => {
      const word = words[wi];
      if (!deleting && ci < word.length) {
        ci++;
        timer = setTimeout(loop, typeMs);
      } else if (!deleting) {
        deleting = true;
        timer = setTimeout(loop, holdMs);
      } else if (ci > 0) {
        ci--;
        timer = setTimeout(loop, deleteMs);
      } else {
        deleting = false;
        wi = (wi + 1) % words.length;
        timer = setTimeout(loop, 300);
      }
      setText(words[wi].slice(0, ci));
    };
    timer = setTimeout(loop, holdMs);
    return () => clearTimeout(timer);
  }, [words, typeMs, deleteMs, holdMs]);
  return (
    <>
      {text}
      <span style={{ fontFamily: "var(--font-mono)", color: "var(--orange)" }}>▊</span>
    </>
  );
}

export function StaggerLines({ lines }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setOn(true)));
    return () => cancelAnimationFrame(id);
  }, []);
  return lines.map((line, i) => (
    <span key={i}>
      <span
        className="line"
        style={{
          display: "inline-block",
          opacity: on ? 1 : 0,
          transform: on ? "translateY(0)" : "translateY(24px)",
          transition: `opacity 0.6s ease ${0.15 + i * 0.13}s, transform 0.6s ease ${0.15 + i * 0.13}s`,
        }}
      >
        {line}
      </span>
      {i < lines.length - 1 && <br />}
    </span>
  ));
}

export function useProgressBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      setPct((h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 || 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return pct;
}
