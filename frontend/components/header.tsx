import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MobileNav from "./mobileNav";

export default function HeaderWithLogo({ className = "", children = null }: { className?: string; children?: any }) {
  const [offset, setOffset] = useState(0);
  const logoSrc = `/images/ben-logo-color-no-slogan.svg`;
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Jobs", href: "/jobs" },
    { label: "Conferences", href: "/conferences" },
    { label: "Universities", href: "/" },
    { label: "Blog", href: "/blog" },
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
          </li>
        </ul>
      </nav>
    </section>
  );
}
