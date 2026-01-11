import React, { useMemo, useState, useEffect } from "react";
import Head from "next/head";
import Footer from "../components/footer";
import HeaderWithLogoDark from "../components/headerWithLogoDark";
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

function getYouTubeEmbedUrl(url) {
  if (!url || typeof url !== "string") return "";
  if (url.includes("youtube.com/embed/")) return url;

  try {
    const u = new URL(url);

    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace("/", "").trim();
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }

    const v = u.searchParams.get("v");
    if (v) return `https://www.youtube.com/embed/${v}`;

    const liveMatch = u.pathname.match(/\/live\/([^/]+)/);
    if (liveMatch?.[1]) return `https://www.youtube.com/embed/${liveMatch[1]}`;

    const embedMatch = u.pathname.match(/\/embed\/([^/]+)/);
    if (embedMatch?.[1])
      return `https://www.youtube.com/embed/${embedMatch[1]}`;

    return "";
  } catch {
    return "";
  }
}

function SectionShell({ children, className = "", max = "max-w-4xl" }) {
  return (
    <div className={`mx-auto w-full ${max} px-4 sm:px-6 ${className}`}>
      {children}
    </div>
  );
}

function VideoCard({ title, description, url }) {
  const embed = getYouTubeEmbedUrl(url);

  return (
    <div className="rounded-xl overflow-hidden bg-white border border-bengrey-200">
      <div className="relative w-full bg-black">
        <div style={{ paddingTop: "56.25%" }} />
        {embed ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={embed}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/80 text-sm">
            Invalid YouTube URL
          </div>
        )}
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <span className="mt-1.5 h-4 w-1 rounded-full bg-benorange-500" />
          <div className="min-w-0">
            <h3 className="text-sm sm:text-[15px] font-semibold text-benblack-500">
              {title}
            </h3>
            {description ? (
              <p className="mt-1.5 text-sm text-bengrey-500 leading-relaxed">
                {description}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function EventTile({ event }) {
  const hasMoreInfo = Boolean(event.url);

  return (
    <div className="h-full rounded-2xl bg-white pl-5 pr-4 px-5 py-4">
      <div className="flex gap-6 items-stretch">
        <div className="min-w-0 flex-1 flex flex-col">
          <div className="min-w-0">
            <h3 className="text-[14px] font-semibold text-benblack-500 leading-snug">
              {event.name}
            </h3>

            <div className="mt-2 text-[12px]">
              <div className="font-semibold text-benblack-500">
                {event.dateLabel}
              </div>

              {event.location && (
                <div className="text-bengrey-500">{event.location}</div>
              )}
            </div>
          </div>

          <div className="mt-auto pt-3 -ml-1">
            {hasMoreInfo && (
              <a
                href={event.url}
                target="_blank"
                rel="noreferrer"
                className="
                  inline-flex items-center justify-center
                  h-8 px-4 rounded-md
                  text-xs font-semibold
                  border border-benorange-500
                  text-benorange-500
                  transition-colors
                  hover:border-bencustomorange-500
                  hover:text-bencustomorange-500
                "
              >
                More info
              </a>
            )}
          </div>
        </div>

        <div className="shrink-0">
          <div className="w-32 h-32 rounded-xl overflow-hidden bg-bengrey-100 border border-bengrey-200">
            {event.image ? (
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-bengrey-100 to-bengrey-200" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Pagination({ page, totalPages, onPrev, onNext, onGo }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const prevDisabled = page === 1;
  const nextDisabled = page === totalPages;

  const linkBase =
    "h-10 px-4 rounded-lg inline-flex items-center justify-center " +
    "text-sm font-semibold text-bengrey-500 select-none " +
    "transition-colors duration-150 hover:text-benblack-500";

  const linkDisabled = "opacity-40 pointer-events-none";

  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
      <a
        role="button"
        tabIndex={prevDisabled ? -1 : 0}
        aria-disabled={prevDisabled}
        onClick={(e) => {
          e.preventDefault();
          if (!prevDisabled) onPrev();
        }}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !prevDisabled) onPrev();
        }}
        className={`${linkBase} ${prevDisabled ? linkDisabled : ""}`}
      >
        Prev
      </a>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {pages.map((p) => {
          const isActive = p === page;
          return (
            <button
              key={p}
              type="button"
              onClick={() => onGo(p)}
              className={
                isActive
                  ? "h-10 w-10 rounded-lg bg-benorange-500 text-white text-sm font-bold transition-colors duration-150"
                  : "h-10 w-10 rounded-lg bg-white text-sm font-semibold text-bengrey-500 border border-bengrey-200 transition-colors duration-150 hover:border-bengrey-300 hover:text-benblack-500"
              }
            >
              {p}
            </button>
          );
        })}
      </div>

      <a
        role="button"
        tabIndex={nextDisabled ? -1 : 0}
        aria-disabled={nextDisabled}
        onClick={(e) => {
          e.preventDefault();
          if (!nextDisabled) onNext();
        }}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !nextDisabled) onNext();
        }}
        className={`${linkBase} ${nextDisabled ? linkDisabled : ""}`}
      >
        Next
      </a>
    </div>
  );
}

function RequiredLabel({ children, className = "" }) {
  return (
    <label
      className={`text-sm font-semibold text-white/90 mb-2 inline-flex items-center gap-1 ${className}`}
    >
      <span>{children}</span>
      <span className="text-red-400" aria-hidden="true">
        *
      </span>
    </label>
  );
}

export default function Opportunities({ events, eventDeals }) {
  const hasEvents = Array.isArray(events) && events.length > 0;

  const videos = [
    {
      title: "Blockchain Madness",
      description: "Competition overview.",
      url: "https://www.youtube.com/watch?v=X55t_B00bRk",
    },
    {
      title: "How it works",
      description: "Format and expectations.",
      url: "https://www.youtube.com/watch?v=Lvs78FukfpI",
    },
    {
      title: "Tips & strategy",
      description: "What to focus on to win.",
      url: "https://www.youtube.com/watch?v=dSrwr2oj910",
    },
    {
      title: "Live session",
      description: "Live updates and highlights.",
      url: "https://www.youtube.com/live/mSOZ-3CCSeM",
    },
  ];

  const PAGE_SIZE = 6;
  const [page, setPage] = useState(1);

  const totalPages = useMemo(() => {
    const count = Array.isArray(events) ? events.length : 0;
    return Math.max(1, Math.ceil(count / PAGE_SIZE));
  }, [events]);

  const pageEvents = useMemo(() => {
    if (!Array.isArray(events)) return [];
    const start = (page - 1) * PAGE_SIZE;
    return events.slice(start, start + PAGE_SIZE);
  }, [events, page]);

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  const goTo = (p) => {
    const next = Math.min(Math.max(1, p), totalPages);
    setPage(next);
  };

  const onPrev = () => goTo(page - 1);
  const onNext = () => goTo(page + 1);

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Opportunities for Student Builders</title>
      </Head>

      <HeaderWithLogoDark />

      <section className="pt-16 pb-10">
        <SectionShell>
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-benblack-500">
              Opportunities{" "}
              <span className="text-benorange-500">for Student Builders</span>
            </h1>
            <p className="mt-3 text-base sm:text-lg text-bengrey-500">
              Conferences, hackathons and scholarships worldwide.
            </p>
          </div>
        </SectionShell>
      </section>

      <section className="py-10 bg-white">
        <SectionShell>
          <div className="text-center mb-6">
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-benblack-500">
              Blockchain Madness Competition
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {videos.map((v) => (
              <VideoCard
                key={v.url}
                title={v.title}
                description={v.description}
                url={v.url}
              />
            ))}
          </div>
        </SectionShell>
      </section>

      <section className="py-14 bg-[#F6F6EF]">
        <SectionShell max="max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-benblack-500">
              Upcoming events
            </h2>

            <p className="mt-2 text-sm text-bengrey-500">
              Showing {Math.min(PAGE_SIZE, pageEvents.length)} of{" "}
              {events?.length ?? 0} events
            </p>
          </div>

          {!hasEvents ? (
            <div className="text-center bg-white p-6 rounded-2xl">
              <p className="font-semibold text-bengrey-500">
                No upcoming events found
              </p>
            </div>
          ) : (
            <>
              <div
                className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-fr`}
              >
                {pageEvents.map((event) => (
                  <EventTile key={event.id} event={event} />
                ))}
              </div>

              <Pagination
                page={page}
                totalPages={totalPages}
                onPrev={onPrev}
                onNext={onNext}
                onGo={goTo}
              />
            </>
          )}
        </SectionShell>
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
                <RequiredLabel>Full name</RequiredLabel>
                <input
                  type="text"
                  name="fullName"
                  required
                  aria-required="true"
                  className="w-full bg-white rounded-xl px-3 py-3 text-benblack-600 focus:outline-none focus:ring-2 focus:ring-white/70"
                />
              </div>

              <div>
                <RequiredLabel>Email</RequiredLabel>
                <input
                  type="email"
                  name="email"
                  required
                  aria-required="true"
                  className="w-full bg-white rounded-xl px-3 py-3 text-benblack-600 focus:outline-none focus:ring-2 focus:ring-white/70"
                />
              </div>
            </div>

            <div>
              <RequiredLabel>Telegram username</RequiredLabel>
              <input
                type="text"
                name="telegram"
                required
                aria-required="true"
                placeholder="@username"
                className="w-full bg-white rounded-xl px-3 py-3 text-benblack-600 focus:outline-none focus:ring-2 focus:ring-white/70"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <RequiredLabel>University / School</RequiredLabel>
                <input
                  type="text"
                  name="university"
                  required
                  aria-required="true"
                  className="w-full bg-white rounded-xl px-3 py-3 text-benblack-600 focus:outline-none focus:ring-2 focus:ring-white/70"
                />
              </div>

              <div>
                <RequiredLabel>Country</RequiredLabel>
                <input
                  type="text"
                  name="country"
                  required
                  aria-required="true"
                  className="w-full bg-white rounded-xl px-3 py-3 text-benblack-600 focus:outline-none focus:ring-2 focus:ring-white/70"
                />
              </div>
            </div>

            <div className="grid grid-cols-1">
              <div>
                <RequiredLabel>GPA</RequiredLabel>
                <input
                  type="number"
                  name="gpa"
                  required
                  aria-required="true"
                  min="0"
                  step="0.01"
                  placeholder="e.g. 3.8"
                  className="w-full bg-white rounded-xl px-3 py-3 text-benblack-600 focus:outline-none focus:ring-2 focus:ring-white/70"
                />
              </div>
            </div>

            <div>
              <RequiredLabel>LinkedIn profile</RequiredLabel>
              <input
                type="url"
                name="linkedin"
                required
                aria-required="true"
                className="w-full bg-white rounded-xl px-3 py-3 text-benblack-600 focus:outline-none focus:ring-2 focus:ring-white/70"
              />
            </div>

            <div>
              <RequiredLabel>GitHub or project link</RequiredLabel>
              <input
                type="url"
                name="projectLink"
                required
                aria-required="true"
                className="w-full bg-white rounded-xl px-3 py-3 text-benblack-600 focus:outline-none focus:ring-2 focus:ring-white/70"
              />
            </div>

            <div>
              <RequiredLabel>
                What are you building or what do you want to build?
              </RequiredLabel>
              <textarea
                name="whatBuilding"
                required
                aria-required="true"
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
                  required
                  aria-required="true"
                  className="mt-1 h-4 w-4"
                />
                <label htmlFor="founderPipeline" className="text-sm text-white">
                  I want to join the BEN founder pipeline{" "}
                  <span className="text-red-400" aria-hidden="true">
                    *
                  </span>
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
  buildTitleToId(board?.columns ?? []);

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
