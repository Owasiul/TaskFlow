"use client";
import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import useUser from "../hook/useUser";
import SideBar from "./components/SideBar";
import { Menu, X } from "lucide-react";
import { toast } from "react-toastify";

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
  const user = useUser();

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

  const handleAddTask = async (data) => {
    if (!user?._id) {
      toast.warning("Please login first");
    }
    const formData = {
      ...data,
      photoURL: cloudinaryUrl ?? null,
      userID: user?._id,
    };

    const result = await fetch(`/api/dashboard`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const responseData = await result.json();


    if (result.ok) {
      setIsModalOpen(false);
    }
  };
  return (
    <div>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-900 rounded-xl shadow-lg"
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

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

      {isOpen && !isWide && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
