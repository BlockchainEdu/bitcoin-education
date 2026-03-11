import HeaderWithLogoDark from "../components/headerWithLogoDark";
import Footer from "../components/footer";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Page Not Found | Blockchain Education Network</title>
        <meta name="robots" content="noindex" />
      </Head>

      <HeaderWithLogoDark />

      <section className="flex-1 relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        {/* Orange glow */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 50% 40%, rgba(255,135,42,0.07) 0%, transparent 60%)",
          }}
          aria-hidden="true"
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.02,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
          aria-hidden="true"
        />

        <div className="relative text-center px-6 py-24 sm:py-32">
          <p
            className="font-mont font-black text-7xl sm:text-8xl tracking-tight"
            style={{ color: "rgba(255,255,255,0.08)" }}
          >
            404
          </p>
          <h1 className="mt-4 font-mont font-black text-3xl sm:text-4xl md:text-5xl text-white">
            Page not found
          </h1>
          <p
            className="mt-4 font-inter text-base sm:text-lg max-w-md mx-auto"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <span
              onClick={() => router.push("/")}
              className="inline-flex items-center gap-2 font-mont font-bold text-sm text-white px-8 py-3.5 rounded-full cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
              style={{ backgroundColor: "#FF872A" }}
            >
              Go Home
            </span>
            <span
              onClick={() => router.push("/blog")}
              className="inline-flex items-center gap-2 font-mont font-bold text-sm px-8 py-3.5 rounded-full cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
              style={{
                color: "rgba(255,255,255,0.85)",
                border: "1px solid rgba(255,255,255,0.2)",
                backgroundColor: "rgba(255,255,255,0.05)",
              }}
            >
              Read the Blog
            </span>
            <span
              onClick={() => router.push("/team")}
              className="inline-flex items-center gap-2 font-mont font-bold text-sm px-8 py-3.5 rounded-full cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
              style={{
                color: "rgba(255,255,255,0.85)",
                border: "1px solid rgba(255,255,255,0.2)",
                backgroundColor: "rgba(255,255,255,0.05)",
              }}
            >
              Meet the Team
            </span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
