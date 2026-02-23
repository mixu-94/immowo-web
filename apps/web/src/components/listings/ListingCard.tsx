// "use client";

// import { useCallback, useMemo, useState } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import { Listing } from "@/lib/types/listings";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { BadgeCheck, FileText, Info, ShieldCheck } from "lucide-react";
// import SmartImage from "../base/SmartImage";

// type Props = {
//   item: Listing;
// };

// function getGateKey(href: string) {
//   // per-object memory (by href); later switch to slug/id if you want
//   return `commission_gate_accepted:${href}`;
// }

// export default function ListingCard({ item }: Props) {
//   const router = useRouter();
//   const [open, setOpen] = useState(false);
//   const [checked, setChecked] = useState(false);

//   const gateKey = useMemo(() => getGateKey(item.href), [item.href]);

//   const shouldGate = useCallback(() => {
//     if (typeof window === "undefined") return true;
//     return localStorage.getItem(gateKey) !== "1";
//   }, [gateKey]);

//   const onCardClick = useCallback(
//     (e: React.MouseEvent) => {
//       e.preventDefault();

//       // If already accepted, go directly
//       if (!shouldGate()) {
//         router.push(item.href);
//         return;
//       }

//       // Otherwise open dialog
//       setChecked(false);
//       setOpen(true);
//     },
//     [item.href, router, shouldGate],
//   );

//   const onAgree = useCallback(() => {
//     if (typeof window !== "undefined") {
//       localStorage.setItem(gateKey, "1");
//     }
//     setOpen(false);
//     router.push(item.href);
//   }, [gateKey, item.href, router]);

//   return (
//     <>
//       {/* Card */}
//       <Link
//         href={item.href}
//         onClick={onCardClick}
//         className="
//     group relative block flex-[0_0_auto]
//     h-[160px] md:h-[190px]
//     w-[270px] md:w-[320px]
//     transition-all duration-500 ease-[cubic-bezier(.2,.8,.2,1)]
//     hover:w-[320px] md:hover:w-[380px]
//     select-none
//   "
//         draggable={true}
//       >
//         <div
//           className="
//             relative h-full w-full overflow-hidden rounded-2xl
//             bg-neutral-900 shadow-lg
//             ring-1 ring-white/10
//             transition-all duration-500
//             group-hover:shadow-2xl group-hover:ring-white/20 group-hover:z-[200]
//           "
//         >
//           <SmartImage
//             src={item.imageSrc}
//             alt={item.title}
//             fill
//             draggable={false}
//             className="
//               object-cover
//               transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)]
//               group-hover:scale-110
//             "
//             sizes="(max-width: 768px) 270px, 320px"
//           />
//           {/* <Image
//             src={item.imageSrc}
//             alt={item.title}
//             fill
//             draggable={false}
//             className="
//               object-cover
//               transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)]
//               group-hover:scale-110
//             "
//             sizes="(max-width: 768px) 270px, 320px"
//           /> */}

//           {/* Premium overlays */}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/0 opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
//           <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_0_80px_rgba(0,0,0,0.35)]" />

//           {/* Badge */}
//           {item.badge && (
//             <div className="absolute right-3 top-3 rounded-full border border-white/15 bg-[var(--immo-info-600)] px-3 py-1 text-[11px] font-semibold tracking-widest text-white  backdrop-blur">
//               {item.badge}
//             </div>
//           )}

//           {/* Content */}
//           <div
//             className="
//               absolute bottom-0 left-0 right-0 p-4
//               translate-y-5 opacity-0
//               transition-all duration-500 ease-[cubic-bezier(.2,.8,.2,1)]
//               group-hover:translate-y-0 group-hover:opacity-100
//             "
//           >
//             <h3 className="text-sm font-semibold text-white drop-shadow md:text-base">
//               {item.title}
//             </h3>

//             {item.location && (
//               <p className="mt-1 flex items-center gap-2 text-xs text-white/80">
//                 <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/60" />
//                 {item.location}
//               </p>
//             )}

//             <div className="mt-3 flex items-center justify-between text-xs text-white/75">
//               <span className="inline-flex items-center gap-2">
//                 <FileText className="h-4 w-4" />
//                 Exposé ansehen
//               </span>
//               <span className="text-white/80">→</span>
//             </div>
//           </div>
//         </div>
//       </Link>

//       {/* Commission Gate Dialog */}
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent
//           className="
//             max-w-[720px]
//             border border-white/10
//             bg-[#0b0f14]/90
//             text-white
//             backdrop-blur-2xl
//             shadow-2xl
//           "
//         >
//           {/* Subtle glow */}
//           <div className="pointer-events-none absolute inset-0 rounded-lg [box-shadow:inset_0_0_0_1px_rgba(255,255,255,0.06)]" />
//           <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />

//           <DialogHeader className="space-y-3">
//             <DialogTitle className="text-2xl font-semibold tracking-tight">
//               Hinweis zur Käuferprovision
//             </DialogTitle>
//             <DialogDescription className="text-base leading-relaxed text-white/75">
//               Für den Fall, dass Sie die Immobilie tatsächlich erwerben,
//               verpflichten Sie sich zur Zahlung einer Courtage an{" "}
//               <span className="font-semibold text-white/90">adaki</span>. Die
//               Provision wird erst bei Beurkundung des Kaufvertrages fällig.
//               Bitte beachten Sie zusätzlich unsere{" "}
//               <Link
//                 href="/agb"
//                 className="text-white underline decoration-white/40 underline-offset-4 hover:text-white/90"
//               >
//                 AGB
//               </Link>{" "}
//               sowie die{" "}
//               <Link
//                 href="/widerruf"
//                 className="text-white underline decoration-white/40 underline-offset-4 hover:text-white/90"
//               >
//                 Widerrufsbelehrung
//               </Link>
//               .
//             </DialogDescription>
//           </DialogHeader>

//           <div className="mt-6 grid gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
//             <div className="flex items-start gap-3">
//               <BadgeCheck className="mt-0.5 h-5 w-5 text-white/80" />
//               <div>
//                 <div className="text-xs font-semibold uppercase tracking-widest text-white/60">
//                   Käuferprovision
//                 </div>
//                 <div className="mt-1 text-sm font-semibold text-white">
//                   3,57% inkl. MwSt. (Beispiel)
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-start gap-3">
//               <ShieldCheck className="mt-0.5 h-5 w-5 text-white/80" />
//               <div>
//                 <div className="text-xs font-semibold uppercase tracking-widest text-white/60">
//                   Fälligkeit
//                 </div>
//                 <div className="mt-1 text-sm text-white/85">
//                   Erst bei notarieller Beurkundung des Kaufvertrags.
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-start gap-3">
//               <Info className="mt-0.5 h-5 w-5 text-white/80" />
//               <div>
//                 <div className="text-xs font-semibold uppercase tracking-widest text-white/60">
//                   Hinweis
//                 </div>
//                 <div className="mt-1 text-sm text-white/85">
//                   Weitere Informationen senden wir Ihnen auf Wunsch auch per
//                   E-Mail zu.
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="mt-5 flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
//             <Checkbox
//               id={`ack-${item.id}`}
//               checked={checked}
//               onCheckedChange={(v) => setChecked(v === true)}
//               className="mt-1 data-[state=checked]:bg-white data-[state=checked]:text-black"
//             />
//             <label
//               htmlFor={`ack-${item.id}`}
//               className="cursor-pointer text-sm leading-relaxed text-white/85"
//             >
//               Ich habe den Hinweis zur Käuferprovision gelesen und verstanden.
//             </label>
//           </div>

//           <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
//             <Button
//               type="button"
//               variant="secondary"
//               onClick={() => setOpen(false)}
//               className="bg-white/10 text-white hover:bg-white/15"
//             >
//               Abbrechen
//             </Button>
//             <Button
//               type="button"
//               onClick={onAgree}
//               disabled={!checked}
//               className="bg-white text-black hover:bg-white/90 disabled:opacity-50"
//             >
//               Einverstanden
//             </Button>
//           </div>

//           <p className="mt-4 text-xs text-white/50">
//             Hinweis: Dies ist ein Dummy-Text. Endgültige Formulierung rechtlich
//             prüfen.
//           </p>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }

import { Listing } from "@/lib/types/listings";
import Image from "next/image";
import Link from "next/link";

type Props = { item: Listing };

export default function ListingCard({ item }: Props) {
  return (
    <Link
      href={item.href}
      className="
        group relative block flex-[0_0_auto]
        h-[150px] w-[260px] md:h-[170px] md:w-[300px]
        outline-none mr-3 transform transition-transform duration-300 ease-out hover:scale-110
      "
    >
      {/* Outer frame (no scale -> no overlap problems) */}
      <div
        className="
          relative h-full w-full overflow-hidden rounded-xl
          bg-neutral-900
          ring-1 ring-white/10
          shadow-lg
          transition-all duration-300 ease-out
          group-hover:-translate-y-1 group-hover:shadow-2xl
          group-hover:ring-2 group-hover:ring-blue-400/40
          group-focus-visible:-translate-y-1 group-focus-visible:shadow-2xl
          group-focus-visible:ring-2 group-focus-visible:ring-blue-400/40
        "
      >
        {/* Image zoom inside only */}
        <Image
          src={item.imageSrc}
          alt={item.title}
          fill
          className="
            object-cover
            transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)]
            group-hover:scale-110 group-focus-visible:scale-110
          "
          sizes="(max-width: 768px) 260px, 300px"
        />

        {/* Soft spotlight/glow overlay */}
        <div
          className="
            pointer-events-none absolute inset-0
            opacity-0 transition-opacity duration-300
            group-hover:opacity-100 group-focus-visible:opacity-100
            bg-[radial-gradient(60%_60%_at_50%_20%,rgba(59,130,246,0.35),transparent_60%)]
          "
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/0 opacity-80 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />

        {item.badge && (
          <div className="absolute right-3 top-3 rounded-md bg-blue-600 px-2 py-1 text-xs font-semibold text-white shadow">
            {item.badge}
          </div>
        )}

        <div
          className="
            absolute bottom-0 left-0 right-0 p-4
            translate-y-4 opacity-0
            transition-all duration-300 ease-out
            group-hover:translate-y-0 group-hover:opacity-100
            group-focus-visible:translate-y-0 group-focus-visible:opacity-100
          "
        >
          <h3 className="text-sm md:text-base font-semibold text-white drop-shadow">
            {item.title}
          </h3>

          {item.location && (
            <p className="text-xs text-white/80">{item.location}</p>
          )}

          <div className="mt-2 flex items-center justify-between text-xs text-white/70">
            <span>Exposé ansehen</span>
            <span>→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
