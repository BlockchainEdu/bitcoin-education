import { useRef, useState, useEffect } from "react";

// Animated counter that counts up when scrolled into view
// delay (ms) lets hero counters wait for CSS fade-in to finish first
// format: optional function to custom-format the number (e.g. compact "$1M")
export default function AnimatedCounter({ value, prefix, suffix, delay, format }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  const [go, setGo] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (delay) {
            setTimeout(() => setGo(true), delay);
          } else {
            setGo(true);
          }
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  useEffect(() => {
    if (!go) return;
    const t0 = performance.now();
    let raf;
    function tick(now) {
      const p = Math.min((now - t0) / 2000, 1);
      const ease = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setN(Math.round(ease * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [go, value]);

  // Split suffix so only "+" is orange, rest (like "B", "k", "M") stays parent color
  let textPart = "";
  let plusPart = "";
  if (suffix) {
    const plusIdx = suffix.indexOf("+");
    if (plusIdx >= 0) {
      textPart = suffix.slice(0, plusIdx);
      plusPart = "+";
    } else {
      textPart = suffix;
    }
  }

  const display = format ? format(n) : n.toLocaleString();

  return (
    <span ref={ref}>
      {prefix || ""}{display}{textPart}
      {plusPart && <span style={{ color: "#FF872A" }}>{plusPart}</span>}
    </span>
  );
}
