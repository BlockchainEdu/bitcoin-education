import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../lib/auth";
import MobileNav from "./mobileNav";
import LoginModal from "./LoginModal";
import StandardButton from "./standardButton";

export default function HeaderWithLogo({ className = "", children }) {
  const [offset, setOffset] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const { user, isPaid, signOut } = useAuth();
  const logoSrc = `/images/ben-logo-color-no-slogan.svg`;
  const router = useRouter();

  let scrolled = true;

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [colivingOpen, setColivingOpen] = useState(false);

  const navLinks = [
    { label: "Academy", href: "/academy" },
    { label: "Ventures", href: "/ventures" },
    { label: "Jobs", href: "/jobs" },
    { label: "Conferences", href: "/conferences" },
    { label: "Universities", href: "/" },
    { label: "Blog", href: "/blog" },
  ];

  const colivingLinks = [
    { label: "Ibiza", href: "/coliving/ibiza" },
    { label: "Ericeira", href: "/coliving/ericeira" },
    { label: "Apply Now", href: "/coliving/apply", highlight: true },
  ];

  return (
    <section
      className={`pt-10 bg-white px-7 sticky top-0 z-50 white-header header scrolled ${className}`}
    >
      {/* Mobile menu */}
      <div className="flex lg:hidden mobile-nav float-right h-[40px] items-center">
        {children}
        {!children && <MobileNav />}
      </div>

      {/* Desktop menu */}
      <nav className="flex max-w-7xl m-auto justify-between items-start lg:items-center relative">
        <div className="w-2/12 lg:w-1/4 left-0 cursor-pointer" onClick={() => router.push("/")}>
          <img className="w-24 mx-auto max-w-none" src={logoSrc} alt="BEN home" />
        </div>

        <ul className="font-mont text-black hidden lg:flex justify-end items-center">
          <li className="flex justify-end items-center">
            {navLinks.map((link) => (
              <span
                key={link.href}
                className="display-on-scroll px-3 font-semibold cursor-pointer text-sm"
                onClick={() => router.push(link.href)}
              >
                {link.label}
              </span>
            ))}

            {/* Co-Living dropdown */}
            <div
              className="relative display-on-scroll"
              onMouseEnter={() => setColivingOpen(true)}
              onMouseLeave={() => setColivingOpen(false)}
            >
              <span className="px-3 font-semibold cursor-pointer text-sm flex items-center gap-1">
                Co-Living
                <svg
                  className="h-3 w-3 transition-transform"
                  style={{ transform: colivingOpen ? "rotate(180deg)" : "rotate(0)" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
              {colivingOpen && (
                <div
                  className="absolute top-full left-0 mt-2 py-2 rounded-xl shadow-lg"
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid rgba(0,0,0,0.08)",
                    minWidth: 180,
                    zIndex: 100,
                  }}
                >
                  {colivingLinks.map((link) => (
                    <span
                      key={link.href}
                      className="block px-5 py-2.5 font-semibold cursor-pointer text-sm transition"
                      style={{
                        color: link.highlight ? "#FF872A" : "#1d1d1f",
                        fontSize: 14,
                      }}
                      onClick={() => {
                        router.push(link.href);
                        setColivingOpen(false);
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.03)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      {link.label}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {user ? (
              <>
                <span
                  className="display-on-scroll px-3 font-semibold cursor-pointer text-sm"
                  onClick={() => router.push("/dashboard")}
                >
                  Dashboard
                </span>
                {!isPaid && (
                  <StandardButton
                    link="/academy"
                    text="Upgrade"
                    textColor="white"
                    color="orange"
                    styling="display-on-scroll ml-3 py-3 px-6 text-sm"
                  />
                )}
              </>
            ) : (
              <>
                <span
                  className="display-on-scroll px-3 font-semibold cursor-pointer text-sm"
                  onClick={() => setShowLogin(true)}
                >
                  Log In
                </span>
                <StandardButton
                  text="Join BEN"
                  textColor="white"
                  color="orange"
                  styling="display-on-scroll ml-3 py-3 px-6 text-sm"
                  onClick={() => setShowLogin(true)}
                />
              </>
            )}
          </li>
        </ul>
      </nav>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </section>
  );
}
