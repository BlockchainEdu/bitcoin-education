import { useState, useEffect, useMemo } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import HeaderWithLogoDark from "../../../components/headerWithLogoDark";
import Footer from "../../../components/footer";
import LessonChat from "../../../components/LessonChat";
import { useAuth } from "../../../lib/auth";
import { supabase } from "../../../lib/supabase";
import LoginModal from "../../../components/LoginModal";
import { ACADEMY_COURSE } from "../../../content/academy";
import { SOLIDITY_COURSE } from "../../../content/solidity";
import { LESSON_VIDEOS } from "../../../content/lesson-videos";

function getAllLessons(course, prefix = "") {
  const lessons = [];
  for (const mod of course.modules) {
    for (const lesson of mod.lessons) {
      lessons.push({
        id: prefix + lesson.id,
        title: lesson.title,
        moduleId: mod.id,
        moduleTitle: mod.title,
        moduleIcon: mod.icon,
      });
    }
  }
  return lessons;
}

const FS_LESSONS = getAllLessons(ACADEMY_COURSE);
const SOL_LESSONS = getAllLessons(SOLIDITY_COURSE, "s");
const ALL_LESSONS = [...FS_LESSONS, ...SOL_LESSONS];

export async function getStaticPaths() {
  const paths = ALL_LESSONS.map((l) => ({ params: { id: l.id } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const lesson = ALL_LESSONS.find((l) => l.id === params.id);
  if (!lesson) return { notFound: true };

  const idx = ALL_LESSONS.findIndex((l) => l.id === params.id);
  const track = lesson.id.startsWith("s") ? "solidity" : "fullstack";

  // Get lessons in same track for navigation
  const trackLessons = track === "solidity" ? SOL_LESSONS : FS_LESSONS;
  const trackIdx = trackLessons.findIndex((l) => l.id === params.id);

  const prev = trackIdx > 0 ? trackLessons[trackIdx - 1] : null;
  const next = trackIdx < trackLessons.length - 1 ? trackLessons[trackIdx + 1] : null;

  // Get module siblings for sidebar
  const moduleLessons = trackLessons.filter((l) => l.moduleId === lesson.moduleId);

  const videoId = LESSON_VIDEOS[params.id] || null;

  return {
    props: {
      lesson,
      prev: prev ? { id: prev.id, title: prev.title } : null,
      next: next ? { id: next.id, title: next.title } : null,
      moduleLessons: moduleLessons.map((l) => ({ id: l.id, title: l.title })),
      videoId,
      track,
      trackIdx: trackIdx + 1,
      trackTotal: trackLessons.length,
    },
  };
}

export default function LessonPage({
  lesson,
  prev,
  next,
  moduleLessons,
  videoId,
  track,
  trackIdx,
  trackTotal,
}) {
  const router = useRouter();
  const { user, isPaid, loading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [progressMap, setProgressMap] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch progress
  useEffect(() => {
    if (!user) return;
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) return;
      fetch("/api/lesson-progress", {
        headers: { Authorization: `Bearer ${session.access_token}` },
      })
        .then((r) => r.json())
        .then((data) => {
          const map = {};
          (data.progress || []).forEach((p) => { map[p.lesson_id] = true; });
          setProgressMap(map);
          setCompleted(!!map[lesson.id]);
        });
    });
  }, [user, lesson.id]);

  async function toggleComplete() {
    const newState = !completed;
    setCompleted(newState);
    setProgressMap((m) => {
      const copy = { ...m };
      if (newState) copy[lesson.id] = true;
      else delete copy[lesson.id];
      return copy;
    });

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    fetch("/api/lesson-progress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ lesson_id: lesson.id, completed: newState }),
    });
  }

  const moduleProgress = useMemo(() => {
    const done = moduleLessons.filter((l) => progressMap[l.id]).length;
    return { done, total: moduleLessons.length, pct: Math.round((done / moduleLessons.length) * 100) };
  }, [progressMap, moduleLessons]);

  const youtubeSearch = encodeURIComponent(
    lesson.title + (track === "solidity" ? " solidity ethereum" : " programming tutorial")
  );

  // Gate: first 3 lessons per module are free, rest require membership
  const lessonIndexInModule = moduleLessons.findIndex((l) => l.id === lesson.id);
  const isFreePreview = lessonIndexInModule < 3;
  const isLocked = !isFreePreview && !isPaid && !loading;

  if (isLocked && !loading) {
    return (
      <div>
        <HeaderWithLogoDark />
        <Head>
          <title>{lesson.title} | BEN Academy</title>
        </Head>
        <main className="min-h-screen" style={{ backgroundColor: "#f5f7f7" }}>
          <div className="max-w-2xl mx-auto px-6 py-20 text-center">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
              style={{ backgroundColor: "rgba(255,135,42,0.08)" }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF872A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            </div>
            <h1 className="font-mont font-black text-2xl" style={{ color: "#1d1d1f" }}>
              {lesson.title}
            </h1>
            <p className="mt-3 font-inter text-sm" style={{ color: "rgba(0,0,0,0.4)" }}>
              This lesson requires a BEN membership. The first 3 lessons in every module are free.
            </p>
            <button
              onClick={() => user ? router.push("/pricing") : setShowLogin(true)}
              className="mt-8 px-8 py-3.5 rounded-full bg-benorange-500 text-white font-inter font-semibold text-sm transition"
              style={{ boxShadow: "0 8px 30px rgba(255,135,42,0.25)" }}
            >
              {user ? "Join BEN — $29/mo" : "Sign Up to Access"}
            </button>
          </div>
        </main>
        <Footer />
        <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      </div>
    );
  }

  return (
    <div>
      <HeaderWithLogoDark />
      <Head>
        <title>{lesson.title} | BEN Academy</title>
        <meta name="description" content={`Learn ${lesson.title} in the ${lesson.moduleTitle} module. BEN Academy ${track === "solidity" ? "Solidity Engineering" : "Full-Stack Development"} track.`} />
      </Head>

      <main style={{ backgroundColor: "#f5f7f7", minHeight: "100vh" }}>
        {/* Top bar */}
        <div style={{ backgroundColor: "#202127", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push(`/academy?track=${track}`)}
                className="font-inter text-xs"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                ← Back to Academy
              </button>
              <span className="hidden sm:inline font-inter text-xs" style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
              <span className="hidden sm:inline font-inter text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                {lesson.moduleTitle}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-inter text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                {trackIdx} / {trackTotal}
              </span>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="sm:hidden"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-8 flex gap-8">
          {/* Sidebar - module lessons */}
          <aside
            className={`${sidebarOpen ? "block" : "hidden"} sm:block flex-shrink-0`}
            style={{ width: 280 }}
          >
            <div
              className="rounded-xl overflow-hidden sticky"
              style={{ top: 80, backgroundColor: "#fff", border: "1px solid rgba(0,0,0,0.06)" }}
            >
              <div className="px-4 py-3" style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
                <p className="font-mont font-bold text-sm" style={{ color: "#1d1d1f" }}>
                  {lesson.moduleTitle}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: "rgba(0,0,0,0.04)" }}>
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${moduleProgress.pct}%`, backgroundColor: "#FF872A" }}
                    />
                  </div>
                  <span className="font-inter text-xs" style={{ color: "rgba(0,0,0,0.3)" }}>
                    {moduleProgress.done}/{moduleProgress.total}
                  </span>
                </div>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {moduleLessons.map((l, i) => (
                  <div
                    key={l.id}
                    onClick={() => router.push(`/academy/lesson/${l.id}`)}
                    className="flex items-center gap-3 px-4 py-2.5 cursor-pointer transition"
                    style={{
                      backgroundColor: l.id === lesson.id ? "rgba(255,135,42,0.06)" : "transparent",
                      borderLeft: l.id === lesson.id ? "3px solid #FF872A" : "3px solid transparent",
                    }}
                  >
                    <div
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: progressMap[l.id] ? "#FF872A" : "rgba(0,0,0,0.04)",
                        border: progressMap[l.id] ? "none" : "1px solid rgba(0,0,0,0.08)",
                      }}
                    >
                      {progressMap[l.id] && (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      )}
                    </div>
                    <span
                      className="font-inter text-xs leading-snug"
                      style={{
                        color: l.id === lesson.id ? "#FF872A" : progressMap[l.id] ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.55)",
                        fontWeight: l.id === lesson.id ? 600 : 400,
                      }}
                    >
                      {l.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Video */}
            <div
              className="rounded-xl overflow-hidden"
              style={{ backgroundColor: "#000", border: "1px solid rgba(0,0,0,0.06)" }}
            >
              {videoId ? (
                <div style={{ position: "relative", paddingTop: "56.25%" }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                    title={lesson.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      border: "none",
                    }}
                  />
                </div>
              ) : (
                <div className="py-16 px-8 text-center">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <p className="font-inter text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                    No curated video yet for this lesson
                  </p>
                  <a
                    href={`https://www.youtube.com/results?search_query=${youtubeSearch}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-full font-inter font-semibold text-sm transition"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.1)",
                      color: "#fff",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.5 6.2c-.3-1-1-1.8-2-2.1C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.5.6c-1 .3-1.8 1.1-2 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8c.3 1 1 1.8 2 2.1 1.9.6 9.5.6 9.5.6s7.6 0 9.5-.6c1-.3 1.8-1.1 2-2.1.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.5 15.6V8.4l6.3 3.6-6.3 3.6z"/>
                    </svg>
                    Search YouTube
                  </a>
                </div>
              )}
            </div>

            {/* Lesson info + actions */}
            <div className="mt-6 rounded-xl p-6" style={{ backgroundColor: "#fff", border: "1px solid rgba(0,0,0,0.06)" }}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-inter text-xs font-medium uppercase" style={{ color: "#FF872A", letterSpacing: "0.08em" }}>
                    {lesson.moduleTitle}
                  </p>
                  <h1 className="mt-1 font-mont font-black text-xl sm:text-2xl" style={{ color: "#1d1d1f", letterSpacing: "-0.02em" }}>
                    {lesson.title}
                  </h1>
                </div>

                {user && (
                  <button
                    onClick={toggleComplete}
                    className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full font-inter font-semibold text-xs transition"
                    style={{
                      backgroundColor: completed ? "rgba(52,199,89,0.08)" : "rgba(0,0,0,0.04)",
                      color: completed ? "#34c759" : "rgba(0,0,0,0.4)",
                      border: completed ? "1px solid rgba(52,199,89,0.2)" : "1px solid rgba(0,0,0,0.06)",
                    }}
                  >
                    {completed ? (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        Completed
                      </>
                    ) : (
                      "Mark Complete"
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-4 flex items-center justify-between gap-4">
              {prev ? (
                <button
                  onClick={() => router.push(`/academy/lesson/${prev.id}`)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl font-inter text-sm transition"
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid rgba(0,0,0,0.06)",
                    color: "rgba(0,0,0,0.5)",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  <span className="hidden sm:inline">{prev.title.length > 30 ? prev.title.slice(0, 30) + "..." : prev.title}</span>
                  <span className="sm:hidden">Previous</span>
                </button>
              ) : <div />}
              {next ? (
                <button
                  onClick={() => router.push(`/academy/lesson/${next.id}`)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl font-inter text-sm transition"
                  style={{
                    backgroundColor: "#FF872A",
                    color: "#fff",
                    boxShadow: "0 4px 15px rgba(255,135,42,0.2)",
                  }}
                >
                  <span className="hidden sm:inline">{next.title.length > 30 ? next.title.slice(0, 30) + "..." : next.title}</span>
                  <span className="sm:hidden">Next</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={() => router.push(`/academy?track=${track}`)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl font-inter text-sm transition"
                  style={{
                    backgroundColor: "#34c759",
                    color: "#fff",
                  }}
                >
                  Module Complete!
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* AI Tutor Chat */}
      <LessonChat
        lessonTitle={lesson.title}
        moduleName={lesson.moduleTitle}
        track={track}
      />

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
}
