"use client";
import {
  PlusCircle,
  Users,
  LayoutGrid,
  ClipboardList,
  FileText,
  MessageCircle,
  Share2,
  Clock,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  children,
  className,
  gradient = false,
  iconBg = "bg-violet-100",
  iconColor = "text-violet-700",
}) => (
  // Card
  <div
    className={`
      group relative overflow-hidden rounded-2xl p-8 flex flex-col
      transition-all duration-300 hover:-translate-y-1
      shadow-sm hover:shadow-md
      ${gradient ? "bg-linear-to-br from-violet-50 to-white" : "bg-white"}
      ${className}
    `}
  >
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-br from-violet-50/60 to-transparent pointer-events-none" />

    <div
      className={`
        w-12 h-12 rounded-xl flex items-center justify-center mb-6
        transition-all duration-300 group-hover:scale-110 group-hover:rotate-3
        ${gradient ? "bg-violet-600 text-white shadow-lg" : `${iconBg} ${iconColor}`}
      `}
    >
      <Icon className="w-6 h-6" />
    </div>

    <h3 className="text-base font-bold text-gray-900 mb-3 tracking-tight">
      {title}
    </h3>

    <p className="text-sm font-medium text-gray-600 mb-6 leading-relaxed">
      {description}
    </p>

    {children}
  </div>
);

const Features = () => {
  const features = [
    {
      icon: LayoutGrid,
      title: "Visual Boards",
      description:
        "Map out your workflows visually with a fluid, drag-and-drop interface. Customize columns, set WIP limits, and track progress at a glance.",
      gradient: true,
      preview: "board",
      iconBg: "bg-violet-100",
      iconColor: "text-violet-700",
    },
    {
      icon: ClipboardList,
      title: "Smart Tasks",
      description:
        "Create tasks instantly with rich metadata. Add priorities, due dates, attachments, and subtasks to stay organized.",
      preview: "tasks",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-700",
    },
    {
      icon: FileText,
      title: "Rich Documents",
      description:
        "Write beautiful documents with our markdown editor. Embed images, code blocks, and collaborative comments.",
      preview: "notes",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-700",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description:
        "Work together seamlessly with real-time updates, @mentions, and threaded discussions. Perfect for remote teams.",
      preview: "collaboration",
      iconBg: "bg-sky-100",
      iconColor: "text-sky-700",
    },
    {
      icon: MessageCircle,
      title: "Smart Comments",
      description:
        "Leave feedback, tag teammates, and resolve discussions directly on tasks and documents.",
      preview: "comments",
      iconBg: "bg-pink-100",
      iconColor: "text-pink-700",
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description:
        "Share boards with view or edit permissions. Export to PDF, CSV, or generate public links instantly.",
      preview: "share",
      iconBg: "bg-sky-100",
      iconColor: "text-sky-700",
    },
  ];

  return (
    <section className="w-full bg-[#f9f9ff] py-24 relative overflow-hidden rounded-md">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-100/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-100/40 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              Features
            </span>
          </div>

          <h2 className="font-bold text-3xl text-gray-900 mb-4 tracking-tight">
            Everything you need, nothing you don&apos;t.
          </h2>

          <p className="text-lg font-medium text-gray-600 max-w-2xl mx-auto">
            Powerful primitives designed for focus and seamless collaboration.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              gradient={feature.gradient}
              iconBg={feature.iconBg}
              iconColor={feature.iconColor}
              className="h-full"
            >
              <div className="mt-auto pt-4">
                {feature.preview === "board" && (
                  <div className="rounded-xl p-4 bg-violet-50/60">
                    <div className="flex gap-3">
                      <div className="flex-1 space-y-3">
                        <div className="h-2 w-3/4 bg-violet-300 rounded-full animate-pulse" />
                        <div className="space-y-2">
                          <div className="h-16 bg-white/70 rounded-lg" />
                          <div className="h-12 bg-white/70 rounded-lg" />
                        </div>
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="h-2 w-1/2 bg-gray-200 rounded-full" />
                        <div className="space-y-2">
                          <div className="h-20 bg-white/70 rounded-lg" />
                          <div className="h-8 bg-white/70 rounded-lg" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {feature.preview === "tasks" && (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="w-4 h-4 rounded border-2 border-amber-400 shrink-0" />
                        <div className="flex-1">
                          <div className="h-3 w-full bg-gray-200 rounded" />
                        </div>
                        {i === 1 && (
                          <span className="px-2 py-1 bg-amber-100 rounded text-xs text-amber-700 font-semibold whitespace-nowrap">
                            High
                          </span>
                        )}
                        <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                      </div>
                    ))}
                  </div>
                )}

                {feature.preview === "notes" && (
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 bg-emerald-100 rounded" />
                      <div className="h-4 w-32 bg-gray-200 rounded" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-gray-200 rounded" />
                      <div className="h-2 w-5/6 bg-gray-200 rounded" />
                      <div className="h-2 w-4/6 bg-gray-200 rounded" />
                    </div>
                  </div>
                )}

                {feature.preview === "collaboration" && (
                  <div className="flex flex-wrap gap-3">
                    <div className="flex -space-x-2">
                      {[
                        {
                          initials: "AM",
                          bg: "bg-violet-100",
                          text: "text-violet-700",
                        },
                        {
                          initials: "JD",
                          bg: "bg-pink-100",
                          text: "text-pink-700",
                        },
                        {
                          initials: "RK",
                          bg: "bg-emerald-100",
                          text: "text-emerald-700",
                        },
                        {
                          initials: "ML",
                          bg: "bg-amber-100",
                          text: "text-amber-700",
                        },
                      ].map(({ initials, bg, text }, i) => (
                        <div
                          key={i}
                          className={`w-10 h-10 rounded-full border-2 border-white ${bg} ${text} flex items-center justify-center text-xs font-bold`}
                        >
                          {initials}
                        </div>
                      ))}
                      <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center">
                        <PlusCircle className="w-4 h-4 text-gray-500" />
                      </div>
                    </div>
                    <div className="flex-1 h-10 bg-gray-50 rounded-lg flex items-center px-3 text-sm font-medium text-gray-500">
                      + Invite team members
                    </div>
                  </div>
                )}

                {feature.preview === "comments" && (
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-violet-100 shrink-0" />
                      <div className="flex-1 bg-gray-50 rounded-lg p-3">
                        <div className="text-xs font-bold text-gray-800 mb-1">
                          Sarah
                        </div>
                        <div className="text-xs font-medium text-gray-600">
                          This looks great!
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3 pl-8">
                      <div className="w-8 h-8 rounded-full bg-pink-100 shrink-0" />
                      <div className="flex-1 bg-gray-50 rounded-lg p-3">
                        <div className="text-xs font-bold text-gray-800 mb-1">
                          Mike
                        </div>
                        <div className="text-xs font-medium text-gray-600">
                          Let&apos;s ship it!
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {feature.preview === "share" && (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <div className="flex-1 h-10 bg-gray-50 rounded-lg flex items-center px-3 text-sm font-medium text-gray-500 truncate">
                        https://app.yourapp.com/board
                      </div>
                      <button className="px-4 h-10 bg-violet-600 text-white rounded-lg text-sm font-semibold hover:bg-violet-700 transition-colors">
                        Copy
                      </button>
                    </div>
                    <div className="flex gap-2">
                      {["PDF", "CSV", "Public link"].map((label) => (
                        <span
                          key={label}
                          className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-xs font-semibold"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </FeatureCard>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-all hover:scale-105 shadow-lg hover:shadow-xl">
            <Link href={`/register`}> Get Started Free </Link>
            <Sparkles className="w-4 h-4" />
          </button>
          <p className="text-sm font-medium text-gray-500 mt-4">
            No credit card required &middot; Free forever plan available
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
