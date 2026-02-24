import type { ReactNode } from "react";

export function Section({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-black/25 p-6 backdrop-blur-xl">
      <div className="mb-4 flex items-center gap-3">
        <div className="text-white/90">{icon}</div>
        <h2 className="text-base font-semibold tracking-tight text-white">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}
