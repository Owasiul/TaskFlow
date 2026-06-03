"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React from "react";
import { toast } from "react-toastify";

const TaskContent = () => {
  const { session } = useSession();
  const userID = session?.user?._id;
  const getTask = useQuery({
    queryKey: ["task"],
    queryFn: async () => {
      const responce = await fetch(`/api/dashboard/${userID}`);
      if (!responce) {
        return toast.warning("Something went wrong");
      }
      return responce.json();
    },
  });
  console.log("users tasks are", getTask.data);
  return (
    <div>
      <h1>HEllo from Content</h1>
    </div>
  );
};

export default TaskContent;
