import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Focus,
  HeartHandshake,
  Layers3,
} from "lucide-react";

export const metadata = {
  title: "About TaskFlow",
  description:
    "Learn how TaskFlow helps people bring clarity and calm to their everyday work.",
};

const principles = [
  {
    icon: Focus,
    title: "Make focus easier",
    description:
      "A clear next step beats a crowded screen. TaskFlow keeps the work in front of you easy to understand.",
  },
  {
    icon: Layers3,
    title: "Keep work connected",
    description:
      "Tasks, projects, and notes belong together, so the details you need stay close to the work they support.",
  },
  {
    icon: HeartHandshake,
    title: "Make progress together",
    description:
      "Shared plans help people see what is moving, what needs attention, and where a teammate can help.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-16 py-8 text-slate-900 dark:text-slate-100 md:py-14">
      <section className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-violet-700 dark:text-pink-400">
            About TaskFlow
          </p>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Productivity should feel clear, not complicated.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            TaskFlow is a calmer place to plan the work that matters. Bring your
            tasks and projects into one thoughtful workspace, see what comes
            next, and make steady progress without adding more noise to your day.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/register"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-violet-700 px-5 font-semibold text-white transition-colors hover:bg-violet-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700 dark:bg-pink-400 dark:text-slate-950 dark:hover:bg-pink-300"
            >
              Get started for free <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex min-h-12 items-center rounded-lg px-4 font-semibold text-violet-800 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700 dark:text-pink-300"
            >
              Explore pricing
            </Link>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-7"
        >
          <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-5 dark:border-slate-700">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Your workspace
              </p>
              <h2 className="mt-1 text-xl font-bold">A little more in control</h2>
            </div>
            <span className="rounded-md bg-violet-50 px-3 py-1.5 text-sm font-semibold text-violet-800 dark:bg-violet-950 dark:text-violet-200">
              This week
            </span>
          </div>
          <div className="space-y-3 pt-5">
            {[
              ["Choose your priorities", true],
              ["Plan the project kickoff", true],
              ["Review the team's progress", false],
            ].map(([task, done]) => (
              <div
                key={task}
                className="flex items-center gap-3 rounded-lg border border-slate-200 px-4 py-3 dark:border-slate-700"
              >
                <CheckCircle2
                  aria-hidden="true"
                  size={20}
                  className={
                    done
                      ? "shrink-0 text-violet-700 dark:text-pink-400"
                      : "shrink-0 text-slate-400"
                  }
                />
                <span
                  className={`text-sm font-medium ${done ? "text-slate-500 line-through dark:text-slate-400" : "text-slate-800 dark:text-slate-100"}`}
                >
                  {task}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-lg bg-violet-50 p-4 dark:bg-slate-800">
            <p className="text-sm font-semibold text-violet-900 dark:text-violet-200">
              Progress, at a glance
            </p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-violet-100 dark:bg-slate-700">
              <div className="h-full w-2/3 rounded-full bg-violet-700 dark:bg-pink-400" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 py-12 dark:border-slate-700">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-violet-700 dark:text-pink-400">
            Why we&apos;re here
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Good tools give your attention back.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Work gets harder when plans are scattered and every task competes
            for attention. We built TaskFlow around a simple idea: your tools
            should make the day easier to navigate. A clear plan helps you focus
            on the next useful step, work with others, and notice the progress
            you are making.
          </p>
        </div>
      </section>

      <section>
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-violet-700 dark:text-pink-400">
            What guides us
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Built around the way work happens.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {principles.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900"
            >
              <span className="mb-5 inline-flex rounded-lg bg-violet-50 p-3 text-violet-800 dark:bg-slate-800 dark:text-pink-300">
                <Icon aria-hidden="true" size={22} />
              </span>
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="flex flex-col justify-between gap-6 rounded-xl bg-violet-50 p-6 dark:bg-slate-900 sm:flex-row sm:items-center sm:p-8">
        <div>
          <h2 className="text-2xl font-bold">Make room for meaningful work.</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Start with a free workspace and build a rhythm that works for you.
          </p>
        </div>
        <Link
          href="/register"
          className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-violet-700 px-5 font-semibold text-white transition-colors hover:bg-violet-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700 dark:bg-pink-400 dark:text-slate-950 dark:hover:bg-pink-300"
        >
          Create your workspace <ArrowRight aria-hidden="true" size={18} />
        </Link>
      </section>
    </div>
  );
}
