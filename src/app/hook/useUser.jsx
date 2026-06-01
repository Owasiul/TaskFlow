"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const useUser = () => {
  const [user, setUser] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUser = async () => {
      if (!session?.user?._id) return;

      try {
        const response = await fetch(
          `/api/auth/users?email=${session.user._id}`,
        );
        const userData = await response.json();
        setUser(userData);
        console.log({ userData });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [session?.user?.email]);

  return user;
};

export default useUser;
