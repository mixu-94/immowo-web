import React from "react";

type LegalPageProps = {
  title: string;
  lastUpdated?: string;
  children: React.ReactNode;
};

export function LegalPage({ title, lastUpdated, children }: LegalPageProps) {
  return (
    <main className="w-full bg-[var(--a-black-3)]">
      <div className="container mx-auto max-w-4xl px-4 pb-16 pt-24">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-semibold tracking-tight">{title}</h1>
          {lastUpdated ? (
            <p className="mt-2 text-sm text-white/60">Stand: {lastUpdated}</p>
          ) : null}
        </header>

        {/* Content Card */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
          <article
            className={[
              "prose prose-invert max-w-none",
              // bessere Lesbarkeit
              "prose-p:leading-relaxed prose-p:text-white/80",
              // Überschriften spacing + Optik
              "prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-xl prose-h2:font-semibold",
              "prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-lg prose-h3:font-semibold",
              // Listen
              "prose-ul:my-4 prose-ol:my-4",
              "prose-li:my-1 prose-li:text-white/80",
              // Links (falls ihr welche habt)
              "prose-a:text-white prose-a:underline prose-a:decoration-white/30 hover:prose-a:decoration-white/60",
              // Trennerlinien nach H2 (optische Gliederung)
              "prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-3",
              // Code/Inline (falls mal gebraucht)
              "prose-strong:text-white",
            ].join(" ")}
          >
            {children}
          </article>
        </section>
      </div>
    </main>
  );
}
