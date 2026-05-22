"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
const Login = () => {
  const { handleSubmit, register } = useForm();
  const [showPassword, setShowPassword] = useState();
  const router = useRouter();
  const submitForm = async (data) => {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      console.log("Login result:", result);
      if (result?.ok) {
        console.log("Login successful, redirecting...");
        router.push(result.url || "/");
      } else {
        console.log("Login failed:", result?.error || "Unknown error");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center p-4 shadow-sm">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          {/* Left Side - Form */}
          <div className="md:w-5/12 p-10 md:p-12 flex flex-col">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            </div>

            <form
              onSubmit={handleSubmit(submitForm)}
              className="mt-8 space-y-6"
            >
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
                Login
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              Already have an account?{" "}
              <Link
                href={`/register`}
                className="text-purple-600 font-medium hover:underline"
              >
                Register
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
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/video1.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
