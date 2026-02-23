"use client";

import { useMemo, useState } from "react";
import Image, { ImageProps } from "next/image";
import { FALLBACK_BLUR_DATA_URL } from "@/lib/ui/imagePlaceholders";

type SmartImageProps = Omit<ImageProps, "placeholder" | "blurDataURL"> & {
  blurDataURL?: string;
  withSkeleton?: boolean;
};

export default function SmartImage({
  blurDataURL,
  withSkeleton = true,
  className,
  onLoad,
  ...props
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);

  const blur = useMemo(
    () => blurDataURL ?? FALLBACK_BLUR_DATA_URL,
    [blurDataURL],
  );

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Image
        {...props}
        draggable={false}
        placeholder="blur"
        blurDataURL={blur}
        className={[
          className ?? "",
          "transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0",
        ].join(" ")}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
      />

      {withSkeleton && !loaded && (
        <div className="pointer-events-none absolute inset-0">
          {/* Base tint */}
          <div className="absolute inset-0 bg-neutral-900/70" />

          {/* Subtle glow to make loader feel premium */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.08),transparent_55%)]" />

          {/* Center loader */}
          <div className="absolute inset-0 grid place-items-center">
            <div className="flex flex-col items-center gap-3">
              <div className="relative h-12 w-12">
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border border-white/20" />
                {/* Spinning arc */}
                <div className="absolute inset-0 rounded-full border-2 border-white/70 border-t-transparent border-r-transparent animate-[smartSpin_0.9s_linear_infinite]" />
              </div>

              <div className="text-xs font-semibold tracking-widest text-white/70">
                LADEN…
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes smartSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
