"use client";
import { Avatar, Button } from "@heroui/react";
import { Plus } from "lucide-react";

const TeamMembers = () => {
  const members = [
    { id: 1, initials: "A", color: "bg-orange-400" },
    { id: 2, initials: "B", color: "bg-pink-400" },
    { id: 3, initials: "C", color: "bg-teal-400" },
    { id: 4, initials: "D", color: "bg-green-400" },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
          Team Members
        </h3>
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
          6 Members
        </span>
      </div>

      <div className="flex items-center gap-2">
        {members.map((member) => (
          <Avatar
            key={member.id}
            size="sm"
            className={`${member.color} text-white font-semibold cursor-pointer hover:scale-110 transition-transform`}
            name={member.initials}
            color="primary"
          />
        ))}
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 px-2">
          +2
        </span>
        <Button
          isIconOnly
          size="sm"
          variant="light"
          className="text-gray-400 dark:text-gray-500"
        >
          <Plus size={16} />
        </Button>
      </div>
    </div>
  );
};

export default TeamMembers;
