"use client";
import React from "react";
import TaskCard from "./TaskCard/TaskCard";
import Masonry from "react-masonry-css";

const TaskContent = ({ session, tasks = [] }) => {
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Recent Tasks
        </h2>
        <a
          href="#"
          className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
        >
          View all
        </a>
      </div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto -ml-5"
        columnClassName="pl-5 bg-clip-padding flex flex-col gap-5"
      >
        {tasks &&
          tasks.map((task) => {
            return <TaskCard key={task._id} task={task} />;
          })}
      </Masonry>
    </div>
  );
};

export default TaskContent;
