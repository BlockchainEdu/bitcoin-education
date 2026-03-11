import { useState, useRef, useEffect } from "react";

function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  // Handle youtube.com/watch?v=ID, youtu.be/ID, and youtube.com/live/ID
  let id = null;
  const watchMatch = url.match(/[?&]v=([^&]+)/);
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  const liveMatch = url.match(/youtube\.com\/live\/([^?&]+)/);
  id = watchMatch ? watchMatch[1] : shortMatch ? shortMatch[1] : liveMatch ? liveMatch[1] : null;
  if (!id) return null;
  const timeMatch = url.match(/[?&]t=(\d+)/);
  const start = timeMatch ? `?start=${timeMatch[1]}&` : "?";
  return `https://www.youtube.com/embed/${id}${start}autoplay=1&rel=0`;
}

export default function NationalTeamCard({
  image,
  name,
  title,
  bio,
  bioLabel = "Bio",
  linkedin,
  twitter,
  email,
  video,
}) {
  const [showBio, setShowBio] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setShowBio(false);
      }
    }
    if (showBio) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showBio]);

  // Lock body scroll when video modal is open (iOS-safe)
  useEffect(() => {
    if (showVideo) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
    } else {
      const top = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      if (top) window.scrollTo(0, parseInt(top || "0") * -1);
    }
    return () => {
      const top = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      if (top) window.scrollTo(0, parseInt(top || "0") * -1);
    };
  }, [showVideo]);

  const handleCardClick = () => {
    if (showBio) {
      setShowBio(false);
      return;
    }
    if (video) {
      setShowVideo(true);
    } else if (bio) {
      setShowBio(!showBio);
    }
  };

  const embedUrl = getYouTubeEmbedUrl(video);

  return (
    <>
      <div className="flex flex-col items-center text-center group" ref={cardRef}>
        {/* Image container */}
        <div
          className="relative w-full h-56 sm:w-44 sm:h-56 rounded-2xl overflow-hidden cursor-pointer transition-shadow duration-300 group-hover:shadow-lg"
          onClick={handleCardClick}
        >
          {/* Photo */}
          <img
            src={image}
            alt={`${name} — ${title}`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundColor: "#E1E1E1", objectPosition: "top" }}
          />

          {/* Hover gradient overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0) 50%, transparent)",
            }}
          />

          {/* Bio overlay (all cards with bio) */}
          {bio && (
            <div
              className={`absolute inset-0 p-3 sm:p-5 flex items-start transition-all duration-300 ${
                showBio
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-2 pointer-events-none"
              }`}
              style={{ backgroundColor: "rgba(32, 33, 39, 0.92)" }}
            >
              <p
                className="text-white text-xs sm:text-sm leading-relaxed font-inter overflow-y-auto"
                style={{ maxHeight: "100%", opacity: 0.9, WebkitOverflowScrolling: "touch" }}
              >
                {bio}
              </p>
            </div>
          )}

          {/* Play button for video cards */}
          {video && !showBio && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: "rgba(255, 135, 42, 0.9)",
                  boxShadow: "0 4px 20px rgba(255, 135, 42, 0.4)",
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}

          {/* Bio button — always visible on cards with bio, when bio is hidden */}
          {bio && !showBio && (
            <div
              className="absolute bottom-3 left-3 right-3 flex justify-center cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setShowBio(true);
              }}
            >
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-inter font-semibold text-xs text-white transition-all duration-300"
                style={{
                  backgroundColor: "rgba(0,0,0,0.55)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  letterSpacing: "0.02em",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
                {bioLabel}
              </span>
            </div>
          )}
        </div>

        {/* Name & Title */}
        <h3 className="font-mont font-bold text-sm sm:text-lg text-black mt-3 sm:mt-5 leading-tight">
          {name}
        </h3>
        {title && (
          <p
            className="text-bengrey-300 text-xs sm:text-sm mt-1 font-inter"
            style={{ maxWidth: "200px" }}
          >
            {title}
          </p>
        )}

        {/* Social links */}
        {(twitter || linkedin || email) && (
          <div className="flex items-center gap-3 mt-3">
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="team-social-icon"
                aria-label={`${name} on LinkedIn`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                  />
                </svg>
              </a>
            )}
            {twitter && (
              <a
                href={twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="team-social-icon"
                aria-label={`${name} on Twitter`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                  />
                </svg>
              </a>
            )}
            {email && (
              <a
                href={email.startsWith("mailto:") ? email : `mailto:${email}`}
                className="team-social-icon"
                aria-label={`Email ${name}`}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7l-10 6L2 7" />
                </svg>
              </a>
            )}
          </div>
        )}
      </div>

      {/* Video Modal */}
      {showVideo && embedUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }}
          onClick={() => setShowVideo(false)}
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 text-white transition-opacity duration-200"
            style={{ opacity: 0.6 }}
            onMouseEnter={(e) => (e.target.style.opacity = 1)}
            onMouseLeave={(e) => (e.target.style.opacity = 0.6)}
            onClick={() => setShowVideo(false)}
            aria-label="Close video"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </button>

          {/* Video container — padding-bottom fallback for iOS < 15 */}
          <div
            className="relative w-full max-w-4xl mx-4"
            style={{ paddingBottom: "56.25%" }}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={embedUrl}
              className="absolute inset-0 w-full h-full rounded-xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={`${name} video`}
              style={{ border: "none" }}
            />
          </div>

          {/* Name label below video */}
          <div
            className="absolute bottom-8 left-0 right-0 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-white font-mont font-bold text-lg">{name}</p>
            <p className="font-inter text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              {title}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
