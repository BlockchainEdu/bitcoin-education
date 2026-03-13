import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import HeaderWithLogoDark from "../components/headerWithLogoDark";
import Footer from "../components/footer";
import { useAuth } from "../lib/auth";

export default function Dashboard() {
  const { user, member, isPaid, loading, signOut } = useAuth();
  const router = useRouter();
  const isWelcome = router.query.welcome === "true";

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [loading, user, router]);

  if (loading || !user) return null;

  return (
    <div>
      <HeaderWithLogoDark />
      <Head>
        <title>Dashboard — BEN</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main className="min-h-screen" style={{ backgroundColor: "#FFFBF2" }}>
        <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
          {/* Welcome banner for new members */}
          {isWelcome && isPaid && (
            <div
              className="rounded-2xl p-6 mb-8 text-center"
              style={{
                background: "linear-gradient(135deg, rgba(255,135,42,0.08) 0%, rgba(255,135,42,0.02) 100%)",
                border: "1px solid rgba(255,135,42,0.15)",
              }}
            >
              <div className="text-3xl mb-2">Welcome to BEN</div>
              <p className="font-inter text-sm" style={{ color: "rgba(0,0,0,0.5)" }}>
                Your membership is active. You now have full access to everything.
              </p>
            </div>
          )}

          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="font-mont font-bold text-2xl md:text-3xl text-benblack-500">
                {member?.name ? `Hey, ${member.name.split(" ")[0]}` : "Your Dashboard"}
              </h1>
              <p className="font-inter text-sm mt-1" style={{ color: "rgba(0,0,0,0.4)" }}>
                {isPaid ? "Lifetime Member" : "Free Account"}
              </p>
            </div>
            <button
              onClick={async () => { await signOut(); router.push("/"); }}
              className="font-inter text-sm px-4 py-2 rounded-lg transition"
              style={{ color: "rgba(0,0,0,0.4)", border: "1px solid rgba(0,0,0,0.1)" }}
            >
              Sign out
            </button>
          </div>

          {/* Upgrade banner for free users */}
          {!isPaid && (
            <div
              className="rounded-2xl p-8 mb-8"
              style={{
                background: "linear-gradient(135deg, #1a1b20 0%, #202127 100%)",
              }}
            >
              <h2 className="font-mont font-bold text-xl text-white mb-2">
                Unlock everything
              </h2>
              <p className="font-inter text-sm mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
                Get lifetime access to courses, community, job applications, partner deals, conference discounts, and more.
              </p>
              <button
                onClick={async () => {
                  const res = await fetch("/api/checkout/membership", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                  });
                  const data = await res.json();
                  if (data.url) window.location.href = data.url;
                }}
                className="inline-flex items-center px-6 py-3 bg-benorange-500 text-white font-inter font-semibold text-sm rounded-full transition"
                style={{ boxShadow: "0 8px 20px rgba(255,135,42,0.3)" }}
              >
                Join BEN — $199 lifetime
              </button>
            </div>
          )}

          {/* Quick links grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Academy", desc: "Courses & lessons", href: "/academy", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", locked: !isPaid },
              { title: "Jobs", desc: "Browse & apply", href: "/jobs", icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", locked: false },
              { title: "Conferences", desc: "Find events worldwide", href: "/conferences", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", locked: false },
              { title: "Ventures", desc: "Apply for funding", href: "/ventures", icon: "M13 10V3L4 14h7v7l9-11h-7z", locked: !isPaid },
              { title: "Partners", desc: "Exclusive deals", href: "/partners", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", locked: !isPaid },
              { title: "Community", desc: "Telegram groups", href: "#", icon: "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z", locked: !isPaid },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl p-5 cursor-pointer transition"
                style={{
                  backgroundColor: "white",
                  border: "1px solid rgba(0,0,0,0.06)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                  opacity: item.locked ? 0.5 : 1,
                }}
                onClick={() => router.push(item.href)}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "rgba(255,135,42,0.08)" }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF872A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d={item.icon} />
                    </svg>
                  </div>
                  <div>
                    <div className="font-mont font-bold text-sm text-benblack-500">
                      {item.title}
                      {item.locked && <span className="ml-1.5 text-xs" style={{ color: "rgba(0,0,0,0.3)" }}>🔒</span>}
                    </div>
                    <div className="font-inter text-xs" style={{ color: "rgba(0,0,0,0.4)" }}>{item.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
