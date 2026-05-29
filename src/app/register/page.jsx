"use client";
import { Eye, EyeOff, Upload, X, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Register = () => {
  const { handleSubmit, register } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [profilePreview, setProfilePreview] = useState(null); // base64 for local preview
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [cloudinaryUrl, setCloudinaryUrl] = useState(null); // final hosted URL
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const router = useRouter();

  const uploadToCloudinary = async (file) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
      );

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData },
      );
      const data = await res.json();
      if (data.secure_url) {
        setCloudinaryUrl(data.secure_url);
      } else {
        alert("Image upload failed. Please try again.");
      }
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      alert("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProfileImageFile(file);
    setCloudinaryUrl(null);

    const reader = new FileReader();
    reader.onloadend = () => setProfilePreview(reader.result);
    reader.readAsDataURL(file);

    await uploadToCloudinary(file); // ← await it
  };
  const removeImage = (e) => {
    e.stopPropagation();
    setProfilePreview(null);
    setProfileImageFile(null);
    setCloudinaryUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const submitForm = async (data) => {
    if (uploading) {
      alert("Please wait for the image to finish uploading.");
      return;
    }

    const formData = {
      name: data.name,
      email: data.email,
      password: data.password,
      photoURL: cloudinaryUrl || null, // hosted Cloudinary URL or null if skipped
    };

    try {
      const result = await fetch("/api/auth/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const resData = await result.json();
      if (resData.success === false) {
        toast.error(resData.message);
      } else {
        toast.success("Registration successful!");
        router.push("/dashboard");
      }
      console.log("User registered successfully:", resData);
      return resData;
    } catch (error) {
      console.error("Registration failed:", error);
    }
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

              {/* Profile Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Profile Picture{" "}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </label>

                {/* Hidden native file input — NOT registered with react-hook-form
                    because we send the Cloudinary URL string, not the raw file */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="profile-image-input"
                />

                {profilePreview ? (
                  /* Preview state */
                  <div className="flex items-center gap-4 px-4 py-3 bg-zinc-100 rounded-2xl border border-transparent">
                    <div className="relative w-12 h-12 shrink-0">
                      {/* Plain <img> for local base64 preview — CldImage only works with Cloudinary public IDs */}
                      <Image
                        width={100}
                        height={100}
                        src={profilePreview}
                        alt="Profile preview"
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-400"
                      />
                      {/* Upload spinner overlay */}
                      {uploading && (
                        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40">
                          <Loader2
                            size={16}
                            className="text-white animate-spin"
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-700 truncate">
                        {profileImageFile?.name}
                      </p>
                      <p className="text-xs mt-0.5">
                        {uploading ? (
                          <span className="text-purple-500">Uploading…</span>
                        ) : cloudinaryUrl ? (
                          <span className="text-green-500">Uploaded ✓</span>
                        ) : (
                          <span className="text-gray-400">
                            {profileImageFile
                              ? (profileImageFile.size / 1024).toFixed(0) +
                                " KB"
                              : ""}
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-xs text-purple-600 hover:text-purple-700 font-medium"
                        disabled={uploading}
                      >
                        Change
                      </button>
                      <button
                        type="button"
                        onClick={removeImage}
                        className="p-1 text-gray-400 hover:text-red-500 transition"
                        disabled={uploading}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Empty / drop-zone state */
                  <label
                    htmlFor="profile-image-input"
                    className="flex items-center gap-4 px-4 py-3 bg-zinc-100 rounded-2xl border border-dashed border-zinc-300 hover:border-purple-400 hover:bg-purple-50 cursor-pointer transition group"
                  >
                    <div className="w-12 h-12 rounded-full bg-zinc-200 group-hover:bg-purple-100 flex items-center justify-center shrink-0 transition">
                      <Upload
                        size={18}
                        className="text-gray-400 group-hover:text-purple-500 transition"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 group-hover:text-purple-600 transition">
                        Upload a photo
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        PNG, JPG, GIF up to 5 MB
                      </p>
                    </div>
                  </label>
                )}
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-2xl transition mt-4 flex items-center justify-center gap-2"
              >
                {uploading && <Loader2 size={18} className="animate-spin" />}
                {uploading ? "Uploading image…" : "Create account"}
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
                <button
                  onClick={() => signIn("google")}
                  className="flex-1 flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 py-3 rounded-2xl transition"
                >
                  <Image
                    width={20}
                    height={20}
                    src={"https://www.google.com/favicon.ico"}
                    alt="Google"
                    className="w-5 h-5"
                  />
                  <span className="text-sm font-medium text-slate-900">
                    Google
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Illustration */}
          <div className="hidden md:block md:w-7/12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://picsum.photos/id/1015/1200/900')] bg-cover bg-center"></div>
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
