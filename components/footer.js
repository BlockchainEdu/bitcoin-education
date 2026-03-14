import { useRouter } from "next/router";
import Image from "next/image";

export default function Footer() {
  const router = useRouter();

  return (
    <footer style={{ backgroundColor: "#131416" }}>
      {/* Main footer content */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 text-center">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex justify-center">
              <Image width={56} height={58} src="/images/ben-footer.svg" alt="BEN logo" />
            </div>
            <p className="mt-4 font-inter text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
              Blockchain Education Network
              <br />
              Est. 2014
            </p>
            <p className="mt-4 font-inter text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.25)" }}>
              625 Kenmoor Ave Suite
              <br />
              301-97251 Grand Rapids, MI 49546
            </p>
          </div>

          {/* Navigate — matches header labels */}
          <div>
            <h4 className="font-mont font-bold text-xs uppercase tracking-wider text-white mb-4" style={{ opacity: 0.5 }}>
              Navigate
            </h4>
            <ul className="space-y-2.5 font-inter text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              {[
                { label: "Get Involved", path: "/opportunities" },
                { label: "Blog", path: "/blog" },
                { label: "Our People", path: "/team" },
                { label: "Support Us", path: "/donate" },
                { label: "Contact", path: "/contact" },
              ].map((item) => (
                <li key={item.path}><span onClick={() => router.push(item.path)} className="transition-colors duration-200 hover:text-white cursor-pointer">{item.label}</span></li>
              ))}
            </ul>
          </div>

          {/* Get Started */}
          <div>
            <h4 className="font-mont font-bold text-xs uppercase tracking-wider text-white mb-4" style={{ opacity: 0.5 }}>
              Get Started
            </h4>
            <ul className="space-y-2.5 font-inter text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              <li><span onClick={() => router.push("/opportunities#apply")} className="transition-colors duration-200 hover:text-white cursor-pointer">Join BEN</span></li>
              <li><span onClick={() => window.open("https://bit.ly/ben-media-kit", "_blank", "noopener,noreferrer")} className="transition-colors duration-200 hover:text-white cursor-pointer">Media Kit</span></li>
            </ul>
          </div>

          {/* Connect — removed Facebook, Instagram, TikTok */}
          <div>
            <h4 className="font-mont font-bold text-xs uppercase tracking-wider text-white mb-4" style={{ opacity: 0.5 }}>
              Connect
            </h4>
            <ul className="space-y-2.5 font-inter text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              {[
                { label: "X / Twitter", url: "https://twitter.com/blockchainedu" },
                { label: "LinkedIn", url: "https://linkedin.com/company/blockchainedu" },
                { label: "YouTube", url: "https://www.youtube.com/@BlockchainEdu" },
                { label: "Telegram", url: "https://t.me/+SMwh8vkel1KnZArV" },
              ].map((item) => (
                <li key={item.label}><span onClick={() => window.open(item.url, "_blank", "noopener,noreferrer")} className="transition-colors duration-200 hover:text-white cursor-pointer">{item.label}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex flex-col items-center py-6 gap-4">
          <div className="flex items-center gap-2">
            <div className="relative flex items-center justify-center">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#34D399" }} />
              <div
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: "#34D399",
                  animation: "statusPulse 2s ease-in-out infinite",
                }}
              />
            </div>
            <span className="font-inter text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>All systems operational</span>
            <style jsx>{`
              @keyframes statusPulse {
                0%, 100% { opacity: 1; transform: scale(1); }
                50% { opacity: 0; transform: scale(2.5); }
              }
            `}</style>
          </div>
          <span className="font-inter text-xs" style={{ color: "rgba(255,255,255,0.25)" }} suppressHydrationWarning>
            &copy; {new Date().getFullYear()} Blockchain Education Network
          </span>
        </div>
      </div>
    </footer>
  );
}
