import ImpressumArea from "@/components/Legals/Impressum/Impressum";
import Disclaimer from "@/components/Legals/Impressum/Disclaimer";
import Link from "next/link";

export default async function ImpressumMain() {
  return (
    <>
      <div className="mt-16 flex w-full flex-col items-center justify-center gap-3 overflow-hidden md:p-8">
        <ImpressumArea />
        <Disclaimer />
        <Link href="/">
          <button className="btn-custom">Back</button>
        </Link>
      </div>
    </>
  );
}
