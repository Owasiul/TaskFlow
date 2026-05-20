"use client";
import Link from "next/link";
import React from "react";
import { ToggleTheme } from "./ThemeToggle/Theme";
import { MenuIcon } from "lucide-react";

const Navbar = () => {
  const navItems = [
    <li
      className="text-lg font-semibold dark:hover:text-pink-400 hover:text-violet-800 "
      key="solutions"
    >
      <Link href="/solutions">Solutions</Link>
    </li>,
    <li
      className="text-lg font-semibold dark:hover:text-pink-400 hover:text-violet-800 "
      key="pricing"
    >
      <Link href="/pricing">Pricing</Link>
    </li>,
    <li
      className="text-lg font-semibold dark:hover:text-pink-400 hover:text-violet-800 "
      key="about"
    >
      <Link href="/about">About</Link>
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow  text-white gap-5 font-semibold"
            >
              <div className="lg:hidden block">
                <ToggleTheme />
              </div>
              {navItems}
            </ul>
          </div>
          <Link
            href={`/`}
            className="text-3xl text-violet-800 dark:text-pink-400 font-bold "
          >
            TaskFlow
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-slate-950 dark:text-white">
            {navItems}
          </ul>
        </div>
        <div className="navbar-end flex flex-1 gap-5">
          <div className="lg:block hidden">
            <ToggleTheme />
          </div>

          <Link
            href={`/login`}
            className="text-violet-800 dark:text-pink-400 font-semibold md:block hidden"
          >
            Login
          </Link>
          <Link href={`/register`} className="">
            <button className="btn rounded w-24 bg-violet-800 dark:bg-pink-400 text-white font-semibold text-nowrap">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
