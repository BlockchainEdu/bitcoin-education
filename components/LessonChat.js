import { useState, useRef, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function LessonChat({ lessonTitle, moduleName, track }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: "user", content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch("/api/lesson-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(session?.access_token && { Authorization: `Bearer ${session.access_token}` }),
        },
        body: JSON.stringify({
          messages: updated,
          lessonTitle,
          moduleName,
          track,
        }),
      });
      const data = await res.json();
      if (data.reply) {
        setMessages([...updated, { role: "assistant", content: data.reply }]);
      }
    } catch {
      setMessages([...updated, { role: "assistant", content: "Something went wrong. Try again." }]);
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 flex items-center gap-2 px-5 py-3 rounded-full font-inter font-semibold text-sm text-white transition"
        style={{
          backgroundColor: "#FF872A",
          boxShadow: "0 8px 30px rgba(255,135,42,0.3)",
          zIndex: 50,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
        Ask AI Tutor
      </button>
    );
  }

  return (
    <div
      className="fixed bottom-6 right-6 flex flex-col rounded-2xl overflow-hidden"
      style={{
        width: 380,
        maxWidth: "calc(100vw - 48px)",
        height: 520,
        maxHeight: "calc(100vh - 120px)",
        backgroundColor: "#fff",
        border: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
        zIndex: 50,
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ backgroundColor: "#202127", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div>
          <p className="font-mont font-bold text-sm text-white">AI Tutor</p>
          <p className="font-inter text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            Ask anything about this lesson
          </p>
        </div>
        <button onClick={() => setOpen(false)} className="text-white" style={{ opacity: 0.4 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4" style={{ backgroundColor: "#fafafa" }}>
        {messages.length === 0 && (
          <div className="text-center py-8">
            <p className="font-inter text-sm" style={{ color: "rgba(0,0,0,0.3)" }}>
              Ask a question about
            </p>
            <p className="font-mont font-bold text-sm mt-1" style={{ color: "#1d1d1f" }}>
              {lessonTitle}
            </p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {["Explain this concept", "Give me an example", "Why is this important?"].map((q) => (
                <button
                  key={q}
                  onClick={() => { setInput(q); }}
                  className="px-3 py-1.5 rounded-full font-inter text-xs transition"
                  style={{
                    backgroundColor: "rgba(255,135,42,0.08)",
                    color: "#FF872A",
                    border: "1px solid rgba(255,135,42,0.15)",
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-3 ${msg.role === "user" ? "text-right" : "text-left"}`}
          >
            <div
              className="inline-block rounded-xl px-3.5 py-2.5 font-inter text-sm leading-relaxed"
              style={{
                maxWidth: "85%",
                backgroundColor: msg.role === "user" ? "#FF872A" : "#fff",
                color: msg.role === "user" ? "#fff" : "#1d1d1f",
                border: msg.role === "assistant" ? "1px solid rgba(0,0,0,0.06)" : "none",
                textAlign: "left",
                whiteSpace: "pre-wrap",
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="mb-3 text-left">
            <div
              className="inline-block rounded-xl px-3.5 py-2.5"
              style={{ backgroundColor: "#fff", border: "1px solid rgba(0,0,0,0.06)" }}
            >
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#FF872A", animation: "chatDot 1.4s infinite 0s" }} />
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#FF872A", animation: "chatDot 1.4s infinite 0.2s" }} />
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#FF872A", animation: "chatDot 1.4s infinite 0.4s" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={send} className="px-3 py-3" style={{ borderTop: "1px solid rgba(0,0,0,0.06)", backgroundColor: "#fff" }}>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 px-4 py-2.5 rounded-full font-inter text-sm outline-none"
            style={{ backgroundColor: "#f5f5f7", border: "1px solid rgba(0,0,0,0.06)" }}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-4 py-2.5 rounded-full font-inter font-semibold text-sm text-white transition"
            style={{
              backgroundColor: loading || !input.trim() ? "rgba(0,0,0,0.1)" : "#FF872A",
            }}
          >
            Send
          </button>
        </div>
      </form>

      <style jsx>{`
        @keyframes chatDot {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
