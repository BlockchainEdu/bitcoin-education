import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../lib/auth";
import LoginModal from "./LoginModal";

// Hard gate — requires paid membership to see content.
// Shows blurred preview + upgrade CTA for non-members.
export default function MemberGate({ children, fallback }) {
  const { user, isPaid, loading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  if (loading) return null;

  // Paid member — show full content
  if (user && isPaid) return <>{children}</>;

  // Logged in but not paid — show upgrade CTA
  if (user && !isPaid) {
    return (
      <>
        {fallback || <DefaultMemberWall upgrade />}
      </>
    );
  }

  // Not logged in — show login prompt
  return (
    <>
      {fallback || <DefaultMemberWall onLogin={() => setShowLogin(true)} />}
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}

function DefaultMemberWall({ upgrade, onLogin }) {
  const router = useRouter();

  return (
    <div className="relative rounded-2xl overflow-hidden" style={{ minHeight: "200px" }}>
      {/* Blurred placeholder */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(135deg, #f8f8f8 0%, #eee 100%)",
        filter: "blur(4px)",
      }} />

      {/* CTA overlay */}
      <div className="relative flex flex-col items-center justify-center py-12 px-6 text-center">
        <div className="w-12 h-12 rounded-full bg-benorange-500 flex items-center justify-center mb-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <h3 className="font-mont font-bold text-lg text-benblack-500 mb-2">
          {upgrade ? "Upgrade to access" : "Members only"}
        </h3>
        <p className="font-inter text-sm mb-5" style={{ color: "rgba(0,0,0,0.45)", maxWidth: "320px" }}>
          {upgrade
            ? "Get access to courses, community, job applications, partner deals, and more. Starting at $19/month."
            : "Sign up and join BEN to unlock this content."
          }
        </p>
        {upgrade ? (
          <button
            onClick={() => router.push("/pricing")}
            className="inline-flex items-center px-6 py-3 bg-benorange-500 text-white font-inter font-semibold text-sm rounded-full transition"
            style={{ boxShadow: "0 8px 20px rgba(255,135,42,0.2)" }}
          >
            See Plans
          </button>
        ) : (
          <button
            onClick={onLogin}
            className="inline-flex items-center px-6 py-3 bg-benorange-500 text-white font-inter font-semibold text-sm rounded-full transition"
            style={{ boxShadow: "0 8px 20px rgba(255,135,42,0.2)" }}
          >
            Sign up free
          </button>
        )}
      </div>
    </div>
  );
}
