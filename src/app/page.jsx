// Landing Page
"use client";
import Image from "next/image";
import Navbar from "./Components/navbar";
import Hero from "./Components/Hero";
import Banner from "./Components/Banner";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <main className="w-[98%] mx-auto my-4">
        {/*Banner  */}
        <Banner />
        {/* hero */}
        <Hero />
      </main>
    </div>
  );
}
