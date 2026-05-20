// Landing Page
"use client";
import Image from "next/image";
import Navbar from "./Components/navbar";
import Hero from "./Components/Hero";
import Banner from "./Components/Banner";
import Features from "./Components/Features";
import Footer from "./Components/Footer/Footer";

export default function Home() {
  return (
    <div className="">
      {/*Banner  */}
      <Banner />
      {/* hero */}
      <Hero />
      {/* feature */}
      <Features />
    </div>
  );
}
