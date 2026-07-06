// ---------- scroll progress bar ----------
const progress = document.getElementById("progress");
window.addEventListener("scroll", () => {
  const h = document.documentElement;
  const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  if (progress) progress.style.width = pct + "%";
}, { passive: true });

// ---------- reveal on scroll ----------
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("in");
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal, .reveal-left").forEach((el) => io.observe(el));

// ---------- animated counters ----------
const counterIO = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    counterIO.unobserve(e.target);
    const el = e.target;
    const target = parseFloat(el.dataset.count);
    const decimals = (el.dataset.count.split(".")[1] || "").length;
    const suffix = el.dataset.suffix || "";
    const dur = 1400;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals).toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString(undefined, { minimumFractionDigits: decimals }) + suffix;
    };
    requestAnimationFrame(tick);
  });
}, { threshold: 0.4 });
document.querySelectorAll("[data-count]").forEach((el) => counterIO.observe(el));

// ---------- typing effect ----------
const typeEl = document.querySelector("[data-type]");
if (typeEl) {
  const words = JSON.parse(typeEl.dataset.type);
  let wi = 0, ci = 0, deleting = false;
  const loop = () => {
    const word = words[wi];
    typeEl.textContent = word.slice(0, ci);
    if (!deleting && ci < word.length) { ci++; setTimeout(loop, 70); }
    else if (!deleting) { deleting = true; setTimeout(loop, 1600); }
    else if (ci > 0) { ci--; setTimeout(loop, 35); }
    else { deleting = false; wi = (wi + 1) % words.length; setTimeout(loop, 300); }
  };
  loop();
}

// ---------- hero headline stagger ----------
document.querySelectorAll(".stagger").forEach((h) => {
  const lines = h.querySelectorAll(".line");
  lines.forEach((l, i) => {
    l.style.opacity = "0";
    l.style.transform = "translateY(24px)";
    l.style.transition = `opacity 0.6s ease ${0.15 + i * 0.13}s, transform 0.6s ease ${0.15 + i * 0.13}s`;
    l.style.display = "inline-block";
    requestAnimationFrame(() => requestAnimationFrame(() => {
      l.style.opacity = "1";
      l.style.transform = "translateY(0)";
    }));
  });
});

// ---------- sticky notes: slight random rotation ----------
document.querySelectorAll(".sticky").forEach((n, i) => {
  if (!n.style.transform) n.style.transform = `rotate(${i % 2 ? 2.5 : -2.5}deg)`;
});

// ---------- stat stickers alternate rotation ----------
document.querySelectorAll(".stat-sticker").forEach((s, i) => {
  s.style.transform = `rotate(${[-1.4, 1.6, -2, 1.2][i % 4]}deg)`;
});

// ---------- checkbox easter egg on sticky todo ----------
document.querySelectorAll("[data-checkable]").forEach((li) => {
  li.style.cursor = "pointer";
  li.addEventListener("click", () => {
    li.textContent = li.textContent.replace("☐", "☑");
    li.style.textDecoration = "line-through";
  });
});
