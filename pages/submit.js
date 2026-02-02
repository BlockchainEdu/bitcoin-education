import React, { useMemo, useState } from "react";
import Head from "next/head";
import HeaderWithLogoDark from "../components/headerWithLogoDark";
import Footer from "../components/footer";

const BG_WARM = "bg-[#FFFBF2]";
const BG_WHITE = "bg-white";

function RequiredLabel({ children, className = "" }) {
  return (
    <label
      className={`text-[12px] font-semibold text-benblack-500 mb-2 inline-flex items-center gap-1 ${className}`}
    >
      <span>{children}</span>
      <span className="text-red-500" aria-hidden="true">
        *
      </span>
    </label>
  );
}

function Pill({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "h-10 px-4 rounded-xl bg-benorange-500 text-white text-xs font-semibold border border-benorange-500"
          : "h-10 px-4 rounded-xl bg-white text-xs font-semibold text-benblack-500 border border-black/10 hover:border-black/20"
      }
    >
      {children}
    </button>
  );
}

export default function Submit() {
  const [logoMode, setLogoMode] = useState("upload");
  const [logoPreview, setLogoPreview] = useState(null);
  const [mediaLinks, setMediaLinks] = useState([
    { type: "Twitter", url: "" },
    { type: "LinkedIn", url: "" },
  ]);

  const categories = useMemo(
    () => [
      "Infrastructure",
      "DeFi",
      "NFT",
      "Games",
      "CeFi",
      "DAO",
      "Tools & Information",
      "Social & Entertainment",
      "Others",
    ],
    [],
  );

  const tokens = useMemo(() => ["Not TGE", "TGE"], []);

  return (
    <div className={`min-h-screen ${BG_WHITE}`}>
      <Head>
        <title>Submit Project | BEN</title>
      </Head>

      <HeaderWithLogoDark />

      <section className={`${BG_WARM} border-t border-black/5 pt-16 pb-16`}>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
              <div className="lg:pt-3">
                <div className="text-base sm:text-lg font-bold tracking-tight text-benorange-500 flex items-center gap-2">
                  <span aria-hidden="true">📝</span>
                  <span>Get Listed</span>
                </div>

                <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-benblack-500">
                  Submit Project
                </h1>

                <p className="mt-4 text-sm sm:text-base text-benblack-500/70 max-w-md">
                  If you found a project we haven’t listed yet, submit it here.
                  Provide as much detail as possible to speed up review.
                </p>
              </div>

              <div className="flex lg:justify-end">
                <div className="w-full max-w-[520px]">
                  <div className="rounded-2xl bg-white border border-black/10 shadow-sm p-5 sm:p-6">
                    <form
                      className="space-y-5"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      {/* Name + Website */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <RequiredLabel>Name</RequiredLabel>
                          <input
                            type="text"
                            required
                            className="w-full h-11 rounded-xl px-3 text-sm bg-white border border-black/10 focus:outline-none focus:ring-2 focus:ring-benorange-500/30"
                            placeholder="Name"
                          />
                        </div>

                        <div>
                          <RequiredLabel>Website</RequiredLabel>
                          <input
                            type="url"
                            required
                            className="w-full h-11 rounded-xl px-3 text-sm bg-white border border-black/10 focus:outline-none focus:ring-2 focus:ring-benorange-500/30"
                            placeholder="https://..."
                          />
                        </div>
                      </div>

                      {/* Logo */}
                      <div>
                        <div className="flex items-center justify-between gap-3">
                          <RequiredLabel className="mb-0">Logo</RequiredLabel>

                          <div className="inline-flex rounded-xl overflow-hidden border border-black/10">
                            <button
                              type="button"
                              onClick={() => setLogoMode("upload")}
                              className={
                                logoMode === "upload"
                                  ? "h-8 px-3 text-xs font-semibold bg-benorange-500 text-white"
                                  : "h-8 px-3 text-xs font-semibold bg-white text-benblack-500"
                              }
                            >
                              Upload
                            </button>
                            <button
                              type="button"
                              onClick={() => setLogoMode("url")}
                              className={
                                logoMode === "url"
                                  ? "h-8 px-3 text-xs font-semibold bg-benorange-500 text-white"
                                  : "h-8 px-3 text-xs font-semibold bg-white text-benblack-500"
                              }
                            >
                              URL
                            </button>
                          </div>
                        </div>

                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-4 items-start">
                          <div className="h-[92px] rounded-xl border border-black/10 bg-black/5 overflow-hidden flex items-center justify-center">
                            {logoPreview ? (
                              <img
                                src={logoPreview}
                                alt="Logo preview"
                                className="w-full h-full object-contain p-2"
                              />
                            ) : (
                              <span className="text-xs text-benblack-500/50">
                                Preview
                              </span>
                            )}
                          </div>

                          <div>
                            {logoMode === "upload" ? (
                              <>
                                <input
                                  type="file"
                                  accept="image/png,image/jpeg,image/jpg"
                                  className="block w-full text-sm"
                                  onChange={(e) => {
                                    const f = e.target.files?.[0];
                                    if (!f) return setLogoPreview(null);
                                    const url = URL.createObjectURL(f);
                                    setLogoPreview(url);
                                  }}
                                />
                                <p className="mt-2 text-[11px] text-benblack-500/55">
                                  Supports PNG, JPG, and JPEG formats within
                                  1MB.
                                </p>
                              </>
                            ) : (
                              <input
                                type="url"
                                className="w-full h-11 rounded-xl px-3 text-sm bg-white border border-black/10 focus:outline-none focus:ring-2 focus:ring-benorange-500/30"
                                placeholder="Input an image URL"
                                onChange={(e) => setLogoPreview(e.target.value)}
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Intro */}
                      <div>
                        <RequiredLabel>Intro</RequiredLabel>
                        <textarea
                          rows={4}
                          required
                          className="w-full rounded-xl px-3 py-3 text-sm bg-white border border-black/10 focus:outline-none focus:ring-2 focus:ring-benorange-500/30 resize-none"
                          placeholder="Intro"
                        />
                      </div>

                      {/* Founded + Location */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[12px] font-semibold text-benblack-500 mb-2 inline-flex items-center">
                            Founded
                          </label>
                          <input
                            type="date"
                            className="w-full h-11 rounded-xl px-3 text-sm bg-white border border-black/10 focus:outline-none focus:ring-2 focus:ring-benorange-500/30"
                          />
                        </div>

                        <div>
                          <label className="text-[12px] font-semibold text-benblack-500 mb-2 inline-flex items-center">
                            Location
                          </label>
                          <input
                            type="text"
                            className="w-full h-11 rounded-xl px-3 text-sm bg-white border border-black/10 focus:outline-none focus:ring-2 focus:ring-benorange-500/30"
                            placeholder="Location"
                          />
                        </div>
                      </div>

                      {/* Category */}
                      <div>
                        <RequiredLabel>Category</RequiredLabel>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {categories.map((c) => (
                            <label
                              key={c}
                              className="h-10 px-3 rounded-xl bg-white border border-black/10 flex items-center gap-2 text-xs font-semibold text-benblack-500"
                            >
                              <input type="checkbox" className="h-4 w-4" />
                              <span className="truncate">{c}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Token */}
                      <div>
                        <RequiredLabel>Token</RequiredLabel>
                        <div className="grid grid-cols-2 gap-3">
                          {tokens.map((t) => (
                            <label
                              key={t}
                              className="h-10 px-3 rounded-xl bg-white border border-black/10 flex items-center justify-center gap-2 text-xs font-semibold text-benblack-500"
                            >
                              <input type="checkbox" className="h-4 w-4" />
                              <span>{t}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Selects */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[12px] font-semibold text-benblack-500 mb-2 inline-flex items-center">
                            Investors
                          </label>
                          <select className="w-full h-11 rounded-xl px-3 text-sm bg-white border border-black/10 focus:outline-none focus:ring-2 focus:ring-benorange-500/30">
                            <option>Select</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[12px] font-semibold text-benblack-500 mb-2 inline-flex items-center">
                            MainNet
                          </label>
                          <select className="w-full h-11 rounded-xl px-3 text-sm bg-white border border-black/10 focus:outline-none focus:ring-2 focus:ring-benorange-500/30">
                            <option>Select</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[12px] font-semibold text-benblack-500 mb-2 inline-flex items-center">
                            TestNet
                          </label>
                          <select className="w-full h-11 rounded-xl px-3 text-sm bg-white border border-black/10 focus:outline-none focus:ring-2 focus:ring-benorange-500/30">
                            <option>Select</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[12px] font-semibold text-benblack-500 mb-2 inline-flex items-center">
                            Plan to Launch
                          </label>
                          <select className="w-full h-11 rounded-xl px-3 text-sm bg-white border border-black/10 focus:outline-none focus:ring-2 focus:ring-benorange-500/30">
                            <option>Select</option>
                          </select>
                        </div>
                      </div>

                      {/* Media links */}
                      <div>
                        <div className="flex items-center justify-between">
                          <label className="text-[12px] font-semibold text-benblack-500 inline-flex items-center">
                            Media links
                          </label>

                          <button
                            type="button"
                            onClick={() =>
                              setMediaLinks((prev) => [
                                ...prev,
                                { type: "Other", url: "" },
                              ])
                            }
                            className="text-xs font-semibold text-benorange-500 hover:text-bencustomorange-500"
                          >
                            Add +
                          </button>
                        </div>

                        <div className="mt-3 flex flex-col gap-3">
                          {mediaLinks.map((row, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <select
                                value={row.type}
                                onChange={(e) => {
                                  const v = e.target.value;
                                  setMediaLinks((prev) =>
                                    prev.map((r, i) =>
                                      i === idx ? { ...r, type: v } : r,
                                    ),
                                  );
                                }}
                                className="h-11 w-40 sm:w-44 rounded-xl px-3 text-sm bg-white border border-black/10 focus:outline-none focus:ring-2 focus:ring-benorange-500/30"
                              >
                                <option>Twitter</option>
                                <option>LinkedIn</option>
                                <option>Github</option>
                                <option>Telegram</option>
                                <option>Other</option>
                              </select>

                              <input
                                type="url"
                                value={row.url}
                                onChange={(e) => {
                                  const v = e.target.value;
                                  setMediaLinks((prev) =>
                                    prev.map((r, i) =>
                                      i === idx ? { ...r, url: v } : r,
                                    ),
                                  );
                                }}
                                className="h-11 flex-1 min-w-0 rounded-xl px-3 text-sm bg-white border border-black/10 focus:outline-none focus:ring-2 focus:ring-benorange-500/30"
                                placeholder={`${row.type} URL`}
                              />

                              <button
                                type="button"
                                onClick={() =>
                                  setMediaLinks((prev) =>
                                    prev.filter((_, i) => i !== idx),
                                  )
                                }
                                className="h-11 px-2 text-benblack-500/40 hover:text-benblack-500/70 transition-colors"
                                aria-label="Remove"
                                title="Remove"
                              >
                                <span className="text-lg leading-none">×</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Address + Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[12px] font-semibold text-benblack-500 mb-2 inline-flex items-center">
                            How do I address you?
                          </label>
                          <input
                            type="text"
                            className="w-full h-11 rounded-xl px-3 text-sm bg-white border border-black/10 focus:outline-none focus:ring-2 focus:ring-benorange-500/30"
                            placeholder="How do I address you?"
                          />
                        </div>

                        <div>
                          <RequiredLabel>Email</RequiredLabel>
                          <input
                            type="email"
                            required
                            className="w-full h-11 rounded-xl px-3 text-sm bg-white border border-black/10 focus:outline-none focus:ring-2 focus:ring-benorange-500/30"
                            placeholder="Email"
                          />
                        </div>
                      </div>

                      {/* Submit */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full h-11 rounded-xl bg-black/10 text-benblack-500 text-sm font-semibold hover:bg-black/15 transition-colors"
                        >
                          Submit
                        </button>
                        <p className="mt-2 text-[11px] text-center text-benblack-500/55">
                          By submitting, you confirm the info is accurate.
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
