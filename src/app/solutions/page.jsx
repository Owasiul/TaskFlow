import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Flag,
  Focus,
  Layers3,
} from "lucide-react";

export const metadata = {
  title: "Solutions",
  description:
    "Plan tasks, keep deadlines and priorities visible, and make time for focused work with TaskFlow.",
};

const solutions = [
  {
    icon: Layers3,
    title: "Bring the details together",
    description:
      "Give each task a useful title, description, due date, priority, and tags. Keep the context close to the work instead of scattered across notes.",
  },
  {
    icon: Flag,
    title: "Know what needs attention",
    description:
      "Make priorities easy to scan and keep due dates visible on your task cards, so you can choose a sensible next step.",
  },
  {
    icon: Focus,
    title: "Make space for focused work",
    description:
      "Use the built-in focus timer and a simple progress overview to settle into a work session and see what you have completed.",
  },
];

const steps = [
  {
    number: "01",
    title: "Capture the task",
    description:
      "Write down the work, add the details you need, and attach a due date or priority.",
  },
  {
    number: "02",
    title: "Organize your day",
    description:
      "Use tags and task status to keep related work easy to find and understand.",
  },
  {
    number: "03",
    title: "Focus and move forward",
    description:
      "Work through one clear next step, then check your dashboard to see your progress.",
  },
];

export default function SolutionsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-16 py-8 text-slate-900 dark:text-slate-100 md:space-y-20 md:py-14">
      <section className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-14">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-violet-700 dark:text-pink-400">
            Solutions
          </p>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Turn a crowded to-do list into a clear next step.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            TaskFlow gives your everyday work one calm home. Keep task details,
            deadlines, and priorities together, then use a focused dashboard to
            decide what to work on next.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/register"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-violet-700 px-5 font-semibold text-white transition-colors hover:bg-violet-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700 dark:bg-pink-400 dark:text-slate-950 dark:hover:bg-pink-300"
            >
              Try TaskFlow for free <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex min-h-12 items-center rounded-lg px-4 font-semibold text-violet-800 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700 dark:text-pink-300"
            >
              Compare plans
            </Link>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6"
        >
          <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4 dark:border-slate-700">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Your workspace
              </p>
              <h2 className="mt-1 text-xl font-bold">Today&apos;s focus</h2>
            </div>
            <span className="rounded-md bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-800 dark:bg-violet-950 dark:text-violet-200">
              3 tasks
            </span>
          </div>

          <div className="space-y-3 py-5">
            {[
              {
                title: "Outline the project plan",
                priority: "High",
                due: "Today",
                selected: true,
              },
              {
                title: "Review the notes",
                priority: "Medium",
                due: "Tomorrow",
                selected: false,
              },
              {
                title: "Prepare a status update",
                priority: "Low",
                due: "Friday",
                selected: false,
              },
            ].map((task) => (
              <div
                key={task.title}
                className={`rounded-lg border p-4 ${
                  task.selected
                    ? "border-violet-300 bg-violet-50/70 dark:border-violet-800 dark:bg-slate-800"
                    : "border-slate-200 dark:border-slate-700"
                }`}
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    aria-hidden="true"
                    size={19}
                    className="mt-0.5 shrink-0 text-slate-400"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold leading-6">{task.title}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                      <span className="inline-flex items-center gap-1.5">
                        <Flag aria-hidden="true" size={13} /> {task.priority} priority
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar aria-hidden="true" size={13} /> {task.due}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 border-t border-slate-200 pt-4 dark:border-slate-700">
            <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Completed
              </p>
              <p className="mt-1 text-xl font-bold">04</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Focus session
              </p>
              <p className="mt-1 inline-flex items-center gap-2 text-xl font-bold">
                <Clock aria-hidden="true" size={18} className="text-violet-700 dark:text-pink-400" />
                25 min
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-violet-700 dark:text-pink-400">
            A simpler workflow
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            The tools you need for everyday progress.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {solutions.map(({ icon: Icon, title, description }) => (
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

      <section className="grid gap-8 rounded-xl bg-violet-50 p-6 dark:bg-slate-900 sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-violet-700 dark:text-pink-400">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">
            A small routine that keeps work moving.
          </h2>
        </div>
        <ol className="space-y-5">
          {steps.map((step) => (
            <li
              key={step.number}
              className="flex gap-4 border-b border-violet-200 pb-5 last:border-0 last:pb-0 dark:border-slate-700"
            >
              <span className="pt-0.5 text-sm font-bold text-violet-700 dark:text-pink-400">
                {step.number}
              </span>
              <div>
                <h3 className="font-bold">{step.title}</h3>
                <p className="mt-1 leading-7 text-slate-600 dark:text-slate-300">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="flex flex-col justify-between gap-6 border-t border-slate-200 pt-10 dark:border-slate-700 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold">Ready for a clearer workday?</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Create a free workspace and start with the task in front of you.
          </p>
        </div>
        <Link
          href="/register"
          className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-violet-700 px-5 font-semibold text-white transition-colors hover:bg-violet-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700 dark:bg-pink-400 dark:text-slate-950 dark:hover:bg-pink-300"
        >
          Get started for free <ArrowRight aria-hidden="true" size={18} />
        </Link>
      </section>
    </div>
  );
}
