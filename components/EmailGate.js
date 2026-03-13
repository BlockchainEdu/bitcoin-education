import { useState } from "react";
import { useAuth } from "../lib/auth";
import LoginModal from "./LoginModal";

// Soft gate — requires free account (email capture) to see content.
// Shows blurred preview + "sign up free" for anonymous visitors.
export default function EmailGate({ children, fallback }) {
  const { user, loading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  if (loading) return null;

  // Any logged-in user (free or paid) can see this
  if (user) return <>{children}</>;

  // Not logged in — show signup prompt
  return (
    <>
      {fallback || <DefaultEmailWall onLogin={() => setShowLogin(true)} />}
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} defaultTab="signup" />
    </>
  );
}

function DefaultEmailWall({ onLogin }) {
  return (
    <div className="relative rounded-xl overflow-hidden" style={{ minHeight: "120px" }}>
      {/* Blurred placeholder */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(135deg, #fafafa 0%, #f0f0f0 100%)",
        filter: "blur(3px)",
      }} />

      {/* CTA */}
      <div className="relative flex flex-col items-center justify-center py-8 px-6 text-center">
        <p className="font-inter text-sm mb-4" style={{ color: "rgba(0,0,0,0.5)" }}>
          Create a free account to see full details
        </p>
        <button
          onClick={onLogin}
          className="inline-flex items-center px-5 py-2.5 rounded-full font-inter font-semibold text-sm transition"
          style={{
            backgroundColor: "rgba(255,135,42,0.08)",
            color: "#FF872A",
            border: "1px solid rgba(255,135,42,0.2)",
          }}
        >
          Sign up free
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
