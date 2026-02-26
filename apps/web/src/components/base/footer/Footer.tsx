"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer
      className="
        relative
        border-t border-[color:var(--color-border)]
        bg-[color:var(--color-bg)]
        text-[color:var(--color-text)]
      "
    >
      {/* subtle top highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-accent)]/40 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Left: Legal links */}
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold tracking-tight text-[color:var(--color-text)]">
              Rechtliches
            </p>

            <nav className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
              <Link
                href="/datenschutz"
                className="text-[color:var(--color-text-muted)] underline-offset-4 hover:text-[color:var(--color-link)] hover:underline"
              >
                Datenschutzerklärung
              </Link>

              <span className="hidden text-[color:var(--color-border)] sm:inline">
                •
              </span>

              <Link
                href="/agb"
                className="text-[color:var(--color-text-muted)] underline-offset-4 hover:text-[color:var(--color-link)] hover:underline"
              >
                AGB
              </Link>

              <span className="hidden text-[color:var(--color-border)] sm:inline">
                •
              </span>

              <Link
                href="/widerruf"
                className="text-[color:var(--color-text-muted)] underline-offset-4 hover:text-[color:var(--color-link)] hover:underline"
              >
                Widerrufungsrecht
              </Link>

              <span className="hidden text-[color:var(--color-border)] sm:inline">
                •
              </span>

              <Link
                href="/cookies"
                className="text-[color:var(--color-text-muted)] underline-offset-4 hover:text-[color:var(--color-link)] hover:underline"
              >
                Cookie-Richtlinien
              </Link>

              <span className="hidden text-[color:var(--color-border)] sm:inline">
                •
              </span>

              <Link
                href="/impressum"
                className="text-[color:var(--color-text-muted)] underline-offset-4 hover:text-[color:var(--color-link)] hover:underline"
              >
                Impressum
              </Link>
            </nav>
          </div>
        </div>

        {/* bottom line */}
        <div className="mt-8 flex flex-col gap-3 border-t border-[color:var(--color-border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-[color:var(--color-text-muted)]">
            © {new Date().getFullYear()} – all rights reserved
          </div>

          {/* Optional: you had this commented, keep it commented */}
          {/* <p className="knewave flex items-end text-sm text-[color:var(--color-text)]">
            Made by Michael Schindler with{" "}
            <span className="ml-1 text-red-600">❤️</span>
          </p> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
