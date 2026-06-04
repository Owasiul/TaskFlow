"use client";
import React from "react";
import Timer from "./Timer";
import Calander from "./Calander";


const DashboardSidebar = () => {
  return (
    <aside className="w-full lg:w-80 space-y-5">
      <Timer />
      <Calander />
    </aside>
  );
};

export default DashboardSidebar;
