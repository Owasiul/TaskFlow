"use client";

import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("/api/auth/users");
      return res.json();
    },
  });
  // console.log(data);
  return (
    <div>
      <h1 className="text-4xl text-black">Hello From dashboard</h1>
    </div>
  );
};

export default Dashboard;
