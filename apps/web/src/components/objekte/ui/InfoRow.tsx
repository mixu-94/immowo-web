import type { ReactNode } from "react";

export function InfoRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value?: string | number | null;
}) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <div className="mt-0.5 text-white/90">{icon}</div>
      <div className="min-w-0">
        <div className="text-xs font-semibold uppercase tracking-widest text-white/60">
          {label}
        </div>
        <div className="mt-1 break-words text-sm font-semibold text-white/95">
          {value}
        </div>
      </div>
    </div>
  );
}
