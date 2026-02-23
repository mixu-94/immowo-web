import * as React from "react";

type Props = {
  label: string;
  value?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
};

export function InfoRow({ label, value, icon, className }: Props) {
  return (
    <div
      className={["flex items-start justify-between gap-4", className]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {icon ? <span className="shrink-0">{icon}</span> : null}
        <span>{label}</span>
      </div>
      <div className="text-sm font-medium text-right">{value ?? "-"}</div>
    </div>
  );
}
