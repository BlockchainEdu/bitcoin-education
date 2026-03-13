import { useState } from "react";
import { useAuth } from "../lib/auth";

// Popup login/signup modal — no page redirect needed.
// Usage: <LoginModal isOpen={show} onClose={() => setShow(false)} />
export default function LoginModal({ isOpen, onClose, defaultTab = "login" }) {
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const [tab, setTab] = useState(defaultTab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
      <div
        className="relative w-full max-w-md mx-4 rounded-2xl bg-white p-8"
        style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.15)" }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18" /><path d="M6 6l12 12" />
          </svg>
        </button>

        {/* Logo */}
        <div className="text-center mb-6">
          <img src="/images/ben-logo-color-no-slogan.svg" alt="BEN" className="w-16 mx-auto mb-3" />
          <h2 className="font-mont font-bold text-xl text-benblack-500">
            {tab === "login" ? "Welcome back" : "Join BEN"}
          </h2>
          <p className="font-inter text-sm mt-1" style={{ color: "rgba(0,0,0,0.4)" }}>
            {tab === "login" ? "Sign in to your account" : "Create your free account"}
          </p>
        </div>

        {/* Google button */}
        <button
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-3 rounded-lg py-3 px-4 font-inter font-medium text-sm transition"
          style={{ border: "1px solid rgba(0,0,0,0.1)", color: "#333" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-1" style={{ height: "1px", backgroundColor: "rgba(0,0,0,0.08)" }} />
          <span className="px-3 font-inter text-xs" style={{ color: "rgba(0,0,0,0.3)" }}>or</span>
          <div className="flex-1" style={{ height: "1px", backgroundColor: "rgba(0,0,0,0.08)" }} />
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
                className="w-full rounded-lg py-3 px-4 font-inter text-sm"
                style={{ border: "1px solid rgba(0,0,0,0.1)", outline: "none" }}
              />
            </div>
          )}
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg py-3 px-4 font-inter text-sm"
              style={{ border: "1px solid rgba(0,0,0,0.1)", outline: "none" }}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full rounded-lg py-3 px-4 font-inter text-sm"
              style={{ border: "1px solid rgba(0,0,0,0.1)", outline: "none" }}
            />
          </div>

          {error && (
            <div className="mb-3 text-sm font-inter text-red-500 text-center">{error}</div>
          )}
          {success && (
            <div className="mb-3 text-sm font-inter text-green-600 text-center">{success}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg py-3 px-4 bg-benorange-500 text-white font-inter font-semibold text-sm transition"
            style={{ opacity: loading ? 0.6 : 1 }}
          >
            {loading ? "..." : tab === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        {/* Toggle */}
        <p className="mt-5 text-center font-inter text-sm" style={{ color: "rgba(0,0,0,0.4)" }}>
          {tab === "login" ? (
            <>
              No account?{" "}
              <span className="text-benorange-500 font-semibold cursor-pointer" onClick={() => { setTab("signup"); setError(""); setSuccess(""); }}>
                Sign up free
              </span>
            </>
          ) : (
            <>
              Already a member?{" "}
              <span className="text-benorange-500 font-semibold cursor-pointer" onClick={() => { setTab("login"); setError(""); setSuccess(""); }}>
                Sign in
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
