export default function Header() {
  return (
    <header className="relative w-full h-[60vh] min-h-[650px] overflow-hidden">
      {/* Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source src="/assets/videos/beach.mp4" type="video/mp4" />
      </video>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/35 to-black/70" />

      {/* Subtle color glow (navy premium) */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.18),transparent_60%)] blur-3xl" />
        <div className="absolute -top-24 right-[-180px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.14),transparent_62%)] blur-3xl" />
      </div>

      {/* Fade into blur (no hard edge) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-44">
        <div
          className="
            absolute inset-0
            backdrop-blur-xl
            bg-black/25
            [mask-image:linear-gradient(to_bottom,transparent,black_35%,black)]
            [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_35%,black)]
          "
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-30 flex h-full items-center justify-center px-6">
        <div className="max-w-4xl text-center text-white">
          {/* Badge */}
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold tracking-widest text-white/90 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-300" />
            BAUTRÄGER • VERKAUF • PROJEKTENTWICKLUNG
          </p>

          {/* Headline */}
          <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-6xl [text-shadow:0_10px_40px_rgba(0,0,0,0.55)]">
            Immobilien, die{" "}
            <span className="bg-gradient-to-r from-cyan-200 via-fuchsia-200 to-indigo-200 bg-clip-text text-transparent">
              überzeugen
            </span>
            .
          </h1>

          {/* Subline */}
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-white/85 md:text-base">
            Schlüsselfertige Objekte und Neubauprojekte{" "}
            <span className="text-white/95 font-semibold">vom Papier weg</span>{" "}
            – klar dokumentiert, hochwertig präsentiert und professionell
            begleitet.
          </p>

          {/* Trust line */}
          <div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-white/75">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur">
              Transparenter Prozess
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur">
              Saubere Unterlagen
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur">
              Qualität bis zur Übergabe
            </span>
          </div>

          {/* Scroll hint */}
          <div className="mt-10 flex items-center justify-center gap-2 text-xs text-white/60">
            <span className="inline-block h-8 w-5 rounded-full border border-white/25 bg-white/5 backdrop-blur">
              <span className="mx-auto mt-1 block h-2 w-1 rounded-full bg-white/70 animate-bounce" />
            </span>
            <span>Scrollen, um mehr zu entdecken</span>
          </div>
        </div>
      </div>

      {/* Subtle vignette for polish */}
      <div className="pointer-events-none absolute inset-0 z-20 [box-shadow:inset_0_0_140px_rgba(0,0,0,0.6)]" />
    </header>
  );
}
