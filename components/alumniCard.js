export default function AlumniCard({ image, name, title, linkedin, twitter, email }) {
  return (
    <div className="alumni-card flex flex-col items-center text-center">
      {/* Circular avatar */}
      <div
        className="alumni-avatar relative rounded-full overflow-hidden"
        style={{ width: "128px", height: "128px", backgroundColor: "#E1E1E1" }}
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Name */}
      <h3 className="font-mont font-bold text-sm text-black mt-3 leading-tight">
        {name}
      </h3>

      {/* Title */}
      {title && (
        <p
          className="text-bengrey-300 text-xs mt-1 font-inter leading-snug"
          style={{ maxWidth: "160px" }}
        >
          {title}
        </p>
      )}

      {/* Social links — revealed on hover via CSS */}
      {(twitter || linkedin || email) && (
        <div className="alumni-socials flex items-center gap-2 mt-2">
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="team-social-icon-sm"
              aria-label={`${name} on LinkedIn`}
            >
              <svg width="10" height="10" viewBox="0 0 24 24">
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
              className="team-social-icon-sm"
              aria-label={`${name} on Twitter`}
            >
              <svg width="10" height="10" viewBox="0 0 24 24">
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
              className="team-social-icon-sm"
              aria-label={`Email ${name}`}
            >
              <svg
                width="10"
                height="10"
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
  );
}
