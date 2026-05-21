"use client";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Register = () => {
  const { handleSubmit, register } = useForm();
  const [showPassword, setShowPassword] = useState();
  const submitForm = (data) => {
    console.log(data);
  };
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center p-4 shadow-sm">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          {/* Left Side - Form */}
          <div className="md:w-5/12 p-10 md:p-12 flex flex-col">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Create account
              </h1>
            </div>

            <form
              onSubmit={handleSubmit(submitForm)}
              className="mt-8 space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  {...register("name")}
                  className="w-full px-4 py-3 bg-zinc-100 text-slate-800 border border-transparent focus:border-purple-500 rounded-2xl outline-none transition"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full px-4 py-3 bg-zinc-100 text-slate-800 border border-transparent focus:border-purple-500 rounded-2xl outline-none transition"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className="w-full px-4 py-3 bg-zinc-100 text-slate-800 border border-transparent focus:border-purple-500 rounded-2xl outline-none transition"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3.5 rounded-2xl transition mt-4"
              >
                Create account
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              Already have an account?{" "}
              <Link
                href={`/login`}
                className="text-purple-600 font-medium hover:underline"
              >
                Login
              </Link>
            </p>

            {/* Social Buttons */}
            <div className="mt-8">
              <p className="text-center text-xs text-gray-500 mb-4">
                Or continue with
              </p>
              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 py-3 rounded-2xl transition">
                  <Image
                    width={20}
                    height={20}
                    src={"https://www.google.com/favicon.ico"}
                    alt="Google"
                    className="w-5 h-5"
                  />
                  <span className="text-sm font-medium text-slate-900 dark:text-white">
                    Google
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Illustration */}
          <div className="hidden md:block md:w-7/12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://picsum.photos/id/1015/1200/900')] bg-cover bg-center "></div>
            <Image
              width={100}
              height={100}
              src="https://picsum.photos/id/1015/800/900"
              alt="Landscape"
              className="rounded-3xl shadow-2xl object-cover h-full w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
