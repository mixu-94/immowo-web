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

      {/* Base overlay (more cinematic + professional) */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/55 via-black/35 to-black/60" />

      {/* Fade into blur (no hard edge) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-40">
        {/* This layer provides the blur */}
        <div
          className="
            absolute inset-0
            backdrop-blur-xl
            bg-black/25
            [mask-image:linear-gradient(to_bottom,transparent,black_35%,black)]
            [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_35%,black)]
          "
        />
        {/* Optional: deepen the bottom a bit to blend into the page */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-[var(--a-black-3)]" />
      </div>

      {/* Content */}
      <div className="relative z-30 flex h-full items-center justify-center px-6">
        <div className="max-w-4xl text-center text-white">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium tracking-wide text-white/90 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-white/70" />
            Premium Listings • Handpicked
          </p>

          {/* <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl [text-shadow:0_8px_30px_rgba(0,0,0,0.45)]">
            Immovend
          </h1> */}

          {/* <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-white/85 md:text-base">
            Wo Immobilien auf Innovation treffen.
          </p> */}

          {/* Optional CTA (remove if you don’t want buttons) */}
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {/* <button className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-black shadow-lg shadow-black/20 transition hover:bg-white/90"></button> */}
            <button className="inline-flex h-11 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10">
              Explore Now
            </button>
          </div>
        </div>
      </div>

      {/* Subtle vignette for polish */}
      <div className="pointer-events-none absolute inset-0 z-20 [box-shadow:inset_0_0_120px_rgba(0,0,0,0.55)]" />
    </header>
  );
}
