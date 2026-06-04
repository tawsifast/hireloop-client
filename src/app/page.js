import Banner from "@/components/Banner";
import Hero from "@/components/BanStats";
import StatsSection from "@/components/Stats";
import Stats from "@/components/Stats";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <Banner/>
      <StatsSection/>
      {/* <Hero/> */}
    </div>
  );
}
