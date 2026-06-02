"use client";
import React, { useState } from "react";
import { Button, Modal } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Trash2,
  Menu,
  X,
  CheckCircle2,
  BarChart,
  PlusCircleIcon,
} from "lucide-react";

const SideBar = ({
  isOpen,
  setIsOpen,
  isWide,
  isModalOpen,
  setIsModalOpen,
  handleSubmit,
  handleAddTask,
  register,
  errors,
  handleImageChange,
  imagePreview,
  cloudinaryUrl,
  uploading,
  formTags,
  removeTag,
  addTag,
  showTagInput,
  setShowTagInput,
  setTagInput,
  tagInput,
}) => {
  const [activeItem, setActiveItem] = useState(0);
  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: CheckCircle2, label: "My Tasks", href: "/tasks" },
    { icon: BarChart, label: "Statistics", href: "/statistics" },
    { icon: Trash2, label: "Trash", href: "/trash" },
  ];
  const shouldShowSidebar = isOpen || isWide;

  return (
    <div>
      {/* Sidebar */}
      <AnimatePresence>
        {shouldShowSidebar && (
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed lg:static top-0 left-0 h-screen w-72 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 flex flex-col z-40"
          >
            <div className="p-4">
              {/* Button to open modal */}
              <Button
                onPress={() => setIsModalOpen(true)} // Use onPress (recommended by HeroUI)
                className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white py-3 px-4 rounded-2xl font-medium transition-colors"
              >
                <PlusCircleIcon />
                <span>New Task</span>
              </Button>

              {/* Controlled Modal */}
              <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
                <Modal.Backdrop>
                  <Modal.Container size="lg" scrollBehavior="inside">
                    <Modal.Dialog aria-label="task-modal-title">
                      <Modal.CloseTrigger />

                      <Modal.Header
                        id="task-modal-title"
                        className="flex flex-col gap-1 border-b dark:border-b-white border-b-slate-900"
                      >
                        Create New Task
                      </Modal.Header>

                      <Modal.Body className="p-3 space-y-5">
                        <form
                          onSubmit={handleSubmit(handleAddTask)}
                          className="space-y-5"
                          id="task-form"
                        >
                          {/* Task Title */}
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Task Title
                            </label>
                            <input
                              type="text"
                              placeholder="e.g., Design System Refresh"
                              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                              {...register("title", {
                                required: "Title is required",
                              })}
                            />
                            {errors.title && (
                              <p className="text-red-500 text-sm">
                                {errors.title.message}
                              </p>
                            )}
                          </div>

                          {/* Description */}
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Description
                            </label>
                            <textarea
                              placeholder="Add more details about this task..."
                              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none h-20"
                              {...register("description")}
                            />
                          </div>

                          {/* Due Date & Priority */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Due Date
                              </label>
                              <input
                                type="date"
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                                {...register("dueDate", {
                                  required: "Date is required",
                                })}
                              />
                              {errors.dueDate && (
                                <p className="text-red-500 text-sm">
                                  {errors.dueDate.message}
                                </p>
                              )}
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Priority
                              </label>
                              <select
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                                {...register("priority")}
                              >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                              </select>
                            </div>
                          </div>

                          {/* Cover Photo */}
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Cover Photo
                            </label>

                            <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden cursor-pointer hover:border-violet-500 transition-colors">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                                id="cover-photo"
                              />

                              {imagePreview ? (
                                <label
                                  htmlFor="cover-photo"
                                  className="block cursor-pointer"
                                >
                                  <img
                                    src={imagePreview}
                                    alt="Cover preview"
                                    className="w-full h-40 object-cover"
                                  />
                                  {/* Overlay on hover */}
                                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white text-sm font-medium">
                                      {uploading
                                        ? "Uploading..."
                                        : "Change Photo"}
                                    </span>
                                  </div>
                                </label>
                              ) : (
                                // ✅ Empty state
                                <label
                                  htmlFor="cover-photo"
                                  className="cursor-pointer flex flex-col items-center gap-2 p-8"
                                >
                                  {uploading ? (
                                    <div className="w-10 h-10 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                                  ) : (
                                    <svg
                                      className="w-10 h-10 text-gray-400"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4v16m8-8H4"
                                      />
                                    </svg>
                                  )}
                                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    {uploading
                                      ? "Uploading..."
                                      : "Click or drag photo to upload"}
                                  </p>
                                </label>
                              )}
                            </div>

                            {/* ✅ Show Cloudinary URL confirmation */}
                            {cloudinaryUrl && (
                              <p className="text-green-600 dark:text-green-400 text-xs">
                                ✓ Image uploaded successfully
                              </p>
                            )}
                          </div>

                          {/* Tags */}
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Tags
                            </label>

                            <div className="flex flex-wrap gap-2 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 min-h-10">
                              {formTags.map((tag, i) => (
                                <span
                                  key={i}
                                  className="inline-flex items-center gap-1 bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300 px-3 py-1 rounded-full text-sm"
                                >
                                  {tag}
                                  <button
                                    type="button"
                                    onClick={() => removeTag(i)}
                                    className="font-bold hover:text-violet-900 dark:hover:text-violet-100"
                                    aria-label={`Remove tag: ${tag}`}
                                  >
                                    ×
                                  </button>
                                </span>
                              ))}

                              {showTagInput ? (
                                <input
                                  autoFocus
                                  type="text"
                                  value={tagInput}
                                  onChange={(e) => setTagInput(e.target.value)}
                                  onKeyDown={addTag}
                                  onBlur={() => setShowTagInput(false)}
                                  placeholder="Type and press Enter"
                                  className="flex-1 min-w-32 outline-none bg-transparent"
                                />
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setShowTagInput(true)}
                                  className="text-violet-600 dark:text-violet-400 text-sm font-medium hover:underline"
                                >
                                  + Add Tag
                                </button>
                              )}
                            </div>

                            {errors.tags && (
                              <p className="text-red-500 text-sm">
                                {errors.tags.message}
                              </p>
                            )}
                          </div>

                          {/* Footer */}
                          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                            <button
                              type="button"
                              onClick={() => setIsModalOpen(false)}
                              className="px-6 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg font-medium transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors"
                            >
                              Create Task
                            </button>
                          </div>
                        </form>
                      </Modal.Body>
                    </Modal.Dialog>
                  </Modal.Container>
                </Modal.Backdrop>
              </Modal>
            </div>
            <nav className="flex-1 p-4">
              <div className="space-y-1">
                <p className="text-slate-800 dark:text-white font-bold text-lg my-2">
                  Genernal
                </p>
                {menuItems.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    onClick={() => setActiveItem(index)}
                    whileHover={{ x: 4 }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all group
                      ${
                        activeItem === index
                          ? "bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300"
                          : "hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-600 dark:text-gray-400"
                      }`}
                  >
                    <item.icon
                      size={20}
                      className={
                        activeItem === index
                          ? "text-violet-600"
                          : "group-hover:text-gray-900 dark:group-hover:text-white"
                      }
                    />
                    <span>{item.label}</span>
                  </motion.a>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SideBar;
