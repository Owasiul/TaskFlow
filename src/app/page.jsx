// Landing Page
"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Hero from "./Components/Hero";
import Banner from "./Components/Banner";
import Features from "./Components/Features";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  if (status === "loading" || status === "authenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
        <p className="text-lg font-medium">Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <div>
      <Banner />
      <Hero />
      <Features />
    </div>
  );
}
