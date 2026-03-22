import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "../../components/header";
import Footer from "../../components/footer";


// ── Casa Datcha property data ──
const PROPERTY = {
  name: "Casa Datcha",
  subtitle: "Private Villa in Sant Agnes de Corona",
  location: "Sant Agnes de Corona, Ibiza, Spain",
  license: "VTV-02167-EIF",
  capacity: 28,
  bedrooms: 14,
  bathrooms: 9,
  guestRestrooms: 5,
  description:
    "An exclusive private villa in the hills of Sant Agnes de Corona, designed for retreats, celebrations, and builder residencies. Accommodates up to 28 guests across 14 bedrooms with stylish suites, infinity pool, spa, and serene countryside minutes from Ibiza's best beaches.",
  email: "info@casadatscha.com",
  phone: "+34 672 11 68 79",
};

const FEATURES = [
  {
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    title: "14 Bedrooms, 9 Bathrooms",
    desc: "Including a penthouse and 8 private suites. Family suites and apartments with private kitchens and terraces.",
  },
  {
    icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
    title: "Infinity Pool & Spa",
    desc: "Outdoor infinity pool with sunset sea views, plus a full spa with sauna and hammam.",
  },
  {
    icon: "M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A1.75 1.75 0 003 16.546m18-3c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A1.75 1.75 0 003 13.546M21 10.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A1.75 1.75 0 003 10.546",
    title: "Best Beaches Nearby",
    desc: "3-7 min drive to Cala Gracioneta, Cala Salada, and Punta Galera.",
  },
  {
    icon: "M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7",
    title: "Full Service",
    desc: "On-site chef, housekeeping, and concierge. Multiple terraces and select units with private kitchens.",
  },
  {
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
    title: "Builder Community",
    desc: "Curated cohort of founders, engineers, and operators shipping real products. Not a vacation.",
  },
  {
    icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
    title: "Iconic Neighbors",
    desc: "Minutes from Sa Capella restaurant, Pikes Hotel, and Hostal La Torre. The creative heart of Ibiza.",
  },
];

const NEARBY = [
  { name: "Cala Gracioneta", time: "3 min", type: "Beach" },
  { name: "Cala Salada", time: "5 min", type: "Beach" },
  { name: "Punta Galera", time: "7 min", type: "Beach" },
  { name: "Sa Capella", time: "4 min", type: "Restaurant" },
  { name: "Pikes Hotel", time: "5 min", type: "Hotel & Bar" },
  { name: "Hostal La Torre", time: "6 min", type: "Sunset Bar" },
];

const SCHEDULE = [
  { time: "07:00 - 09:00", activity: "Sunrise yoga / gym / beach", type: "wellness" },
  { time: "09:00 - 09:30", activity: "Breakfast together", type: "social" },
  { time: "09:30 - 13:00", activity: "Deep work block", type: "work" },
  { time: "13:00 - 14:00", activity: "Lunch + lightning talks", type: "social" },
  { time: "14:00 - 18:00", activity: "Build sprint / 1-on-1 mentoring", type: "work" },
  { time: "18:00 - 19:30", activity: "Pool / beach / free time", type: "wellness" },
  { time: "19:30 - 21:00", activity: "Dinner + fireside chat", type: "social" },
  { time: "21:00+", activity: "Optional hackathon / chill", type: "work" },
];

const TYPE_COLORS = { work: "#FF872A", social: "#3b82f6", wellness: "#10b981" };

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// ── Booking Calendar Component ──
function BookingCalendar() {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });
  const [availability, setAvailability] = useState({});
  const [loading, setLoading] = useState(false);
  const [checkin, setCheckin] = useState(null);
  const [checkout, setCheckout] = useState(null);
  const [guests, setGuests] = useState(2);
  const [email, setEmail] = useState("");
  const [bookingError, setBookingError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const monthKey = `${currentMonth.year}-${String(currentMonth.month + 1).padStart(2, "0")}`;

  const fetchAvailability = useCallback(async (key) => {
    if (availability[key]) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/coliving/availability?month=${key}`);
      const data = await res.json();
      setAvailability((prev) => ({ ...prev, [key]: data }));
    } catch (err) {
      console.error("Failed to load availability:", err);
    } finally {
      setLoading(false);
    }
  }, [availability]);

  useEffect(() => {
    fetchAvailability(monthKey);
  }, [monthKey, fetchAvailability]);

  const prevMonth = () => {
    const now = new Date();
    if (currentMonth.year === now.getFullYear() && currentMonth.month === now.getMonth()) return;
    setCurrentMonth((prev) => {
      const m = prev.month - 1;
      return m < 0 ? { year: prev.year - 1, month: 11 } : { year: prev.year, month: m };
    });
  };

  const nextMonth = () => {
    setCurrentMonth((prev) => {
      const m = prev.month + 1;
      return m > 11 ? { year: prev.year + 1, month: 0 } : { year: prev.year, month: m };
    });
  };

  const handleDateClick = (dateStr, isAvailable) => {
    if (!isAvailable) return;
    if (!checkin || (checkin && checkout)) {
      setCheckin(dateStr);
      setCheckout(null);
      setBookingError(null);
    } else {
      if (dateStr <= checkin) {
        setCheckin(dateStr);
        setCheckout(null);
      } else {
        // Verify all dates in range are available
        const monthData = availability[monthKey];
        if (monthData) {
          const start = new Date(checkin);
          const end = new Date(dateStr);
          const cursor = new Date(start);
          while (cursor <= end) {
            const dStr = cursor.toISOString().split("T")[0];
            const dayInfo = monthData.days?.find((d) => d.date === dStr);
            if (dayInfo && !dayInfo.available) {
              setBookingError("Some dates in your range are unavailable. Please select different dates.");
              return;
            }
            cursor.setDate(cursor.getDate() + 1);
          }
        }
        setCheckout(dateStr);
        setBookingError(null);
      }
    }
  };

  // Calculate price across all loaded months
  const calculateTotal = () => {
    if (!checkin || !checkout) return null;

    // Collect all days from all loaded months
    const allDays = {};
    for (const key of Object.keys(availability)) {
      const m = availability[key];
      if (m?.days) {
        for (const d of m.days) {
          allDays[d.date] = d;
        }
      }
    }

    let total = 0;
    let nights = 0;
    const cursor = new Date(checkin + "T00:00:00");
    const end = new Date(checkout + "T00:00:00");
    while (cursor < end) {
      const dStr = cursor.toISOString().split("T")[0];
      const dayInfo = allDays[dStr];
      total += dayInfo ? dayInfo.price : 2000;
      nights++;
      cursor.setDate(cursor.getDate() + 1);
    }

    const cleaning = availability[monthKey]?.cleaningFee || 550;
    return { nights, subtotal: total, cleaning, total: total + cleaning };
  };

  const handleBook = async () => {
    if (!checkin || !checkout || !email) {
      setBookingError("Please select dates and enter your email.");
      return;
    }
    const price = calculateTotal();
    if (price && price.nights < 3) {
      setBookingError("Minimum 3 nights required.");
      return;
    }

    setSubmitting(true);
    setBookingError(null);
    try {
      const res = await fetch("/api/checkout/coliving", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checkin, checkout, guests, email }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setBookingError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setBookingError("Connection error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Build calendar grid
  const firstDay = new Date(currentMonth.year, currentMonth.month, 1).getDay();
  const daysInMonth = new Date(currentMonth.year, currentMonth.month + 1, 0).getDate();
  const today = new Date().toISOString().split("T")[0];
  const monthData = availability[monthKey];

  const price = calculateTotal();

  return (
    <div>
      {/* Calendar header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          className="p-2 rounded-lg transition"
          style={{ backgroundColor: "rgba(0,0,0,0.04)" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.08)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.04)")}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h3 className="font-mont font-bold" style={{ fontSize: 18, color: "#1d1d1f" }}>
          {MONTH_NAMES[currentMonth.month]} {currentMonth.year}
        </h3>
        <button
          onClick={nextMonth}
          className="p-2 rounded-lg transition"
          style={{ backgroundColor: "rgba(0,0,0,0.04)" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.08)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.04)")}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAY_LABELS.map((d) => (
          <div
            key={d}
            className="text-center font-inter font-medium"
            style={{ fontSize: 11, color: "#86868b", padding: "4px 0" }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for first week offset */}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = `${currentMonth.year}-${String(currentMonth.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const dayInfo = monthData?.days?.find((d) => d.date === dateStr);
          const isAvailable = dayInfo ? dayInfo.available : false;
          const isPast = dateStr < today;
          const isDisabled = isPast || !isAvailable;
          const isCheckin = checkin === dateStr;
          const isCheckout = checkout === dateStr;
          const isInRange = checkin && checkout && dateStr > checkin && dateStr < checkout;

          let bgColor = "transparent";
          let textColor = "#1d1d1f";
          let borderColor = "transparent";

          if (isCheckin || isCheckout) {
            bgColor = "#FF872A";
            textColor = "#fff";
          } else if (isInRange) {
            bgColor = "rgba(255,135,42,0.1)";
            textColor = "#FF872A";
          } else if (isDisabled) {
            textColor = "#d1d1d6";
          }

          return (
            <button
              key={dateStr}
              disabled={isDisabled}
              onClick={() => handleDateClick(dateStr, !isDisabled)}
              className="relative rounded-lg transition-all font-inter"
              style={{
                padding: "8px 4px",
                fontSize: 14,
                fontWeight: isCheckin || isCheckout ? 700 : 500,
                backgroundColor: bgColor,
                color: textColor,
                cursor: isDisabled ? "default" : "pointer",
                textDecoration: isPast ? "line-through" : "none",
              }}
              onMouseEnter={(e) => {
                if (!isDisabled && !isCheckin && !isCheckout) {
                  e.currentTarget.style.backgroundColor = "rgba(255,135,42,0.08)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isDisabled && !isCheckin && !isCheckout && !isInRange) {
                  e.currentTarget.style.backgroundColor = "transparent";
                } else if (isInRange) {
                  e.currentTarget.style.backgroundColor = "rgba(255,135,42,0.1)";
                }
              }}
            >
              {day}
              {dayInfo && !isPast && (
                <div
                  className="mx-auto mt-0.5"
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: isAvailable ? "#10b981" : "#ef4444",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Loading overlay */}
      {loading && (
        <div className="text-center py-4">
          <span className="font-inter" style={{ fontSize: 13, color: "#86868b" }}>
            Loading availability...
          </span>
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 mb-6">
        <div className="flex items-center gap-1.5">
          <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#10b981" }} />
          <span className="font-inter" style={{ fontSize: 11, color: "#86868b" }}>Available</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#ef4444" }} />
          <span className="font-inter" style={{ fontSize: 11, color: "#86868b" }}>Booked</span>
        </div>
        <div className="flex items-center gap-1.5 ml-auto">
          <svg className="h-3 w-3" style={{ color: "#86868b" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span className="font-inter" style={{ fontSize: 10, color: "#c7c7cc" }}>Synced with Airbnb</span>
        </div>
      </div>

      {/* Pricing info */}
      <div
        className="rounded-xl p-4 mb-6"
        style={{ backgroundColor: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.04)" }}
      >
        <p className="font-inter font-semibold mb-2" style={{ fontSize: 13, color: "#1d1d1f" }}>
          Seasonal pricing (whole villa, per night)
        </p>
        <div className="space-y-1">
          <div className="flex justify-between font-inter" style={{ fontSize: 13, color: "#6e6e73" }}>
            <span>Peak (Jun 15 - Sep 15)</span>
            <span className="font-semibold" style={{ color: "#1d1d1f" }}>$2,800</span>
          </div>
          <div className="flex justify-between font-inter" style={{ fontSize: 13, color: "#6e6e73" }}>
            <span>High (May, Oct)</span>
            <span className="font-semibold" style={{ color: "#1d1d1f" }}>$2,000</span>
          </div>
          <div className="flex justify-between font-inter" style={{ fontSize: 13, color: "#6e6e73" }}>
            <span>Low (Nov - Apr)</span>
            <span className="font-semibold" style={{ color: "#1d1d1f" }}>$1,400</span>
          </div>
          <div className="flex justify-between font-inter pt-1" style={{ fontSize: 13, color: "#6e6e73", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
            <span>Cleaning fee</span>
            <span className="font-semibold" style={{ color: "#1d1d1f" }}>$550</span>
          </div>
        </div>
        <p className="font-inter mt-2" style={{ fontSize: 11, color: "#c7c7cc" }}>
          Minimum 3 nights. Up to 28 guests. Check-in 15:00, check-out 11:00.
        </p>
      </div>

      {/* Booking form */}
      {checkin && (
        <div
          className="rounded-xl p-5"
          style={{ backgroundColor: "#fff", border: "1px solid rgba(0,0,0,0.08)" }}
        >
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="block font-inter font-medium mb-1" style={{ fontSize: 12, color: "#86868b" }}>
                CHECK-IN
              </label>
              <p className="font-inter font-semibold" style={{ fontSize: 15, color: "#1d1d1f" }}>
                {checkin}
              </p>
            </div>
            <div className="flex-1">
              <label className="block font-inter font-medium mb-1" style={{ fontSize: 12, color: "#86868b" }}>
                CHECK-OUT
              </label>
              <p className="font-inter font-semibold" style={{ fontSize: 15, color: checkout ? "#1d1d1f" : "#c7c7cc" }}>
                {checkout || "Select date"}
              </p>
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="block font-inter font-medium mb-1" style={{ fontSize: 12, color: "#86868b" }}>
                GUESTS
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full font-inter rounded-lg p-2.5 appearance-none"
                style={{ fontSize: 14, backgroundColor: "#fafafa", border: "1px solid rgba(0,0,0,0.08)" }}
              >
                {Array.from({ length: 28 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>{n} guest{n > 1 ? "s" : ""}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block font-inter font-medium mb-1" style={{ fontSize: 12, color: "#86868b" }}>
                EMAIL
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full font-inter rounded-lg p-2.5"
                style={{ fontSize: 14, backgroundColor: "#fafafa", border: "1px solid rgba(0,0,0,0.08)" }}
              />
            </div>
          </div>

          {/* Price breakdown */}
          {price && (
            <div className="mb-4 pt-4" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
              <div className="flex justify-between font-inter mb-1" style={{ fontSize: 14, color: "#6e6e73" }}>
                <span>{price.nights} night{price.nights > 1 ? "s" : ""}</span>
                <span>${price.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-inter mb-2" style={{ fontSize: 14, color: "#6e6e73" }}>
                <span>Cleaning fee</span>
                <span>${price.cleaning.toLocaleString()}</span>
              </div>
              <div
                className="flex justify-between font-inter font-bold pt-2"
                style={{ fontSize: 16, color: "#1d1d1f", borderTop: "1px solid rgba(0,0,0,0.06)" }}
              >
                <span>Total</span>
                <span>${price.total.toLocaleString()}</span>
              </div>
            </div>
          )}

          {bookingError && (
            <p className="font-inter mb-3" style={{ fontSize: 13, color: "#ef4444" }}>
              {bookingError}
            </p>
          )}

          <button
            onClick={handleBook}
            disabled={!checkout || !email || submitting}
            className="w-full font-mont font-bold text-white rounded-xl py-3.5 transition"
            style={{
              fontSize: 15,
              backgroundColor: !checkout || !email || submitting ? "#d1d1d6" : "#FF872A",
              cursor: !checkout || !email || submitting ? "not-allowed" : "pointer",
            }}
            onMouseEnter={(e) => {
              if (checkout && email && !submitting) e.currentTarget.style.backgroundColor = "#e5771f";
            }}
            onMouseLeave={(e) => {
              if (checkout && email && !submitting) e.currentTarget.style.backgroundColor = "#FF872A";
            }}
          >
            {submitting ? "Redirecting to payment..." : "Book & Pay"}
          </button>
        </div>
      )}
    </div>
  );
}

// ── Main Page ──
const ROOMS = [
  { src: "/images/hackerhouses/ibiza/airbnb-room1.jpeg", label: "Master Suite" },
  { src: "/images/hackerhouses/ibiza/airbnb-exterior.jpeg", label: "Bohemian Suite" },
  { src: "/images/hackerhouses/ibiza/quarto.png", label: "Terrace Room" },
  { src: "/images/hackerhouses/ibiza/quartodois.png", label: "Garden Room" },
  { src: "/images/hackerhouses/ibiza/quartoum.png", label: "Sea Breeze Suite" },
  { src: "/images/hackerhouses/ibiza/quartovista.png", label: "Sunset Studio" },
];

export default function IbizaColiving() {
  const router = useRouter();
  const booked = router.query.booked === "true";
  const [lightbox, setLightbox] = useState(null); // index into ROOMS

  // Keyboard nav for lightbox
  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i + 1) % ROOMS.length);
      if (e.key === "ArrowLeft") setLightbox((i) => (i - 1 + ROOMS.length) % ROOMS.length);
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <div className="overflow-hidden">
      <Header />
      <Head>
        <title>Casa Datcha Ibiza — Builder Co-Living | BEN</title>
        <meta
          name="description"
          content="Casa Datcha, Sant Agnes de Corona, Ibiza. 14-bedroom villa with infinity pool, spa, sauna, and hammam. Book for retreats and builder residencies."
        />
        <link rel="canonical" href="https://www.blockchainedu.org/coliving/ibiza" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.blockchainedu.org/coliving/ibiza" />
        <meta property="og:title" content="Casa Datcha Ibiza — Builder Co-Living | BEN" />
        <meta property="og:description" content="14-bedroom villa in Ibiza's countryside. Infinity pool, spa, full service. Book your stay." />
        <meta property="og:image" content="https://www.blockchainedu.org/images/light-2-logo.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* Booking confirmation banner */}
      {booked && (
        <div
          className="text-center py-4 px-6 font-inter font-medium"
          style={{ backgroundColor: "#10b981", color: "#fff", fontSize: 15 }}
        >
          Booking confirmed! Check your email for details.
        </div>
      )}

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

        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 pt-20 sm:pt-28 pb-16 sm:pb-20">
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
            {PROPERTY.bedrooms} bedrooms &middot; Up to {PROPERTY.capacity} guests
          </div>

          <h1
            className="font-mont font-black"
            style={{
              fontSize: "clamp(36px, 6vw, 64px)",
              lineHeight: 1.05,
              color: "#fff",
              letterSpacing: "-0.04em",
              maxWidth: 700,
            }}
          >
            Casa{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #FF872A, #ffb347)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Datcha
            </span>
          </h1>

          <p
            className="font-inter mt-2 font-medium"
            style={{ fontSize: 16, color: "rgba(255,255,255,0.35)", letterSpacing: "0.02em" }}
          >
            {PROPERTY.location}
          </p>

          <p
            className="font-inter mt-4"
            style={{
              fontSize: "clamp(16px, 2vw, 19px)",
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.45)",
              maxWidth: 540,
              letterSpacing: "-0.01em",
            }}
          >
            {PROPERTY.description}
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <button
              onClick={() => document.getElementById("booking").scrollIntoView({ behavior: "smooth" })}
              className="font-mont font-bold text-white rounded-full transition"
              style={{ padding: "14px 32px", fontSize: 15, backgroundColor: "#FF872A" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e5771f")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FF872A")}
            >
              Book Now
            </button>
            <button
              onClick={() => document.getElementById("gallery").scrollIntoView({ behavior: "smooth" })}
              className="font-mont font-bold rounded-full transition"
              style={{
                padding: "14px 32px",
                fontSize: 15,
                color: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.15)",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                e.currentTarget.style.color = "rgba(255,255,255,0.6)";
              }}
            >
              See the Villa
            </button>
            <button
              onClick={() => router.push("/coliving/apply?location=ibiza")}
              className="font-mont font-bold rounded-full transition"
              style={{
                padding: "14px 32px",
                fontSize: 15,
                color: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.15)",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                e.currentTarget.style.color = "rgba(255,255,255,0.6)";
              }}
            >
              Apply for Residency
            </button>
          </div>

          <div className="mt-10 flex items-center gap-3" style={{ color: "rgba(255,255,255,0.15)" }}>
            <div style={{ width: 1, height: 32, backgroundColor: "rgba(255,255,255,0.1)" }} />
            <span
              className="font-inter"
              style={{ fontSize: 11, letterSpacing: "0.04em", textTransform: "uppercase" }}
            >
              Scroll to explore
            </span>
          </div>
        </div>
      </div>

      {/* ── Full-bleed Video ── */}
      <section className="relative" style={{ backgroundColor: "#000" }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full"
          style={{
            display: "block",
            maxHeight: "85vh",
            objectFit: "cover",
          }}
        >
          <source src="/videos/ibiza-final.mp4" type="video/mp4" />
        </video>
        {/* Subtle top/bottom fade to black for seamless transitions */}
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{ height: 80, background: "linear-gradient(to bottom, #000, transparent)" }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{ height: 80, background: "linear-gradient(to top, #000, transparent)" }}
        />
      </section>

      {/* ── Full-bleed: Pool ── */}
      <section id="gallery" className="relative" style={{ backgroundColor: "#000" }}>
        <img
          src="/images/hackerhouses/ibiza/piscina.png"
          alt="Infinity pool overlooking the Ibiza countryside"
          className="w-full"
          style={{ display: "block", height: "75vh", objectFit: "cover", minHeight: 400 }}
        />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.4) 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 px-7 pb-10 sm:pb-14">
          <div className="max-w-5xl mx-auto">
            <p className="font-inter font-medium uppercase mb-3" style={{ fontSize: 11, letterSpacing: "0.08em", color: "rgba(255,255,255,0.5)" }}>
              Your private retreat
            </p>
            <div className="flex flex-wrap gap-8 sm:gap-12">
              {[
                { value: "14", label: "Bedrooms" },
                { value: "28", label: "Max Guests" },
                { value: "9+5", label: "Bathrooms" },
                { value: "5.0", label: "Airbnb Rating" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-mont font-black" style={{ fontSize: 36, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1 }}>
                    {stat.value}
                  </p>
                  <p className="font-inter font-medium mt-1" style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── The Villa: Split Left ── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
          <div className="lg:w-1/2 flex items-center px-7 sm:px-12 lg:px-16 py-16 lg:py-24">
            <div style={{ maxWidth: 480 }}>
              <p className="font-inter font-medium uppercase mb-4" style={{ fontSize: 11, letterSpacing: "0.08em", color: "#FF872A" }}>
                The Villa
              </p>
              <h2 className="font-mont font-black mb-6" style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#1d1d1f", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                Everything you need
              </h2>
              <div className="space-y-5">
                {FEATURES.slice(0, 3).map((f) => (
                  <div key={f.title} className="flex gap-4">
                    <div className="flex items-center justify-center rounded-xl flex-shrink-0" style={{ width: 44, height: 44, backgroundColor: "rgba(255,135,42,0.08)" }}>
                      <svg className="h-5 w-5" style={{ color: "#FF872A" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d={f.icon} />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-mont font-bold mb-1" style={{ fontSize: 15, color: "#1d1d1f" }}>{f.title}</h3>
                      <p className="font-inter" style={{ fontSize: 14, lineHeight: 1.55, color: "#86868b" }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <img
              src="/images/hackerhouses/ibiza/airbnb-exterior.jpeg"
              alt="Casa Datcha exterior"
              className="w-full h-full"
              style={{ objectFit: "cover", minHeight: 400 }}
            />
          </div>
        </div>
      </section>

      {/* ── The Experience: Split Right ── */}
      <section style={{ backgroundColor: "#fafafa" }}>
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row">
          <div className="lg:w-1/2">
            <img
              src="/images/hackerhouses/ibiza/salaexterior.png"
              alt="Outdoor living and terrace"
              className="w-full h-full"
              style={{ objectFit: "cover", minHeight: 400 }}
            />
          </div>
          <div className="lg:w-1/2 flex items-center px-7 sm:px-12 lg:px-16 py-16 lg:py-24">
            <div style={{ maxWidth: 480 }}>
              <p className="font-inter font-medium uppercase mb-4" style={{ fontSize: 11, letterSpacing: "0.08em", color: "#FF872A" }}>
                The Experience
              </p>
              <h2 className="font-mont font-black mb-6" style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#1d1d1f", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                Built for builders
              </h2>
              <div className="space-y-5">
                {FEATURES.slice(3).map((f) => (
                  <div key={f.title} className="flex gap-4">
                    <div className="flex items-center justify-center rounded-xl flex-shrink-0" style={{ width: 44, height: 44, backgroundColor: "rgba(255,135,42,0.08)" }}>
                      <svg className="h-5 w-5" style={{ color: "#FF872A" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d={f.icon} />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-mont font-bold mb-1" style={{ fontSize: 15, color: "#1d1d1f" }}>{f.title}</h3>
                      <p className="font-inter" style={{ fontSize: 14, lineHeight: 1.55, color: "#86868b" }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Full-bleed: Beach ── */}
      <section className="relative" style={{ backgroundColor: "#000" }}>
        <img
          src="/images/hackerhouses/ibiza/datcha-beach-salada.jpg"
          alt="Cala Salada beach near Casa Datcha"
          className="w-full"
          style={{ display: "block", height: "60vh", objectFit: "cover", minHeight: 350 }}
        />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.5) 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 px-7 pb-8">
          <div className="max-w-5xl mx-auto">
            <p className="font-mont font-bold" style={{ fontSize: 20, color: "#fff", letterSpacing: "-0.02em" }}>
              Cala Salada
            </p>
            <p className="font-inter" style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>
              5 minutes from the villa
            </p>
          </div>
        </div>
      </section>

      {/* ── Bento Photo Grid ── */}
      <section className="bg-white py-20 px-7">
        <div className="max-w-6xl mx-auto">
          <p className="font-inter font-medium uppercase mb-4 text-center" style={{ fontSize: 11, letterSpacing: "0.08em", color: "#FF872A" }}>
            Gallery
          </p>
          <h2 className="font-mont font-black text-center mb-12" style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#1d1d1f", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Your home in Ibiza
          </h2>
          {/* Row 1: 1 large + 2 stacked */}
          <div className="flex flex-col md:flex-row gap-3 mb-3">
            <div className="md:w-3/5">
              <img
                src="/images/hackerhouses/ibiza/airbnb-hero.jpeg"
                alt="Villa hero view"
                className="w-full rounded-2xl"
                style={{ height: 420, objectFit: "cover" }}
              />
            </div>
            <div className="md:w-2/5 flex flex-col gap-3">
              <img
                src="/images/hackerhouses/ibiza/airbnb-living.jpeg"
                alt="Living area"
                className="w-full rounded-2xl flex-1"
                style={{ objectFit: "cover", minHeight: 200 }}
              />
              <img
                src="/images/hackerhouses/ibiza/datcha-garden.png"
                alt="Interior with fireplace"
                className="w-full rounded-2xl flex-1"
                style={{ objectFit: "cover", minHeight: 200 }}
              />
            </div>
          </div>
          {/* Row 2: 3 equal */}
          <div className="flex flex-col sm:flex-row gap-3 mb-3">
            <div className="sm:w-1/3">
              <img
                src="/images/hackerhouses/ibiza/mesaexterior.png"
                alt="Outdoor dining"
                className="w-full rounded-2xl"
                style={{ height: 260, objectFit: "cover" }}
              />
            </div>
            <div className="sm:w-1/3">
              <img
                src="/images/hackerhouses/ibiza/piscinadois.png"
                alt="Pool terrace"
                className="w-full rounded-2xl"
                style={{ height: 260, objectFit: "cover" }}
              />
            </div>
            <div className="sm:w-1/3">
              <img
                src="/images/hackerhouses/ibiza/tenda.png"
                alt="Outdoor lounge"
                className="w-full rounded-2xl"
                style={{ height: 260, objectFit: "cover" }}
              />
            </div>
          </div>
          {/* Row 3: 2 stacked + 1 large */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="md:w-2/5 flex flex-col gap-3">
              <img
                src="/images/hackerhouses/ibiza/es-vedra-sunset.jpg"
                alt="Es Vedra at sunset, Ibiza"
                className="w-full rounded-2xl flex-1"
                style={{ objectFit: "cover", minHeight: 200 }}
              />
              <img
                src="/images/hackerhouses/ibiza/airbnb-view.jpeg"
                alt="View from the villa"
                className="w-full rounded-2xl flex-1"
                style={{ objectFit: "cover", minHeight: 200 }}
              />
            </div>
            <div className="md:w-3/5">
              <img
                src="/images/hackerhouses/ibiza/quartoum.png"
                alt="Bedroom suite"
                className="w-full rounded-2xl"
                style={{ height: 420, objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Rooms Grid + Lightbox ── */}
      <section style={{ backgroundColor: "#fafafa" }} className="py-20 px-7">
        <div className="max-w-6xl mx-auto">
          <p className="font-inter font-medium uppercase mb-3 text-center" style={{ fontSize: 11, letterSpacing: "0.08em", color: "#FF872A" }}>
            The Rooms
          </p>
          <h2 className="font-mont font-black text-center mb-4" style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#1d1d1f", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            14 bedrooms, each one unique
          </h2>
          <p className="font-inter text-center mb-12" style={{ fontSize: 15, color: "#86868b" }}>
            Tap any room to explore
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ROOMS.map((room, i) => (
              <div
                key={room.label}
                className="cursor-pointer rounded-2xl overflow-hidden transition-all duration-300"
                style={{ border: "1px solid rgba(0,0,0,0.04)" }}
                onClick={() => setLightbox(i)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <img
                  src={room.src}
                  alt={room.label}
                  className="w-full"
                  style={{ height: 280, objectFit: "cover" }}
                />
                <div className="bg-white px-5 py-4">
                  <p className="font-mont font-bold" style={{ fontSize: 15, color: "#1d1d1f" }}>{room.label}</p>
                  <p className="font-inter mt-0.5" style={{ fontSize: 12, color: "#86868b" }}>Tap to view full size</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fullscreen Lightbox ── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{ zIndex: 9999, backgroundColor: "rgba(0,0,0,0.95)" }}
          onClick={() => setLightbox(null)}
        >
          {/* Close button */}
          <button
            className="absolute top-5 right-5 flex items-center justify-center rounded-full"
            style={{ width: 44, height: 44, backgroundColor: "rgba(255,255,255,0.1)", zIndex: 10 }}
            onClick={() => setLightbox(null)}
          >
            <svg className="h-6 w-6" style={{ color: "#fff" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Prev */}
          <button
            className="absolute left-4 sm:left-8 flex items-center justify-center rounded-full"
            style={{ width: 48, height: 48, backgroundColor: "rgba(255,255,255,0.1)", zIndex: 10, top: "50%", transform: "translateY(-50%)" }}
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + ROOMS.length) % ROOMS.length); }}
          >
            <svg className="h-6 w-6" style={{ color: "#fff" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next */}
          <button
            className="absolute right-4 sm:right-8 flex items-center justify-center rounded-full"
            style={{ width: 48, height: 48, backgroundColor: "rgba(255,255,255,0.1)", zIndex: 10, top: "50%", transform: "translateY(-50%)" }}
            onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % ROOMS.length); }}
          >
            <svg className="h-6 w-6" style={{ color: "#fff" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image */}
          <img
            src={ROOMS[lightbox].src}
            alt={ROOMS[lightbox].label}
            className="rounded-xl"
            style={{ maxHeight: "85vh", maxWidth: "90vw", objectFit: "contain" }}
            onClick={(e) => e.stopPropagation()}
          />

          {/* Caption + counter */}
          <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
            <p className="font-mont font-bold" style={{ fontSize: 18, color: "#fff" }}>
              {ROOMS[lightbox].label}
            </p>
            <p className="font-inter mt-1" style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
              {lightbox + 1} / {ROOMS.length}
            </p>
          </div>
        </div>
      )}

      {/* ── Full-bleed: Aerial ── */}
      <section className="relative" style={{ backgroundColor: "#000" }}>
        <img
          src="/images/hackerhouses/ibiza/es-vedra-sunset.jpg"
          alt="Es Vedra at sunset, Ibiza"
          className="w-full"
          style={{ display: "block", height: "55vh", objectFit: "cover", minHeight: 320 }}
        />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.3) 100%)" }} />
      </section>

      {/* ── Nearby ── */}
      <section className="py-16 px-7" style={{ backgroundColor: "#fafafa" }}>
        <div className="max-w-4xl mx-auto">
          <p className="font-inter font-medium uppercase mb-4 text-center" style={{ fontSize: 11, letterSpacing: "0.08em", color: "#FF872A" }}>
            Neighborhood
          </p>
          <h2 className="font-mont font-black text-center mb-10" style={{ fontSize: "clamp(24px, 3vw, 36px)", color: "#1d1d1f", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Minutes from Ibiza's best spots
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {NEARBY.map((place) => (
              <div
                key={place.name}
                className="flex items-center gap-4 rounded-xl p-4"
                style={{ backgroundColor: "#fff", border: "1px solid rgba(0,0,0,0.04)" }}
              >
                <div
                  className="flex items-center justify-center rounded-lg flex-shrink-0"
                  style={{ width: 40, height: 40, backgroundColor: "rgba(255,135,42,0.08)" }}
                >
                  <svg className="h-5 w-5" style={{ color: "#FF872A" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-inter font-semibold" style={{ fontSize: 14, color: "#1d1d1f" }}>{place.name}</p>
                  <p className="font-inter" style={{ fontSize: 12, color: "#86868b" }}>{place.type} &middot; {place.time} drive</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Booking Calendar ── */}
      <section id="booking" className="bg-white py-20 px-7">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1">
              <p className="font-inter font-medium uppercase mb-4" style={{ fontSize: 11, letterSpacing: "0.08em", color: "#FF872A" }}>
                Book Your Stay
              </p>
              <h2 className="font-mont font-black mb-4" style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#1d1d1f", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                Check availability
              </h2>
              <p className="font-inter mb-8" style={{ fontSize: 15, lineHeight: 1.6, color: "#6e6e73" }}>
                Availability syncs with Airbnb every 2 hours so you always see real-time dates.
                Select your check-in and check-out dates, then pay securely via Stripe.
              </p>

              <div className="rounded-2xl p-6" style={{ backgroundColor: "#fafafa", border: "1px solid rgba(0,0,0,0.06)" }}>
                <BookingCalendar />
              </div>
            </div>

            {/* Sidebar info */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="rounded-2xl p-6 mb-6" style={{ backgroundColor: "#fafafa", border: "1px solid rgba(0,0,0,0.06)" }}>
                <h3 className="font-mont font-bold mb-4" style={{ fontSize: 16, color: "#1d1d1f" }}>
                  House Rules
                </h3>
                <ul className="space-y-2 font-inter" style={{ fontSize: 14, color: "#6e6e73" }}>
                  <li>Check-in: 15:00</li>
                  <li>Check-out: 11:00</li>
                  <li>Minimum stay: 3 nights</li>
                  <li>Maximum guests: 28</li>
                  <li>No smoking indoors</li>
                  <li>Events allowed with prior notice</li>
                </ul>
              </div>

              <div className="rounded-2xl p-6 mb-6" style={{ backgroundColor: "#fafafa", border: "1px solid rgba(0,0,0,0.06)" }}>
                <h3 className="font-mont font-bold mb-4" style={{ fontSize: 16, color: "#1d1d1f" }}>
                  Contact
                </h3>
                <div className="space-y-2 font-inter" style={{ fontSize: 14, color: "#6e6e73" }}>
                  <p>
                    <a href="mailto:info@casadatscha.com" style={{ color: "#FF872A" }}>
                      {PROPERTY.email}
                    </a>
                  </p>
                  <p>{PROPERTY.phone}</p>
                  <p style={{ fontSize: 12, color: "#c7c7cc", marginTop: 8 }}>
                    License: {PROPERTY.license}
                  </p>
                </div>
              </div>

              <div
                className="rounded-2xl p-6"
                style={{ backgroundColor: "rgba(255,135,42,0.04)", border: "1px solid rgba(255,135,42,0.15)" }}
              >
                <h3 className="font-mont font-bold mb-2" style={{ fontSize: 16, color: "#1d1d1f" }}>
                  Builder Residency
                </h3>
                <p className="font-inter mb-3" style={{ fontSize: 14, lineHeight: 1.5, color: "#6e6e73" }}>
                  Interested in a curated cohort experience instead of a private booking?
                </p>
                <span
                  className="font-inter font-semibold cursor-pointer inline-flex items-center gap-1"
                  style={{ fontSize: 14, color: "#FF872A" }}
                  onClick={() => router.push("/coliving/apply?location=ibiza")}
                >
                  Apply for residency
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Typical Day ── */}
      <section className="py-20 px-7" style={{ backgroundColor: "#fafafa" }}>
        <div className="max-w-3xl mx-auto">
          <p className="font-inter font-medium uppercase mb-4 text-center" style={{ fontSize: 11, letterSpacing: "0.08em", color: "#FF872A" }}>
            A Typical Day
          </p>
          <h2 className="font-mont font-black text-center mb-12" style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#1d1d1f", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Structured for deep work
          </h2>
          <div className="space-y-3">
            {SCHEDULE.map((s) => (
              <div
                key={s.time}
                className="flex items-center gap-4 rounded-xl p-4"
                style={{ backgroundColor: "#fff", border: "1px solid rgba(0,0,0,0.04)" }}
              >
                <span className="font-inter font-semibold flex-shrink-0" style={{ fontSize: 13, color: "#86868b", width: 120, letterSpacing: "-0.01em" }}>
                  {s.time}
                </span>
                <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: TYPE_COLORS[s.type], flexShrink: 0 }} />
                <span className="font-inter font-medium" style={{ fontSize: 15, color: "#1d1d1f", letterSpacing: "-0.01em" }}>
                  {s.activity}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-6 mt-6">
            {Object.entries(TYPE_COLORS).map(([type, color]) => (
              <div key={type} className="flex items-center gap-2">
                <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: color }} />
                <span className="font-inter capitalize" style={{ fontSize: 12, color: "#86868b" }}>{type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="relative overflow-hidden py-20 px-7"
        style={{ background: "linear-gradient(135deg, #000 0%, #0a0a0a 50%, #111 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.07, background: "radial-gradient(ellipse 60% 50% at 50% 50%, #FF872A, transparent)" }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="font-mont font-black mb-4" style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Ready to build from paradise?
          </h2>
          <p className="font-inter mb-8" style={{ fontSize: 17, lineHeight: 1.6, color: "rgba(255,255,255,0.45)" }}>
            Book the whole villa for your team or apply for a curated builder residency cohort.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => document.getElementById("booking").scrollIntoView({ behavior: "smooth" })}
              className="font-mont font-bold text-white rounded-full transition"
              style={{ padding: "16px 40px", fontSize: 16, backgroundColor: "#FF872A" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e5771f")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FF872A")}
            >
              Book Now
            </button>
            <button
              onClick={() => router.push("/coliving/apply?location=ibiza")}
              className="font-mont font-bold rounded-full transition"
              style={{ padding: "16px 40px", fontSize: 16, color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.2)", backgroundColor: "transparent" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
            >
              Apply for Residency
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
