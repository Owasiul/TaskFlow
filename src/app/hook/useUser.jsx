"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchUser = async () => {
      // Wait until session is fully loaded
      if (status === "loading") return;

      if (!session?.user) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        // Use session.user.id (NextAuth standard) or fallback to _id
        const userId = session.user.id || session.user._id;

        if (!userId) {
          setUser(null);
          setLoading(false);
          return;
        }

        const response = await fetch(`/api/auth/users?id=${userId}`);
        if (!response.ok) throw new Error("Failed to fetch user");

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [session, status]);

  return { user, loading, isAuthenticated: !!user || !!session };
};

export default useUser;
