import SliderArea from "@/components/home/SliderArea";
import InfoSection from "@/components/home/InfoSection";
import Header from "@/components/base/header/Header";

export default function Home() {
  return (
    <div className="relative">
      {/* HERO */}
      <Header />

      {/* OVERLAP CONTENT */}
      <section className="relative z-20 -mt-24 md:-mt-36">
        <SliderArea />
        <SliderArea />
        <SliderArea />

        {/* optional */}
        {/* <InfoSection /> */}
      </section>
    </div>
  );
}
