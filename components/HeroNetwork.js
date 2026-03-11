import { useRef, useEffect } from "react";

// Lightweight particle network canvas for dark hero sections.
// Big bang burst from center, ambient drift after. No mouse interaction.
export default function HeroNetwork() {
  const cvs = useRef(null);

  useEffect(() => {
    const c = cvs.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    const mob = window.innerWidth < 768;
    const N = mob ? 30 : 70;
    const LINK = mob ? 80 : 130;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W, H, raf;

    function resize() {
      const r = c.parentElement.getBoundingClientRect();
      W = r.width; H = r.height;
      c.width = W * dpr; c.height = H * dpr;
      c.style.width = W + "px"; c.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    const cx = W / 2, cy = H * 0.45;
    const pts = Array.from({ length: N }, () => {
      const isHub = Math.random() < 0.1;
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 3;
      return {
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        tx: Math.random() * W, ty: Math.random() * H,
        vx: Math.cos(angle) * (1.5 + Math.random() * 3),
        vy: Math.sin(angle) * (1.5 + Math.random() * 3),
        r: isHub ? 1.8 + Math.random() * 1.2 : 0.6 + Math.random() * 1,
        o: Math.random() < 0.25,
        hub: isHub,
        drift: 0.12 + Math.random() * 0.25,
        phase: Math.random() * Math.PI * 2,
      };
    });

    const t0 = performance.now();
    let shockwave = { r: 0, a: 0.5 };

    function draw() {
      const now = performance.now();
      const age = (now - t0) / 1000;
      const expanding = age < 2.5;

      ctx.clearRect(0, 0, W, H);

      // Center flash
      if (age < 1.2) {
        const flashAlpha = (1 - age / 1.2) * 0.4;
        const flashR = 20 + age * 150;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, flashR);
        grad.addColorStop(0, `rgba(255,135,42,${flashAlpha})`);
        grad.addColorStop(0.3, `rgba(255,135,42,${flashAlpha * 0.3})`);
        grad.addColorStop(1, "rgba(255,135,42,0)");
        ctx.beginPath(); ctx.arc(cx, cy, flashR, 0, Math.PI * 2);
        ctx.fillStyle = grad; ctx.fill();
      }

      // Shockwave ring
      if (shockwave.a > 0) {
        shockwave.r += 4;
        shockwave.a -= 0.006;
        ctx.beginPath(); ctx.arc(cx, cy, shockwave.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,135,42,${shockwave.a})`;
        ctx.lineWidth = 1.5; ctx.stroke();
      }

      for (const p of pts) {
        if (expanding) {
          const spring = age < 0.5 ? 0.004 : 0.018 + Math.min(age * 0.01, 0.025);
          p.vx += (p.tx - p.x) * spring;
          p.vy += (p.ty - p.y) * spring;
          p.vx *= age < 0.5 ? 0.96 : 0.92; p.vy *= age < 0.5 ? 0.96 : 0.92;
        } else {
          p.phase += 0.006;
          p.vx += Math.sin(p.phase + p.y * 0.003) * p.drift * 0.015;
          p.vy += Math.cos(p.phase + p.x * 0.003) * p.drift * 0.015;
          p.vx *= 0.988; p.vy *= 0.988;
        }
        p.x += p.vx; p.y += p.vy;
        if (p.x < -20) p.x += W + 40; if (p.x > W + 20) p.x -= W + 40;
        if (p.y < -20) p.y += H + 40; if (p.y > H + 20) p.y -= H + 40;
      }

      // Draw connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dsq = dx * dx + dy * dy;
          const maxD = (a.hub && b.hub) ? LINK * 1.6 : LINK;
          if (dsq < maxD * maxD) {
            const d = Math.sqrt(dsq);
            const t = 1 - d / maxD;
            const isOrange = a.o || b.o;
            const isHubLink = a.hub && b.hub;

            if (isHubLink) {
              const pulse = Math.sin(now * 0.002 + i * 0.5) * 0.3 + 0.7;
              ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = isOrange
                ? `rgba(255,135,42,${t * 0.2 * pulse})`
                : `rgba(255,255,255,${t * 0.14 * pulse})`;
              ctx.lineWidth = 0.8 + t * 0.6;
              ctx.stroke();
            } else {
              ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = isOrange
                ? `rgba(255,135,42,${t * 0.1})`
                : `rgba(255,255,255,${t * 0.07})`;
              ctx.lineWidth = 0.4;
              ctx.stroke();
            }
          }
        }
      }

      // Draw particles
      for (const p of pts) {
        const baseAlpha = p.hub ? 0.5 : 0.25;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.o
          ? `rgba(255,135,42,${baseAlpha})`
          : `rgba(255,255,255,${baseAlpha})`;
        ctx.fill();

        if (p.hub) {
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 0.35, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,255,255,0.3)";
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    }
    draw();

    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={cvs} className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }} aria-hidden="true" />;
}
