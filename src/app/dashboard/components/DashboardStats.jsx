"use client";
import { Card } from "@heroui/react";
import { CheckCircle2, Clock } from "lucide-react";

const DashboardStats = ({ tasks = [] }) => {
  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const inProgressCount = tasks.filter(
    (t) => t.status === "in-progress",
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
      {/* Completed Tasks Card */}
      <Card className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-6 rounded-2xl shadow-lg text-white border-0">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium opacity-90 mb-2">
              Completed Tasks
            </p>
            <h3 className="text-4xl font-bold">{completedCount}</h3>
          </div>
          <div className="p-3 bg-white/20 rounded-lg">
            <CheckCircle2 size={28} />
          </div>
        </div>
      </Card>

      {/* In Progress Card */}
      <Card className="bg-gradient-to-br from-orange-400 to-orange-500 dark:from-orange-500 dark:to-orange-600 p-6 rounded-2xl shadow-lg text-white border-0">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium opacity-90 mb-2">In Progress</p>
            <h3 className="text-4xl font-bold">{inProgressCount}</h3>
          </div>
          <div className="p-3 bg-white/20 rounded-lg">
            <Clock size={28} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardStats;
