import { useState, useEffect } from "react";
import { useAuth } from "../lib/auth";

export default function LoginModal({ isOpen, onClose, defaultTab = "login" }) {
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const [tab, setTab] = useState(defaultTab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (tab === "login") {
      const { error: err } = await signIn(email, password);
      if (err) {
        setError(err.message);
        setLoading(false);
      } else {
        onClose();
      }
    } else {
      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        setLoading(false);
        return;
      }
      const { error: err } = await signUp(email, password, name);
      if (err) {
        setError(err.message);
        setLoading(false);
      } else {
        setSuccess("Check your email to confirm your account.");
        setLoading(false);
      }
    }
  }

  async function handleGoogle() {
    setError("");
    await signInWithGoogle();
  }

  function switchTab(t) {
    setTab(t);
    setError("");
    setSuccess("");
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full rounded-3xl overflow-hidden"
        style={{
          maxWidth: 440,
          backgroundColor: "#fff",
          boxShadow: "0 32px 80px rgba(0,0,0,0.25)",
          animation: "modalSlideUp 0.3s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Orange accent bar */}
        <div style={{ height: 4, background: "linear-gradient(90deg, #FF872A, #ffb347)" }} />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 transition"
          style={{ color: "rgba(0,0,0,0.25)" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(0,0,0,0.6)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(0,0,0,0.25)"; }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18" /><path d="M6 6l12 12" />
          </svg>
        </button>

        <div className="px-10 pt-10 pb-8">
          {/* Header */}
          <div className="text-center mb-8">
            <img src="/images/ben-logo-color-no-slogan.svg" alt="BEN" className="w-14 mx-auto mb-5" />
            <h2 className="font-mont font-black text-2xl tracking-tight" style={{ color: "#1d1d1f" }}>
              {tab === "login" ? "Welcome back" : "Join BEN"}
            </h2>
            <p className="font-inter text-base mt-2" style={{ color: "rgba(0,0,0,0.4)" }}>
              {tab === "login"
                ? "Sign in to access your courses and community"
                : "Create your free account to get started"}
            </p>
          </div>

          {/* Google button */}
          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 rounded-xl py-3.5 px-4 font-inter font-semibold text-base transition"
            style={{
              border: "1px solid rgba(0,0,0,0.1)",
              color: "#1d1d1f",
              backgroundColor: "#fff",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f8f8f8"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#fff"; }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1" style={{ height: "1px", backgroundColor: "rgba(0,0,0,0.06)" }} />
            <span className="px-4 font-inter text-sm" style={{ color: "rgba(0,0,0,0.25)" }}>or</span>
            <div className="flex-1" style={{ height: "1px", backgroundColor: "rgba(0,0,0,0.06)" }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {tab === "signup" && (
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl py-3.5 px-4 font-inter text-base outline-none transition"
                  style={{
                    border: "1.5px solid rgba(0,0,0,0.08)",
                    backgroundColor: "#fafafa",
                    color: "#1d1d1f",
                  }}
                  onFocus={(e) => { e.target.style.borderColor = "#FF872A"; e.target.style.backgroundColor = "#fff"; }}
                  onBlur={(e) => { e.target.style.borderColor = "rgba(0,0,0,0.08)"; e.target.style.backgroundColor = "#fafafa"; }}
                />
              </div>
            )}
            <div className="mb-3">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl py-3.5 px-4 font-inter text-base outline-none transition"
                style={{
                  border: "1.5px solid rgba(0,0,0,0.08)",
                  backgroundColor: "#fafafa",
                  color: "#1d1d1f",
                }}
                onFocus={(e) => { e.target.style.borderColor = "#FF872A"; e.target.style.backgroundColor = "#fff"; }}
                onBlur={(e) => { e.target.style.borderColor = "rgba(0,0,0,0.08)"; e.target.style.backgroundColor = "#fafafa"; }}
              />
            </div>
            <div className="mb-5">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full rounded-xl py-3.5 px-4 font-inter text-base outline-none transition"
                style={{
                  border: "1.5px solid rgba(0,0,0,0.08)",
                  backgroundColor: "#fafafa",
                  color: "#1d1d1f",
                }}
                onFocus={(e) => { e.target.style.borderColor = "#FF872A"; e.target.style.backgroundColor = "#fff"; }}
                onBlur={(e) => { e.target.style.borderColor = "rgba(0,0,0,0.08)"; e.target.style.backgroundColor = "#fafafa"; }}
              />
            </div>

            {error && (
              <div
                className="mb-4 text-center font-inter text-sm py-2.5 px-4 rounded-xl"
                style={{ backgroundColor: "rgba(239,68,68,0.06)", color: "#dc2626" }}
              >
                {error}
              </div>
            )}
            {success && (
              <div
                className="mb-4 text-center font-inter text-sm py-2.5 px-4 rounded-xl"
                style={{ backgroundColor: "rgba(34,197,94,0.06)", color: "#16a34a" }}
              >
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl py-3.5 px-4 font-inter font-bold text-base text-white transition"
              style={{
                backgroundColor: "#FF872A",
                opacity: loading ? 0.6 : 1,
                boxShadow: "0 8px 24px rgba(255,135,42,0.25)",
              }}
            >
              {loading ? "..." : tab === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          {/* Toggle */}
          <p className="mt-6 text-center font-inter text-base" style={{ color: "rgba(0,0,0,0.4)" }}>
            {tab === "login" ? (
              <>
                New here?{" "}
                <span
                  className="font-semibold cursor-pointer transition"
                  style={{ color: "#FF872A" }}
                  onClick={() => switchTab("signup")}
                >
                  Create an account
                </span>
              </>
            ) : (
              <>
                Already a member?{" "}
                <span
                  className="font-semibold cursor-pointer transition"
                  style={{ color: "#FF872A" }}
                  onClick={() => switchTab("login")}
                >
                  Sign in
                </span>
              </>
            )}
          </p>
        </div>

        <style jsx>{`
          @keyframes modalSlideUp {
            from { opacity: 0; transform: translateY(20px) scale(0.97); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>
      </div>
    </div>
  );
}
