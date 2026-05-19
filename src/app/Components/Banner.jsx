import Link from "next/link";
import React from "react";

const Banner = () => {
  return (
    <div className="bg-[#f9f9ff] dark:bg-[#e0e0ff] rounded px-5 py-10 flex flex-col items-center gap-5 h-96">
      <div className="flex flex-col justify-center items-center mx-auto gap-5">
        <h1 className="md:text-5xl text-3xl dark:text-pink-400 text-violet-800 font-bold text-center ">
          Organize tasks, notes, and projects effortlessly.
        </h1>
        <p className="text-xl font-semibold dark:text-white text-neutral-900 md:w-[70%] w-full text-center ">
          The minimalist workspace built for deep work. Clear the clutter, focus
          on what matters, and bring calm to your daily workflow.
        </p>
      </div>
      <div className="flex flex-row items-center gap-5 my-5">
        <div className="btn bg-violet-800 dark:bg-pink-400 text-white">
          <Link href={`/register`}>Sign Up for free</Link>
        </div>
        <div className="dark:text-pink-400 text-violet-800 font-semibold text-lg">
          <Link href={`/login`}>Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
