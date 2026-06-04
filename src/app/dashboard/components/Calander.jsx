"use client";
import { Calendar } from "@heroui/react";
import React from "react";

const Calander = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
      <Calendar
        aria-label="Event date"
        className="w-full"
        classNames={{
          header: "mb-2",
          heading: "text-sm font-semibold text-gray-700 dark:text-gray-300",
          gridHeader: "mb-2",
          headerCell: "text-xs font-semibold text-gray-500 dark:text-gray-400",
          cell: "text-xs",
        }}
      >
        <Calendar.Header>
          <Calendar.Heading />
          <Calendar.NavButton slot="previous" />
          <Calendar.NavButton slot="next" />
        </Calendar.Header>
        <Calendar.Grid>
          <Calendar.GridHeader>
            {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
          </Calendar.GridHeader>
          <Calendar.GridBody>
            {(date) => <Calendar.Cell date={date} />}
          </Calendar.GridBody>
        </Calendar.Grid>
      </Calendar>
    </div>
  );
};

export default Calander;
