import { useState, useEffect } from "react";
import Popup from "./popup";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const popupDelayInSeconds = 15;
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (
      typeof window !== "undefined" &&
      !window.sessionStorage.getItem("hasShownPopup")
    ) {
      timeoutId = setTimeout(() => {
        window.sessionStorage.setItem("hasShownPopup", true);
        setShowPopup(true);
      }, popupDelayInSeconds * 1000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <footer style={{ backgroundColor: "#131416" }}>
      {showPopup && <Popup />}

      {/* Main footer content */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Image width="56px" height="58px" src="/images/ben-footer.svg" />
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
              <li><Link href="/opportunities"><a className="transition-colors duration-200 hover:text-white">Get Involved</a></Link></li>
              <li><Link href="/blog"><a className="transition-colors duration-200 hover:text-white">Blog</a></Link></li>
              <li><Link href="/team"><a className="transition-colors duration-200 hover:text-white">Our People</a></Link></li>
              <li><Link href="/donate"><a className="transition-colors duration-200 hover:text-white">Support Us</a></Link></li>
              <li><Link href="/contact"><a className="transition-colors duration-200 hover:text-white">Contact</a></Link></li>
            </ul>
          </div>

          {/* Get Started */}
          <div>
            <h4 className="font-mont font-bold text-xs uppercase tracking-wider text-white mb-4" style={{ opacity: 0.5 }}>
              Get Started
            </h4>
            <ul className="space-y-2.5 font-inter text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              <li><a href="/opportunities#apply" className="transition-colors duration-200 hover:text-white">Join BEN</a></li>
              <li><a href="https://bit.ly/ben-media-kit" target="_blank" rel="noopener noreferrer" className="transition-colors duration-200 hover:text-white">Media Kit</a></li>
            </ul>
          </div>

          {/* Connect — removed Facebook, Instagram, TikTok */}
          <div>
            <h4 className="font-mont font-bold text-xs uppercase tracking-wider text-white mb-4" style={{ opacity: 0.5 }}>
              Connect
            </h4>
            <ul className="space-y-2.5 font-inter text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              <li><a href="https://twitter.com/blockchainedu" target="_blank" rel="noopener noreferrer" className="transition-colors duration-200 hover:text-white">X / Twitter</a></li>
              <li><a href="https://linkedin.com/company/blockchainedu" target="_blank" rel="noopener noreferrer" className="transition-colors duration-200 hover:text-white">LinkedIn</a></li>
              <li><a href="https://www.youtube.com/@BlockchainEdu" target="_blank" rel="noopener noreferrer" className="transition-colors duration-200 hover:text-white">YouTube</a></li>
              <li><a href="https://t.me/+SMwh8vkel1KnZArV" target="_blank" rel="noopener noreferrer" className="transition-colors duration-200 hover:text-white">Telegram</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex flex-col sm:flex-row justify-between items-center py-6 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#34D399" }} />
            <span className="font-inter text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>All systems operational</span>
          </div>
          <span className="font-inter text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            &copy; {new Date().getFullYear()} Blockchain Education Network
          </span>
        </div>
      </div>
    </footer>
  );
}
