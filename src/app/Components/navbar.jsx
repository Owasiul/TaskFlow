"use client";
import Link from "next/link";
import React, { useState } from "react";
import { ToggleTheme } from "./ThemeToggle/Theme";
import { MenuIcon } from "lucide-react";
import { Button, Modal } from "@heroui/react";
import Avater from "./Avater/Avater";
import { useSession, signOut } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  const { data: currentUser } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      if (!userId) return null;

      const res = await fetch(`/api/auth/users/${userId}`);
      if (!res.ok) {
        throw new Error("Failed to fetch current user");
      }

      return res.json();
    },
  });

  const isLoggedIn = status === "authenticated";

  const navItems = [
    <li
      className="text-lg font-semibold dark:hover:text-pink-400 hover:text-violet-800"
      key="solutions"
    >
      <Link href="/solutions">Solutions</Link>
    </li>,
    <li
      className="text-lg font-semibold dark:hover:text-pink-400 hover:text-violet-800"
      key="pricing"
    >
      <Link href="/pricing">Pricing</Link>
    </li>,
    <li
      className="text-lg font-semibold dark:hover:text-pink-400 hover:text-violet-800"
      key="about"
    >
      <Link href="/about">About</Link>
    </li>,
    <li
      className={`text-lg font-semibold dark:hover:text-pink-400 hover:text-violet-800 ${isLoggedIn ? "block" : "hidden"}`}
      key="dashboard"
    >
      <Link href="/dashboard">Dashboard</Link>
    </li>,
  ];

  return (
    <div>
      <div className="navbar shadow-sm dark:shadow-white dark:border-b-pink-400 border-b-violet-800 md:px-5">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <MenuIcon className="dark:text-white text-slate-950" />
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-white gap-5 font-semibold"
            >
              <div className="lg:hidden block">
                <ToggleTheme />
              </div>
              {navItems}
            </ul>
          </div>
          <Link
            href="/"
            className="text-3xl text-violet-800 dark:text-pink-400 font-bold"
          >
            TaskFlow
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex lg:items-center">
          <ul className="menu menu-horizontal px-1 text-slate-950 dark:text-white">
            {navItems}
          </ul>
        </div>
        <div className="navbar-end flex flex-1 gap-5">
          <div className="lg:block hidden">
            <ToggleTheme />
          </div>

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <div
                onClick={() => setIsModalOpen(true)}
                className="cursor-pointer"
              >
                <Avater data={currentUser || session?.user} users={currentUser || session?.user} />
              </div>

              <Modal
                isOpen={isModalOpen}
                onOpenChange={(isOpen) => setIsModalOpen(isOpen)}
              >
                <Modal.Backdrop>
                  <Modal.Container>
                    <Modal.Dialog>
                      <Modal.CloseTrigger
                        onClick={() => setIsModalOpen(false)}
                      />
                      <Modal.Header>
                        <Modal.Heading>Profile</Modal.Heading>
                      </Modal.Header>
                      <Modal.Body>
                        <Button
                        className={`btn bg-danger`}
                          onPress={() => {
                            setIsModalOpen(false);
                            signOut({ callbackUrl: "/" });
                          }}
                        >
                          Sign Out
                        </Button>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          slot="close"
                          color="primary"
                          onClick={() => setIsModalOpen(false)}
                        >
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal.Dialog>
                  </Modal.Container>
                </Modal.Backdrop>
              </Modal>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-violet-800 dark:text-pink-400 font-semibold md:block hidden"
              >
                Login
              </Link>
              <Link href="/register">
                <button className="btn rounded w-24 bg-violet-800 dark:bg-pink-400 text-white font-semibold text-nowrap">
                  Get Started
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
