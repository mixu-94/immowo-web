"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-gray-300 bg-[--a-black-3] px-16 py-6 text-white">
      <div className="flex flex-col items-center justify-between md:flex-row">
        {/* Left Section: Links */}
        <div className="mb-4 flex flex-col items-center md:mb-0 md:flex-row md:space-x-6">
          <Link href="/privacy-policy" className="hover:underline">
            Datenschutzerklärung
          </Link>
          <span className="hidden text-white md:inline-block">|</span>
          <Link href="/terms-of-service" className="hover:underline">
            AGB
          </Link>
          <span className="hidden text-white md:inline-block">|</span>
          <Link href="/terms-of-service" className="hover:underline">
            Wiederrufungsrecht
          </Link>
          <span className="hidden text-white md:inline-block">|</span>
          <Link href="/terms-of-service" className="hover:underline">
            Cookie-Richtlinien
          </Link>
          <span className="hidden text-white md:inline-block">|</span>
          <Link href="/impressum" className="hover:underline">
            Impressum
          </Link>
        </div>

        {/* Right Section: Social Links and Made By */}
        <div className="flex flex-col items-center md:flex-row md:space-x-6">
          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {/* <Socials hideLabels={true} iconSize={24} />{" "} */}
            {/* Assuming Socials component renders Discord, Instagram, etc. */}
          </div>

          {/* "Made by MiXa with ❤️" */}
        </div>
      </div>

      {/* Bottom Section: Copyright */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-start text-sm text-[var(--adaki-grey-2)]">
          © Copyright {new Date().getFullYear()}, all rights reserved
        </div>
        {/* <p className="knewave flex items-end text-sm text-white">
          Made by Michael Schindler with{" "}
          <span className="ml-1 text-red-600">❤️</span>
        </p> */}
      </div>
    </footer>
  );
};

export default Footer;
