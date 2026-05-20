import { Stars } from "lucide-react";
import React from "react";

const About = () => {
  return (
    <div className="h-screen w-full p-3">
      <h2 className="text-2xl font-bold flex flex-1 border-b border-slate-300 dark:border-white pb-2 text-violet-800 dark:text-pink-400">
        <Stars className="text-lg mx-2 text-violet-800 dark:text-pink-400" /> About Us
      </h2>
      <p className="text-xl text-wrap font-medium text-slate-950 dark:text-white  text-justify mx-auto mt-2">
        We are a team driven by the belief that productivity should feel
        effortless, not overwhelming. Our journey began with a simple idea: to
        create a task management solution that blends clarity, collaboration,
        and creativity into one seamless experience. With backgrounds in
        technology, design, and workflow optimization, we set out to build a
        platform that empowers individuals and teams to organize their goals,
        track progress, and celebrate achievements without the clutter of
        traditional tools. Every feature we design—from intuitive dashboards to
        smart reminders—is crafted with the user in mind, ensuring
        accessibility, simplicity, and scalability. At our core, we are
        passionate about helping people unlock their potential, whether they’re
        managing personal projects or leading dynamic teams. We believe that
        when tasks are managed with precision and ease, productivity transforms
        into progress, and progress into success.
      </p>
    </div>
  );
};

export default About;
