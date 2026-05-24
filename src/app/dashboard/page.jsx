"use client";

import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const query = useQuery()
  return (
    <div>
      <h1 className="text-4xl text-black">Hello From dashboard</h1>
    </div>
  );
};

export default Dashboard;
