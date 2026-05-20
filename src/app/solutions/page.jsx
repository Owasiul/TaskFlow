import { Stars } from "lucide-react";
import React from "react";

const Solutions = () => {
  return (
    <div className="h-screen w-full p-3">
      <h2 className="text-2xl font-bold flex flex-1 border-b border-slate-300 dark:border-white pb-2 text-violet-800 dark:text-pink-400">
        <Stars className="text-lg mx-2 text-violet-800 dark:text-pink-400" /> Solution Overview
      </h2>
      <p className="text-xl text-wrap font-medium text-slate-950 dark:text-white  text-justify mx-auto mt-2">
        {" "}
        Our Task Management web app is designed to simplify productivity by
        bringing clarity and control to your daily workflow. With intuitive
        dashboards, category-based organization, and smart reminders, it helps
        users prioritize tasks, collaborate seamlessly, and track progress in
        real time. Whether managing personal goals or team projects, the app
        ensures that every task is visible, actionable, and aligned with
        deadlines. By combining a clean interface with scalable backend logic,
        it empowers users to stay focused, reduce clutter, and achieve more with
        less effort.
      </p>
    </div>
  );
};

export default Solutions;
