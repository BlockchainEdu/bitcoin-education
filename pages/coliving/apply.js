import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { supabase } from "../../lib/supabase";

const STEPS = [
  { id: 1, label: "About You" },
  { id: 2, label: "What You're Building" },
  { id: 3, label: "Fit & Logistics" },
  { id: 4, label: "Review" },
];

const STAGE_OPTIONS = [
  "Idea stage",
  "Building MVP",
  "Launched (pre-revenue)",
  "Revenue generating",
  "Funded (pre-seed / seed)",
  "Series A+",
  "Not building a startup",
];

const ROLE_OPTIONS = [
  "Founder / Co-founder",
  "CTO / Technical Lead",
  "Software Engineer",
  "Product Manager",
  "Designer",
  "BD / Growth",
  "Investor / Advisor",
  "Researcher",
  "Other",
];

const HEAR_OPTIONS = [
  "BEN community",
  "Twitter / X",
  "Friend or colleague",
  "Conference / event",
  "Google search",
  "Other",
];

export default function ColivingApply() {
  const router = useRouter();
  const location = router.query.location || "ibiza";
  const locationLabel = location === "ericeira" ? "Ericeira" : "Ibiza";

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    name: "",
    email: "",
    telegram: "",
    linkedin: "",
    github: "",
    country: "",
    role: "",
    // What you're building
    startup_name: "",
    one_liner: "",
    stage: "",
    what_building: "",
    pitch_url: "",
    // Fit & logistics
    why_join: "",
    what_contribute: "",
    preferred_dates: "",
    dietary: "",
    how_heard: "",
  });

  const set = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  // ── Validation ──
  function validateStep(s) {
    const errs = {};
    if (s === 1) {
      if (!form.name.trim()) errs.name = "Required";
      if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        errs.email = "Valid email required";
      if (!form.telegram.trim()) errs.telegram = "Required for coordination";
      if (!form.linkedin.trim()) errs.linkedin = "Required to verify background";
      if (!form.country.trim()) errs.country = "Required";
      if (!form.role) errs.role = "Select your role";
    }
    if (s === 2) {
      if (!form.what_building.trim() || form.what_building.trim().length < 50)
        errs.what_building = "Minimum 50 characters. Be specific about what you're shipping.";
      if (!form.stage) errs.stage = "Select your stage";
    }
    if (s === 3) {
      if (!form.why_join.trim() || form.why_join.trim().length < 80)
        errs.why_join = "Minimum 80 characters. Help us understand your intent.";
      if (!form.what_contribute.trim() || form.what_contribute.trim().length < 50)
        errs.what_contribute = "Minimum 50 characters. What value do you bring to the cohort?";
      if (!form.preferred_dates.trim()) errs.preferred_dates = "Required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function nextStep() {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, 4));
  }

  function prevStep() {
    setStep((s) => Math.max(s - 1, 1));
  }

  async function handleSubmit() {
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      setStep(1);
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from("applications").insert({
        type: "coliving",
        name: form.name.trim(),
        email: form.email.trim(),
        telegram: form.telegram.trim(),
        linkedin: form.linkedin.trim(),
        github: form.github.trim() || null,
        country: form.country.trim(),
        startup_name: form.startup_name.trim() || null,
        one_liner: form.one_liner.trim() || null,
        stage: form.stage || null,
        what_building: form.what_building.trim(),
        pitch_url: form.pitch_url.trim() || null,
        preferred_location: locationLabel,
        preferred_dates: form.preferred_dates.trim(),
        status: "pending",
      });

      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      console.error("Application submit error:", err);
      alert("Something went wrong. Please try again or contact team@blockchainedu.org");
    } finally {
      setSubmitting(false);
    }
  }

  // ── Input component ──
  function Field({ label, field, type = "text", required, placeholder, hint, rows }) {
    const isTextarea = !!rows;
    const Tag = isTextarea ? "textarea" : "input";
    return (
      <div className="mb-6">
        <label className="block font-inter font-semibold mb-2" style={{ fontSize: 14, color: "#1d1d1f" }}>
          {label}
          {required && <span style={{ color: "#FF872A" }}> *</span>}
        </label>
        {hint && (
          <p className="font-inter mb-2" style={{ fontSize: 13, color: "#86868b", lineHeight: 1.5 }}>
            {hint}
          </p>
        )}
        <Tag
          type={type}
          value={form[field]}
          onChange={set(field)}
          placeholder={placeholder}
          rows={rows}
          className="w-full font-inter rounded-xl p-4 transition"
          style={{
            fontSize: 15,
            backgroundColor: "#fafafa",
            border: errors[field] ? "2px solid #ef4444" : "1px solid rgba(0,0,0,0.08)",
            outline: "none",
            resize: isTextarea ? "vertical" : undefined,
            color: "#1d1d1f",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#FF872A";
            e.currentTarget.style.borderWidth = "2px";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = errors[field] ? "#ef4444" : "rgba(0,0,0,0.08)";
            e.currentTarget.style.borderWidth = errors[field] ? "2px" : "1px";
          }}
        />
        {errors[field] && (
          <p className="font-inter mt-1" style={{ fontSize: 13, color: "#ef4444" }}>
            {errors[field]}
          </p>
        )}
      </div>
    );
  }

  function SelectField({ label, field, options, required, hint }) {
    return (
      <div className="mb-6">
        <label className="block font-inter font-semibold mb-2" style={{ fontSize: 14, color: "#1d1d1f" }}>
          {label}
          {required && <span style={{ color: "#FF872A" }}> *</span>}
        </label>
        {hint && (
          <p className="font-inter mb-2" style={{ fontSize: 13, color: "#86868b", lineHeight: 1.5 }}>
            {hint}
          </p>
        )}
        <select
          value={form[field]}
          onChange={set(field)}
          className="w-full font-inter rounded-xl p-4 transition appearance-none"
          style={{
            fontSize: 15,
            backgroundColor: "#fafafa",
            border: errors[field] ? "2px solid #ef4444" : "1px solid rgba(0,0,0,0.08)",
            outline: "none",
            color: form[field] ? "#1d1d1f" : "#86868b",
          }}
        >
          <option value="">Select...</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {errors[field] && (
          <p className="font-inter mt-1" style={{ fontSize: 13, color: "#ef4444" }}>
            {errors[field]}
          </p>
        )}
      </div>
    );
  }

  // ── Success state ──
  if (submitted) {
    return (
      <div className="overflow-hidden">
        <Header />
        <Head>
          <title>Application Submitted | BEN Co-Living</title>
        </Head>
        <div
          className="relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #000 0%, #0a0a0a 50%, #111 100%)",
            minHeight: "80vh",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: 0.07,
              background: "radial-gradient(ellipse 60% 50% at 50% 50%, #FF872A, transparent)",
            }}
          />
          <div className="relative flex items-center justify-center min-h-screen px-7">
            <div className="max-w-lg text-center">
              <div
                className="flex items-center justify-center mx-auto mb-6 rounded-full"
                style={{ width: 64, height: 64, backgroundColor: "rgba(255,135,42,0.15)" }}
              >
                <svg className="h-8 w-8" style={{ color: "#FF872A" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="font-mont font-black text-3xl sm:text-4xl text-white mb-4">
                Application received
              </h1>
              <p className="font-inter mb-8" style={{ fontSize: 17, lineHeight: 1.6, color: "rgba(255,255,255,0.45)" }}>
                We review every application personally. If your profile is a fit for {locationLabel},
                we'll reach out via Telegram within 5 business days.
              </p>
              <button
                onClick={() => router.push("/")}
                className="font-mont font-bold text-white rounded-full transition"
                style={{ padding: "14px 32px", fontSize: 15, backgroundColor: "#FF872A" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e5771f")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FF872A")}
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <Header />
      <Head>
        <title>Apply — {locationLabel} Co-Living | BEN</title>
        <meta name="description" content={`Apply to join BEN's builder residency in ${locationLabel}. Limited spots per cohort.`} />
        <link rel="canonical" href={`https://www.blockchainedu.org/coliving/apply?location=${location}`} />
      </Head>

      {/* ── Hero ── */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #000 0%, #0a0a0a 50%, #111 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.07,
            background: "radial-gradient(ellipse 60% 50% at 70% 40%, #FF872A, transparent)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.02,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 pt-20 sm:pt-24 pb-12">
          <div
            className="inline-flex items-center gap-2 font-inter font-medium rounded-full mb-6"
            style={{
              fontSize: 12,
              padding: "7px 16px",
              color: "rgba(255,255,255,0.5)",
              backgroundColor: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              letterSpacing: "0.02em",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: "#FF872A" }} />
            {locationLabel} Residency
          </div>

          <h1
            className="font-mont font-black"
            style={{
              fontSize: "clamp(32px, 5vw, 52px)",
              lineHeight: 1.05,
              color: "#fff",
              letterSpacing: "-0.04em",
              maxWidth: 600,
            }}
          >
            Apply to{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #FF872A, #ffb347)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Co-Live
            </span>
          </h1>

          <p
            className="font-inter mt-4"
            style={{
              fontSize: "clamp(15px, 2vw, 17px)",
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.45)",
              maxWidth: 500,
              letterSpacing: "-0.01em",
            }}
          >
            We keep cohorts small (12-16 people) and select for builders who ship.
            Every question matters. Take your time.
          </p>
        </div>
      </div>

      {/* ── Form ── */}
      <section className="py-16 px-7" style={{ backgroundColor: "#fafafa" }}>
        <div className="max-w-2xl mx-auto">
          {/* Progress bar */}
          <div className="flex items-center mb-12">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center" style={{ flex: i < STEPS.length - 1 ? 1 : 0 }}>
                <div className="flex flex-col items-center">
                  <div
                    className="flex items-center justify-center rounded-full font-inter font-bold transition-all"
                    style={{
                      width: 36,
                      height: 36,
                      fontSize: 14,
                      backgroundColor: step >= s.id ? "#FF872A" : "rgba(0,0,0,0.06)",
                      color: step >= s.id ? "#fff" : "#86868b",
                    }}
                  >
                    {step > s.id ? (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      s.id
                    )}
                  </div>
                  <span
                    className="font-inter font-medium mt-2 hidden sm:block"
                    style={{ fontSize: 11, color: step >= s.id ? "#1d1d1f" : "#c7c7cc", whiteSpace: "nowrap" }}
                  >
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className="flex-1 mx-3"
                    style={{
                      height: 2,
                      backgroundColor: step > s.id ? "#FF872A" : "rgba(0,0,0,0.06)",
                      marginTop: -16,
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: About You */}
          {step === 1 && (
            <div>
              <h2 className="font-mont font-black mb-2" style={{ fontSize: 24, color: "#1d1d1f", letterSpacing: "-0.02em" }}>
                About You
              </h2>
              <p className="font-inter mb-8" style={{ fontSize: 15, color: "#86868b" }}>
                We need to know who you are before we can evaluate your fit.
              </p>

              <Field label="Full name" field="name" required placeholder="Your full name" />
              <Field label="Email" field="email" type="email" required placeholder="you@company.com" />
              <Field
                label="Telegram handle"
                field="telegram"
                required
                placeholder="@yourhandle"
                hint="Primary communication channel for accepted residents."
              />
              <Field
                label="LinkedIn URL"
                field="linkedin"
                required
                placeholder="https://linkedin.com/in/yourprofile"
                hint="We verify every applicant's professional background."
              />
              <Field
                label="GitHub / Portfolio URL"
                field="github"
                placeholder="https://github.com/yourusername"
                hint="Not required, but strongly recommended for technical applicants."
              />
              <Field label="Country of residence" field="country" required placeholder="e.g. Portugal" />
              <SelectField label="Your primary role" field="role" options={ROLE_OPTIONS} required />
            </div>
          )}

          {/* Step 2: What You're Building */}
          {step === 2 && (
            <div>
              <h2 className="font-mont font-black mb-2" style={{ fontSize: 24, color: "#1d1d1f", letterSpacing: "-0.02em" }}>
                What You're Building
              </h2>
              <p className="font-inter mb-8" style={{ fontSize: 15, color: "#86868b" }}>
                We select for people actively shipping. Tourists and spectators need not apply.
              </p>

              <Field
                label="Project / startup name"
                field="startup_name"
                placeholder="e.g. Acme Protocol"
                hint="Leave blank if you're between projects."
              />
              <Field
                label="One-liner"
                field="one_liner"
                placeholder="e.g. Decentralized identity for emerging markets"
                hint="If you have a project, describe it in one sentence."
              />
              <SelectField
                label="Stage"
                field="stage"
                options={STAGE_OPTIONS}
                required
                hint="Be honest. We value early-stage builders as much as funded teams."
              />
              <Field
                label="What are you actively building or working on?"
                field="what_building"
                required
                rows={5}
                placeholder="Be specific. What problem are you solving? What have you shipped? What's the next milestone you want to hit during the residency?"
                hint="This is the most important field. We want to see that you're building something real, not just exploring. Minimum 50 characters."
              />
              <Field
                label="Pitch deck or demo URL"
                field="pitch_url"
                placeholder="https://..."
                hint="Optional but helps us understand your project faster."
              />
            </div>
          )}

          {/* Step 3: Fit & Logistics */}
          {step === 3 && (
            <div>
              <h2 className="font-mont font-black mb-2" style={{ fontSize: 24, color: "#1d1d1f", letterSpacing: "-0.02em" }}>
                Fit & Logistics
              </h2>
              <p className="font-inter mb-8" style={{ fontSize: 15, color: "#86868b" }}>
                Co-living only works when everyone adds value. Help us understand yours.
              </p>

              <Field
                label="Why do you want to join this residency?"
                field="why_join"
                required
                rows={4}
                placeholder="What do you want to get out of it? Why now? Why this location? What's your current situation that makes this the right move?"
                hint="Generic answers like 'networking' won't cut it. Be specific about what you need and why a co-living environment is the right fit. Minimum 80 characters."
              />
              <Field
                label="What will you contribute to the cohort?"
                field="what_contribute"
                required
                rows={4}
                placeholder="e.g. I can run workshops on smart contract security, I have connections at major VCs, I bring 8 years of systems engineering experience..."
                hint="Everyone should give as much as they take. What skill, knowledge, or network do you bring? Minimum 50 characters."
              />
              <Field
                label="Preferred dates / availability"
                field="preferred_dates"
                required
                placeholder="e.g. Available May-July 2026, flexible on exact dates"
                hint="Cohorts typically run 2-4 weeks. Let us know your availability window."
              />
              <Field
                label="Dietary requirements"
                field="dietary"
                placeholder="e.g. Vegetarian, no gluten"
                hint="We have an on-site chef. Let us know about any dietary needs."
              />
              <SelectField
                label="How did you hear about us?"
                field="how_heard"
                options={HEAR_OPTIONS}
              />
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div>
              <h2 className="font-mont font-black mb-2" style={{ fontSize: 24, color: "#1d1d1f", letterSpacing: "-0.02em" }}>
                Review Your Application
              </h2>
              <p className="font-inter mb-8" style={{ fontSize: 15, color: "#86868b" }}>
                Double-check everything before submitting. You can go back to edit any section.
              </p>

              {[
                { title: "About You", stepNum: 1, fields: [
                  ["Name", form.name],
                  ["Email", form.email],
                  ["Telegram", form.telegram],
                  ["LinkedIn", form.linkedin],
                  ["GitHub", form.github],
                  ["Country", form.country],
                  ["Role", form.role],
                ]},
                { title: "What You're Building", stepNum: 2, fields: [
                  ["Project", form.startup_name],
                  ["One-liner", form.one_liner],
                  ["Stage", form.stage],
                  ["Building", form.what_building],
                  ["Pitch URL", form.pitch_url],
                ]},
                { title: "Fit & Logistics", stepNum: 3, fields: [
                  ["Why join", form.why_join],
                  ["Contribution", form.what_contribute],
                  ["Dates", form.preferred_dates],
                  ["Dietary", form.dietary],
                  ["How heard", form.how_heard],
                ]},
              ].map((section) => (
                <div
                  key={section.title}
                  className="rounded-2xl p-6 mb-6"
                  style={{ backgroundColor: "#fff", border: "1px solid rgba(0,0,0,0.06)" }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-mont font-bold" style={{ fontSize: 16, color: "#1d1d1f" }}>
                      {section.title}
                    </h3>
                    <button
                      onClick={() => setStep(section.stepNum)}
                      className="font-inter font-medium transition"
                      style={{ fontSize: 13, color: "#FF872A" }}
                    >
                      Edit
                    </button>
                  </div>
                  {section.fields.map(([label, value]) => (
                    value ? (
                      <div key={label} className="mb-3">
                        <span className="font-inter font-medium" style={{ fontSize: 12, color: "#86868b", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                          {label}
                        </span>
                        <p className="font-inter mt-1" style={{ fontSize: 14, color: "#1d1d1f", lineHeight: 1.5, whiteSpace: "pre-wrap" }}>
                          {value}
                        </p>
                      </div>
                    ) : null
                  ))}
                </div>
              ))}

              <div
                className="rounded-2xl p-6 mb-6"
                style={{ backgroundColor: "rgba(255,135,42,0.04)", border: "1px solid rgba(255,135,42,0.15)" }}
              >
                <p className="font-inter" style={{ fontSize: 14, color: "#6e6e73", lineHeight: 1.6 }}>
                  By submitting, you confirm that all information is accurate. We review applications
                  within 5 business days and will reach out via Telegram if your profile is a fit.
                  We accept fewer than 20% of applicants.
                </p>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-10">
            {step > 1 ? (
              <button
                onClick={prevStep}
                className="font-inter font-semibold transition"
                style={{ fontSize: 15, color: "#86868b", padding: "12px 24px" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#1d1d1f")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#86868b")}
              >
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                onClick={nextStep}
                className="font-mont font-bold text-white rounded-full transition"
                style={{ padding: "14px 32px", fontSize: 15, backgroundColor: "#FF872A" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e5771f")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FF872A")}
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="font-mont font-bold text-white rounded-full transition"
                style={{
                  padding: "14px 40px",
                  fontSize: 15,
                  backgroundColor: submitting ? "#c7c7cc" : "#FF872A",
                  cursor: submitting ? "not-allowed" : "pointer",
                }}
                onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.backgroundColor = "#e5771f"; }}
                onMouseLeave={(e) => { if (!submitting) e.currentTarget.style.backgroundColor = "#FF872A"; }}
              >
                {submitting ? "Submitting..." : "Submit Application"}
              </button>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
