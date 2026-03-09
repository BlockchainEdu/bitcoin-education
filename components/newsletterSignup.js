export default function NewsletterSignup() {
  return (
    <section className="rounded-2xl sm:rounded-3xl overflow-hidden bg-white border-2 border-black/30">
      <div className="max-w-3xl mx-auto px-5 sm:px-10 py-10 sm:py-14 text-center">
        <span className="inline-block bg-benorange-500/15 text-benorange-500 text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full border border-benorange-500/25">
          Free Weekly Newsletter
        </span>

        <h2 className="mt-4 text-xl sm:text-2xl md:text-3xl font-extrabold text-benblack-500 leading-tight">
          From dorm rooms to
          <br className="hidden sm:block" />
          <span className="text-benorange-500"> billion-dollar protocols.</span>
        </h2>

        <p className="mt-3 text-sm sm:text-base text-bengrey-500 max-w-lg mx-auto leading-relaxed">
          We interview the founders who got there — and break down exactly how
          they did it. Playbooks, market calls, and job openings straight to
          your inbox.
        </p>

        <div className="mt-6 sm:mt-8 max-w-md mx-auto">
          <iframe
            src="https://embeds.beehiiv.com/cfab9b0e-aa74-4e4d-bf81-2a81e1904f6c?slim=true"
            data-test-id="beehiiv-embed"
            height="52"
            frameBorder="0"
            scrolling="no"
            style={{
              margin: 0,
              borderRadius: "0px",
              backgroundColor: "transparent",
              width: "100%",
            }}
          />
        </div>

        <p className="mt-3 text-xs text-bengrey-500/40">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
