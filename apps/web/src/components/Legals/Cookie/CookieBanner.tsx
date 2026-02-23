"use client";

import { useEffect } from "react";
import Head from "next/head";

const CookieBanner: React.FC = () => {
  useEffect(() => {
    // Only load Cookiebot if in production mode
    if (process.env.NODE_ENV === "production") {
      const scriptId = "Cookiebot";
      const existingScript = document.getElementById(scriptId);

      if (!existingScript) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.src = "https://consent.cookiebot.com/uc.js";
        script.setAttribute(
          "data-cbid",
          "c2884d25-2016-435f-abb9-df25069fda89",
        );
        script.setAttribute("data-blockingmode", "auto");
        script.type = "text/javascript";
        script.async = true;

        document.body.appendChild(script);

        script.onload = () => {
          if (typeof window !== "undefined" && (window as any).Cookiebot) {
            console.log("Forcing Cookiebot to show the consent banner");
            // Force show the banner
            (window as any).Cookiebot.show();
          } else {
            console.error("CookieConsentDialog not available");
          }
        };
      } else {
        if (typeof window !== "undefined" && (window as any).Cookiebot) {
          // Force show the banner if the script already exists
          (window as any).Cookiebot.show();
        } else {
          console.error("CookieConsentDialog not available");
        }
      }
    }
  }, []);

  return (
    <>
      <Head>
        {/* Only load the Cookiebot script in production */}
        {process.env.NODE_ENV === "production" && (
          <script
            id="Cookiebot"
            src="https://consent.cookiebot.com/uc.js"
            data-cbid="c2884d25-2016-435f-abb9-df25069fda89"
            data-blockingmode="auto"
            type="text/javascript"
            async
          />
        )}
      </Head>
    </>
  );
};

export default CookieBanner;
