import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function LoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen) { setEmail(""); setSent(false); setError(null); }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error: err } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.href },
    });
    setLoading(false);
    if (err) setError(err.message);
    else setSent(true);
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 9999, backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-sm mx-4 rounded-2xl p-8"
        style={{ backgroundColor: "#fff", boxShadow: "0 25px 80px rgba(0,0,0,0.15)" }}
      >
        <button
          onClick={onClose}
          className="absolute flex items-center justify-center rounded-full"
          style={{ top: 16, right: 16, width: 32, height: 32, backgroundColor: "rgba(0,0,0,0.05)" }}
          aria-label="Close"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {sent ? (
          <div className="text-center">
            <div className="text-4xl mb-4">📬</div>
            <h2 className="font-mont font-bold text-xl mb-2" style={{ color: "#1d1d1f" }}>Check your email</h2>
            <p className="font-inter text-sm" style={{ color: "#86868b" }}>
              We sent a magic link to <strong>{email}</strong>. Click it to sign in.
            </p>
          </div>
        ) : (
          <>
            <h2 className="font-mont font-bold text-2xl mb-1" style={{ color: "#1d1d1f", letterSpacing: "-0.03em" }}>Sign in</h2>
            <p className="font-inter text-sm mb-6" style={{ color: "#86868b" }}>
              Enter your email to receive a magic link.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="font-inter w-full rounded-xl px-4 py-3 text-sm outline-none"
                style={{ border: "1.5px solid rgba(0,0,0,0.12)", fontSize: 14, color: "#1d1d1f" }}
              />
              {error && (
                <p className="font-inter text-xs" style={{ color: "#ff3b30" }}>{error}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="font-inter font-semibold rounded-full py-3 text-white text-sm transition-opacity"
                style={{ backgroundColor: "#FF872A", opacity: loading ? 0.6 : 1 }}
              >
                {loading ? "Sending…" : "Send magic link"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
