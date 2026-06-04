"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useUser from "../hook/useUser";
import SideBar from "./components/SideBar";
import { Menu, X } from "lucide-react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import TaskContent from "./components/TaskContent";
import DashboardStats from "./components/DashboardStats";
import DashboardSidebar from "./components/DashboardSidebar";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState(0);
  const [isWide, setIsWide] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTagInput, setShowTagInput] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [cloudinaryUrl, setCloudinaryUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const { data: session } = useSession();

  const userID = session?.user?._id;
  const { data: tasks = [] } = useQuery({
    queryKey: ["task", userID],
    queryFn: async () => {
      const response = await fetch(`/api/dashboard/${userID}`);
      if (!response.ok) {
        toast.warning("Something went wrong");
        return [];
      }
      return response.json();
    },
    enabled: !!userID,
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tags: [], // important
    },
  });

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

    // Local preview
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result); // ← was setProfilePreview
    reader.readAsDataURL(file);
    setValue("coverPhoto", file, { shouldValidate: true });

    await uploadToCloudinary(file);
  };

  // Watch tags value from form
  const formTags = watch("tags") || [];

  // add and remove tag
  const addTag = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();

      const newTags = [...formTags, tagInput.trim()];

      setValue("tags", newTags); // ← Important: Update form state
      setTagInput("");
      setShowTagInput(false);
    }
  };

  const removeTag = (index) => {
    const newTags = formTags.filter((_, i) => i !== index);
    setValue("tags", newTags); // ← Important: Update form state
  };

  useEffect(() => {
    const updateWidth = () => setIsWide(window.innerWidth >= 1024);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    setMounted(true);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  if (!mounted) {
    return null;
  }

  // add task
  const handleAddTask = async (data) => {
    const userID = session?.user?._id;
    if (!userID) {
      toast.warning("Please login first");
    }
    const formData = {
      ...data,
      photoURL: cloudinaryUrl ?? null,
      userID,
    };

    const result = await fetch(`/api/dashboard`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const responseData = await result.json();

    console.log("responce is", responseData);

    if (result.ok) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-950">
      {/* Sidebar */}
      <aside
        className={`
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0
          fixed lg:relative
          top-0 left-0
          h-screen
          w-full md:w-72 lg:w-80
          bg-white dark:bg-gray-900
          
          shadow-md lg:shadow-none
          transition-transform duration-300 ease-in-out
          z-40
          overflow-y-auto
        `}
      >
        <SideBar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isWide={isWide}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          handleSubmit={handleSubmit}
          handleAddTask={handleAddTask}
          register={register}
          errors={errors}
          handleImageChange={handleImageChange}
          imagePreview={imagePreview}
          cloudinaryUrl={cloudinaryUrl}
          uploading={uploading}
          formTags={formTags}
          removeTag={removeTag}
          addTag={addTag}
          showTagInput={showTagInput}
          setShowTagInput={setShowTagInput}
          setTagInput={setTagInput}
          tagInput={tagInput}
        />
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
          role="presentation"
        />
      )}

      {/* Main Content */}
      <main className="flex-1 w-full overflow-y-auto">
        <div className="p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-3">
              <DashboardStats tasks={tasks} />
              <TaskContent session={session} tasks={tasks} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <DashboardSidebar />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
