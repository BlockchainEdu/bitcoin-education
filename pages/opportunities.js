import React from "react";
import Head from "next/head";
import Footer from "../components/footer";
import HeaderWithLogoDark from "../components/headerWithLogoDark";
import StandardButton from "../components/standardButton";
import { TeamMemberService } from "../services";

function safeJsonParse(value) {
  if (!value || typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function buildTitleToId(columns = []) {
  const map = new Map();
  columns.forEach((c) => {
    if (c?.id && c?.title) map.set(c.title.trim().toLowerCase(), c.id);
  });
  return map;
}

function pickId(map, titles) {
  for (const t of titles) {
    const id = map.get(t.toLowerCase());
    if (id) return id;
  }
  return null;
}

function col(item, id) {
  return item?.column_values?.find((c) => c.id === id) ?? null;
}

function parseMondayDate(cv) {
  const raw = cv?.value ?? cv?.text;
  const parsed = safeJsonParse(raw);
  const date = parsed?.date || raw;
  if (!date) return null;
  const d = new Date(date);
  return Number.isNaN(d.getTime()) ? null : d;
}

function formatRange(start, end) {
  if (!start) return "";
  const f = (d) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return end && end.getTime() !== start.getTime()
    ? `${f(start)} - ${f(end)}`
    : f(start);
}

export default function Opportunities({ events, eventDeals }) {
  const hasEvents = Array.isArray(events) && events.length > 0;

  const renderEventCard = (event, i) => {
    const deal = eventDeals?.[event.name];
    const dealUrl = safeJsonParse(deal?.link?.value)?.url;

    const hasMoreInfo = Boolean(event.url);
    const hasDeal = Boolean(dealUrl);

    return (
      <div
        key={event.id ?? `${event.name}-${i}`}
        className="
  relative h-[360px] md:h-[380px] rounded-3xl overflow-hidden
  border border-white/10 shadow-sm
  transition hover:-translate-y-1 hover:shadow-md
"
      >
        {/* Background */}
        {event.image ? (
          <>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("${event.image}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "saturate(0.95) contrast(1.08)",
                transform: "scale(1.03)",
              }}
            />
            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/25" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />
          </>
        )}

        <div className="relative h-full p-6 flex flex-col">
          <div
            className="
              rounded-xl
              bg-black/45
              border border-white/12
              backdrop-blur-[3px]
              p-4
            "
          >
            <h3
              className="text-lg font-semibold text-white line-clamp-2"
              style={{ textShadow: "0 2px 14px rgba(0,0,0,0.75)" }}
            >
              {event.name}
            </h3>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span
                className="
                  text-xs font-semibold
                  px-2.5 py-1 rounded-full
                  bg-white/14 text-white
                  border border-white/18
                "
                style={{ textShadow: "0 2px 14px rgba(0,0,0,0.75)" }}
              >
                {event.dateLabel}
              </span>

              {event.location ? (
                <span
                  className="text-xs text-white/95"
                  style={{ textShadow: "0 2px 14px rgba(0,0,0,0.75)" }}
                >
                  • {event.location}
                </span>
              ) : null}
            </div>

            {event.description ? (
              <p
                className="mt-3 text-sm text-white/95 line-clamp-2"
                style={{ textShadow: "0 2px 14px rgba(0,0,0,0.75)" }}
              >
                {event.description}
              </p>
            ) : null}
          </div>

          <div className="mt-auto pt-4 flex flex-col gap-2">
            <div className="h-[52px]">
              {hasDeal ? (
                <StandardButton
                  link={dealUrl}
                  textColor="white"
                  text={deal.message}
                  target="_blank"
                  color="orange"
                  styling="w-full h-full flex items-center justify-center font-semibold"
                />
              ) : (
                <div className="h-full" />
              )}
            </div>

            <div className="h-[50px]">
              {hasMoreInfo ? (
                <StandardButton
                  link={event.url}
                  text="More info"
                  target="_blank"
                  textColor="white"
                  styling="
                    w-full h-full flex items-center justify-center
                    font-semibold
                    bg-white/5
                    border border-white/25
                    backdrop-blur-sm
                    hover:bg-white/10
                  "
                />
              ) : (
                <div className="h-full" />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-benwhite-500">
      <Head>
        <title>Opportunities for Student Builders</title>
      </Head>

      <HeaderWithLogoDark />

      {/* hero */}
      <section className="pt-20 pb-10 text-center bg-gradient-to-br from-orange-50 via-white to-benorange-100">
        <h1 className="text-5xl font-extrabold mb-4">
          <span className="text-benorange-500">Opportunities</span> for Student
          Builders
        </h1>
        <p className="text-lg text-gray-600">
          Conferences, hackathons and scholarships worldwide.
        </p>
      </section>

      {/* events */}
      <section className="pt-3 pb-16">
        <div className="container mx-auto px-4 max-w-[1400px] px-8">
          {!hasEvents ? (
            <div className="text-center bg-white p-8 rounded-2xl border border-gray-100">
              <p className="font-semibold text-gray-700">
                No upcoming events found
              </p>
            </div>
          ) : (
            <div className="relative">
              <div
                className="
      pointer-events-none
      absolute -top-8 inset-x-0
      h-20
      bg-gradient-to-b
      from-white
      via-white/90
      to-transparent
      z-10
    "
              />

              <div
                className="
      pointer-events-none
      absolute -bottom-8 inset-x-0
      h-20
      bg-gradient-to-t
      from-white
      via-white/90
      to-transparent
      z-10
    "
              />

              <div
                className="
      max-h-[980px] overflow-y-auto
      rounded-3xl
      bg-transparent
      p-4
    "
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "transparent transparent",
                }}
              >
                <style jsx>{`
                  .scrollBox::-webkit-scrollbar {
                    width: 4px;
                  }
                  .scrollBox::-webkit-scrollbar-track {
                    background: transparent;
                  }
                  .scrollBox::-webkit-scrollbar-thumb {
                    border-radius: 999px;
                    border: 2px solid transparent;
                    background-clip: content-box;
                    background: transparent;
                  }
                  .scrollBox:hover::-webkit-scrollbar-thumb {
                    background: rgba(0, 0, 0, 0.16);
                    background-clip: content-box;
                  }
                  .scrollBox::-webkit-scrollbar-thumb:hover {
                    background: rgba(0, 0, 0, 0.22);
                    background-clip: content-box;
                  }
                `}</style>

                <div className="scrollBox">
                  <div className="grid gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    {events.map(renderEventCard)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section
        id="apply"
        className="relative py-20 px-6 bg-bencustomblack-500 overflow-hidden"
      >
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-[-0.02em] leading-tight mb-4 text-white">
              Apply for support
            </h2>

            <p className="text-base lg:text-lg text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
              <span className="text-white/80">
                BEN may support you with discounts, scholarships or special
                access so you can attend key conferences and hackathons.
              </span>
            </p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-white">
                  Full name
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  className="w-full bg-white rounded-xl px-3 py-3 text-benblack-600 focus:outline-none focus:ring-2 focus:ring-white/70"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-white rounded-xl px-3 py-3 text-benblack-600 focus:outline-none focus:ring-2 focus:ring-white/70"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-white">
                  University / School
                </label>
                <input
                  type="text"
                  name="university"
                  required
                  className="w-full bg-white rounded-xl px-3 py-3 text-benblack-600 focus:outline-none focus:ring-2 focus:ring-white/70"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-white">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  required
                  className="w-full bg-white rounded-xl px-3 py-3 text-benblack-600 focus:outline-none focus:ring-2 focus:ring-white/70"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                LinkedIn profile
              </label>
              <input
                type="url"
                name="linkedin"
                required
                className="w-full bg-white rounded-xl px-3 py-3 text-benblack-600 focus:outline-none focus:ring-2 focus:ring-white/70"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                GitHub or project link (optional)
              </label>
              <input
                type="url"
                name="projectLink"
                className="w-full bg-white rounded-xl px-3 py-3 text-benblack-600 focus:outline-none focus:ring-2 focus:ring-white/70"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                What are you building or what do you want to build?
              </label>
              <textarea
                name="whatBuilding"
                required
                rows={4}
                className="w-full bg-white rounded-xl px-3 py-3 text-benblack-600 focus:outline-none focus:ring-2 focus:ring-white/70"
              />
            </div>

            <div className="pt-2 flex flex-col items-center gap-2">
              <div className="flex items-start space-x-2">
                <input
                  id="founderPipeline"
                  type="checkbox"
                  name="founderPipeline"
                  className="mt-1 h-4 w-4"
                />
                <label htmlFor="founderPipeline" className="text-sm text-white">
                  I want to join the BEN founder pipeline
                </label>
              </div>

              <button
                type="submit"
                className="
                  mt-4 px-10 py-3 rounded-full
                  bg-benorange-500 text-white text-sm
                  font-semibold tracking-wide
                  transition-colors duration-200
                  hover:bg-bencustomorange-500
                "
              >
                Submit application
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const ALIASES = {
    location: ["location", "local"],
    link: ["link", "url", "website"],
    description: ["description", "details", "about"],
    start: ["start date", "date", "start"],
    end: ["end date", "end"],
  };

  const eventsRes = await TeamMemberService.getMembers({
    query: `{
      boards (ids: 18392867276) {
        columns { id title }
        items_page (limit: 500) {
          items {
            id
            name
            assets { public_url }
            column_values { id value text }
          }
        }
      }
    }`,
  });

  const dealsRes = await TeamMemberService.getMembers({
    query: `{
      boards (ids: 5775320038) {
        items_page (limit: 500) {
          items {
            name
            column_values { id value text }
          }
        }
      }
    }`,
  });

  const board = eventsRes?.data?.data?.boards?.[0];
  const items = board?.items_page?.items ?? [];
  const map = buildTitleToId(board?.columns ?? []);
  const now = new Date();

  const locationId = pickId(map, ALIASES.location);
  const linkId = pickId(map, ALIASES.link);
  const descriptionId = pickId(map, ALIASES.description);
  const startId = pickId(map, ALIASES.start);
  const endId = pickId(map, ALIASES.end);

  const events = items
    .map((item) => {
      const start = parseMondayDate(col(item, startId));
      const end = parseMondayDate(col(item, endId));
      const effective = end || start;

      if (!effective || effective < now) return null;

      const urlObj = safeJsonParse(col(item, linkId)?.value);
      const url = urlObj?.url ?? col(item, linkId)?.text ?? "";

      return {
        id: item.id,
        name: item.name,
        dateLabel: formatRange(start, end),
        location: col(item, locationId)?.text ?? "",
        url,
        description: col(item, descriptionId)?.text ?? "",
        image: item.assets?.[0]?.public_url ?? null,
        sort: effective.getTime(),
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.sort - b.sort);

  const dealItems = dealsRes?.data?.data?.boards?.[0]?.items_page?.items ?? [];

  const eventDeals = dealItems.reduce((acc, item) => {
    const eventRef = item?.column_values?.[0]?.text ?? "";
    if (!eventRef) return acc;
    acc[eventRef] = { message: item.name, link: item.column_values?.[1] };
    return acc;
  }, {});

  return {
    props: { events, eventDeals },
    revalidate: 3600,
  };
}
