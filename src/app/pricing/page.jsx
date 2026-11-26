import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export const metadata = {
  title: "Pricing",
  description:
    "Compare TaskFlow plans and find a simple way to organize your work.",
};

const plans = [
  {
    name: "Free",
    price: "0",
    unit: "forever",
    summary: "A clear starting point for your personal work.",
    features: [
      "Tasks, boards, and due dates",
      "Priorities for your day",
      "A personal workspace",
    ],
    action: "Start for free",
  },
  {
    name: "Pro",
    price: "8",
    unit: "per member / month",
    summary: "More room to manage projects and keep momentum.",
    features: [
      "Everything in Free",
      "More project boards and views",
      "Progress tracking across projects",
      "Organized notes alongside your work",
    ],
    action: "Get started with Pro",
    featured: true,
  },
  {
    name: "Team",
    price: "12",
    unit: "per member / month",
    summary: "Shared plans that help your team move together.",
    features: [
      "Everything in Pro",
      "Shared team workspaces",
      "Comments and project updates",
      "Simple sharing with teammates",
    ],
    action: "Get started with Team",
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl py-8 text-slate-900 dark:text-slate-100 md:py-14">
      <section className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-violet-700 dark:text-pink-400">
          Simple pricing
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          A plan for the way you work.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
          Start with the essentials for free. When your projects or team grow,
          choose a plan with more room to work together.
        </p>
      </section>

      <section
        aria-label="TaskFlow plans"
        className="mt-12 grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3"
      >
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={`relative flex flex-col rounded-xl border p-6 sm:p-7 ${
              plan.featured
                ? "border-violet-700 bg-violet-50/70 dark:border-pink-400 dark:bg-slate-900"
                : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
            }`}
          >
            {plan.featured && (
              <span className="absolute right-5 top-5 rounded-md bg-violet-700 px-3 py-1 text-xs font-bold text-white dark:bg-pink-400 dark:text-slate-950">
                Most popular
              </span>
            )}
            <div>
              <h2 className="text-xl font-bold">{plan.name}</h2>
              <p className="mt-2 min-h-12 max-w-xs leading-6 text-slate-600 dark:text-slate-300">
                {plan.summary}
              </p>
            </div>

            <div className="mt-7 flex min-h-16 items-end gap-2">
              <span className="self-start pt-1 text-lg font-semibold">$</span>
              <span className="text-5xl font-bold tracking-tight">
                {plan.price}
              </span>
              <span className="pb-1 text-sm text-slate-500 dark:text-slate-400">
                {plan.unit}
              </span>
            </div>

            <Link
              href="/register"
              className={`mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-4 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700 ${
                plan.featured
                  ? "bg-violet-700 text-white hover:bg-violet-800 dark:bg-pink-400 dark:text-slate-950 dark:hover:bg-pink-300"
                  : "border border-slate-300 text-slate-900 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {plan.action} <ArrowRight aria-hidden="true" size={18} />
            </Link>

            <div className="mt-7 border-t border-slate-200 pt-6 dark:border-slate-700">
              <p className="text-sm font-semibold">What&apos;s included</p>
              <ul className="mt-4 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300"
                  >
                    <Check
                      aria-hidden="true"
                      size={18}
                      className="mt-0.5 shrink-0 text-violet-700 dark:text-pink-400"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>

      <p className="mt-5 text-center text-sm text-slate-500 dark:text-slate-400">
        Paid plan prices are shown in USD per member, billed monthly.
      </p>

      <section className="mt-16 grid gap-6 border-t border-slate-200 pt-10 dark:border-slate-700 md:grid-cols-[0.8fr_1.2fr] md:gap-12">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-violet-700 dark:text-pink-400">
            Need a hand choosing?
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight">
            Begin with what you need today.
          </h2>
        </div>
        <div className="space-y-5">
          <div>
            <h3 className="font-semibold">Which plan should I start with?</h3>
            <p className="mt-1 leading-7 text-slate-600 dark:text-slate-300">
              If you&apos;re organizing your own tasks, Free is a good place to
              begin. Choose Team when shared projects and updates are part of
              your everyday work.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Can I get started without paying?</h3>
            <p className="mt-1 leading-7 text-slate-600 dark:text-slate-300">
              Yes. Create a free account and explore TaskFlow at your own pace.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
