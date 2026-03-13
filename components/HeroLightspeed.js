import { useRef, useEffect } from "react";

// Star Wars hyperspace / lightspeed streaks for dark hero sections.
// Stars stretch from center on load, then settle into gentle drift.
export default function HeroLightspeed() {
  const cvs = useRef(null);

  useEffect(() => {
    const c = cvs.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    const mob = window.innerWidth < 768;
    const N = mob ? 60 : 140;
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

    const stars = Array.from({ length: N }, () => {
      const angle = Math.random() * Math.PI * 2;
      const dist = 30 + Math.random() * Math.max(W, H) * 0.6;
      return {
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        angle: angle,
        speed: 2 + Math.random() * 6,
        size: 0.4 + Math.random() * 1.2,
        isOrange: Math.random() < 0.2,
        streakLen: 0,
        opacity: 0.1 + Math.random() * 0.5,
        drift: { x: (Math.random() - 0.5) * 0.15, y: (Math.random() - 0.5) * 0.1 },
        twinklePhase: Math.random() * Math.PI * 2,
        dist: dist,
      };
    });

    const t0 = performance.now();
    // Lightspeed phases:
    // 0-0.3s:   ramp up (stars start stretching)
    // 0.3-1.4s: full lightspeed (long streaks from center)
    // 1.4-2.5s: deceleration (streaks shorten)
    // 2.5s+:    gentle drift (dots with subtle twinkle)

    function draw() {
      const now = performance.now();
      const age = (now - t0) / 1000;
      ctx.clearRect(0, 0, W, H);

      // Subtle center glow during lightspeed phase
      if (age < 2.5) {
        const glowAlpha = age < 1.4
          ? Math.min(age / 0.3, 1) * 0.15
          : 0.15 * Math.max(0, 1 - (age - 1.4) / 1.1);
        const glowR = 60 + age * 40;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
        grad.addColorStop(0, `rgba(255,135,42,${glowAlpha})`);
        grad.addColorStop(0.5, `rgba(255,135,42,${glowAlpha * 0.3})`);
        grad.addColorStop(1, "rgba(255,135,42,0)");
        ctx.beginPath();
        ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      for (const s of stars) {
        // Calculate streak intensity based on phase
        let streakMult = 0;
        if (age < 0.3) {
          streakMult = age / 0.3; // ramp up
        } else if (age < 1.4) {
          streakMult = 1; // full speed
        } else if (age < 2.5) {
          streakMult = Math.max(0, 1 - (age - 1.4) / 1.1); // decelerate
        }

        if (age < 2.5) {
          // Lightspeed: move outward from center
          const moveDist = s.speed * streakMult * 1.8;
          s.x += Math.cos(s.angle) * moveDist;
          s.y += Math.sin(s.angle) * moveDist;
          s.streakLen = s.speed * streakMult * (mob ? 12 : 20);

          // Wrap stars that go off-screen back near center
          const dx = s.x - cx, dy = s.y - cy;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d > Math.max(W, H) * 0.8) {
            const newDist = 20 + Math.random() * 60;
            s.x = cx + Math.cos(s.angle) * newDist;
            s.y = cy + Math.sin(s.angle) * newDist;
          }
        } else {
          // Gentle drift phase
          s.twinklePhase += 0.02;
          s.x += s.drift.x;
          s.y += s.drift.y;
          s.streakLen *= 0.92; // fade out any remaining streak

          // Wrap edges
          if (s.x < -10) s.x += W + 20;
          if (s.x > W + 10) s.x -= W + 20;
          if (s.y < -10) s.y += H + 20;
          if (s.y > H + 10) s.y -= H + 20;
        }

        // Draw the star
        const twinkle = age > 2.5
          ? 0.5 + Math.sin(s.twinklePhase) * 0.3
          : 1;
        const alpha = s.opacity * twinkle;
        const color = s.isOrange
          ? `rgba(255,135,42,${alpha})`
          : `rgba(255,255,255,${alpha})`;

        if (s.streakLen > 1) {
          // Draw streak line from tail to head
          const tailX = s.x - Math.cos(s.angle) * s.streakLen;
          const tailY = s.y - Math.sin(s.angle) * s.streakLen;

          const gradient = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
          const fadeColor = s.isOrange
            ? "rgba(255,135,42,0)"
            : "rgba(255,255,255,0)";
          gradient.addColorStop(0, fadeColor);
          gradient.addColorStop(1, color);

          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(s.x, s.y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = s.size * 0.8;
          ctx.stroke();

          // Bright head dot
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
        } else {
          // Just a dot
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * (0.5 + twinkle * 0.3), 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    }
    draw();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={cvs}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  );
}
