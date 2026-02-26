"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer
      className="
        relative mt-10
        border-t border-[color:var(--color-border)]
        bg-[color:var(--color-bg)]
        text-[color:var(--color-text)]
      "
    >
      {/* subtle top highlight like navbar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Left */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
              Rechtliches
            </p>

            <nav className="flex flex-wrap items-center gap-x-5 gap-y-3">
              {[
                { href: "/datenschutz", label: "Datenschutz" },
                { href: "/agb", label: "AGB" },
                { href: "/widerruf", label: "Widerrufungsrecht" },
                { href: "/cookies", label: "Cookie-Richtlinien" },
                { href: "/impressum", label: "Impressum" },
              ].map((item, idx, arr) => (
                <div key={item.href} className="flex items-center gap-x-5">
                  <Link
                    href={item.href}
                    className="
                      text-sm font-semibold uppercase tracking-[0.22em]
                      text-white/85
                      transition
                      hover:text-white
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)]/60
                      focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-bg)]
                    "
                  >
                    <span className="border-b border-transparent pb-1 hover:border-white/60">
                      {item.label}
                    </span>
                  </Link>

                  {/* dot separators like navbar */}
                  {idx < arr.length - 1 ? (
                    <span
                      className="h-2 w-2 rounded-full bg-white/30"
                      aria-hidden="true"
                    />
                  ) : null}
                </div>
              ))}
            </nav>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-4 md:items-end"></div>
        </div>

        {/* bottom row */}
        <div className="mt-10 flex flex-col gap-4 border-t border-[color:var(--color-border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
            © {new Date().getFullYear()} – all rights reserved
          </div>

          {/* keep your original comment */}
          {/* <p className="knewave flex items-end text-sm text-[color:var(--color-text)]">
            Made by Michael Schindler with <span className="ml-1 text-red-600">❤️</span>
          </p> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
