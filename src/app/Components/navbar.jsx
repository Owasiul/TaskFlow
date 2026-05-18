"use client";
import Link from "next/link";
import React from "react";
import { ToggleTheme } from "./ThemeToggle/Theme";

const Navbar = () => {
  const navItems = [
    <li
      className="text-lg font-semibold dark:hover:text-pink-400 hover:text-violet-800 "
      key="home"
    >
      <Link href="/">Product</Link>
    </li>,
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
      <Link href="/About">About</Link>
    </li>,
  ];
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm px-2">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navItems}
            </ul>
          </div>
          <a className="text-3xl text-violet-800 dark:text-pink-400 font-bold ">
            TaskFlow
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end flex flex-1 gap-5">
          <ToggleTheme />
          <Link
            href={`/login`}
            className="text-violet-800 dark:text-pink-400 font-semibold"
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
