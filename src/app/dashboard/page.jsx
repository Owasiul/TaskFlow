"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Star,
  Clock,
  Trash2,
  Menu,
  X,
  CheckCircle2,
  BarChart,
  PlusCircleIcon,
} from "lucide-react";
import { Button, Modal } from "@heroui/react";
import { useForm } from "react-hook-form";

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: CheckCircle2, label: "My Tasks", href: "/tasks" },
  { icon: BarChart, label: "Statistics", href: "/statistics" },
  { icon: Trash2, label: "Trash", href: "/trash" },
];
const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState(0);
  const [isWide, setIsWide] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tags, setTags] = useState([]);
  const [showTagInput, setShowTagInput] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddTask = (data) => {
    console.log(data);
  };

  const addTag = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
      setShowTagInput(false);
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
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

  const shouldShowSidebar = isOpen || isWide;

  return (
    <div>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-900 rounded-xl shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

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
              <button
                onClick={() => setIsModalOpen(true)} // ✅ this was missing
                className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white py-3 px-4 rounded-2xl font-medium transition-colors"
              >
                <PlusCircleIcon />
                <span>New Task</span>
              </button>

              {/* Modal is OUTSIDE the button */}
              <Modal
                isOpen={isModalOpen}
                onOpenChange={(isOpen) => setIsModalOpen(isOpen)}
                

              >
                <Modal.Backdrop>
                  <Modal.Container className={`w-120`}>
                    <Modal.Dialog>
                      <Modal.CloseTrigger
                        onClick={() => setIsModalOpen(false)}
                      />
                      <Modal.Header>
                        <Modal.Heading className="border-b dark:border-b-white border-b-slate-900 p-2">
                          Create New Task
                        </Modal.Heading>
                      </Modal.Header>
                      <Modal.Body className="p-3 space-y-5 w-120">
                        {/* form that will add task */}
                        <form
                          onSubmit={handleSubmit(handleAddTask)}
                          className="space-y-5 "
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

                          {/* Assignee */}
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Assignee
                            </label>
                            <select
                              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                              {...register("assignee")}
                            >
                              <option value="">
                                Search or select member...
                              </option>
                              <option value="alice">Alice</option>
                              <option value="bob">Bob</option>
                            </select>
                          </div>

                          {/* Cover Photo */}
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Cover Photo
                            </label>
                            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-violet-500 transition-colors">
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                id="cover-photo"
                                {...register("coverPhoto")}
                              />
                              <label
                                htmlFor="cover-photo"
                                className="cursor-pointer flex flex-col items-center gap-2"
                              >
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
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                  Click or drag photo to upload
                                </p>
                              </label>
                            </div>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Tags
                            </label>
                            <div className="flex flex-wrap gap-2 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 min-h-10">
                              {tags.map((tag, i) => (
                                <span
                                  key={i}
                                  className="inline-flex items-center gap-1 bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300 px-3 py-1 rounded-full text-sm"
                                >
                                  {tag}
                                  <button
                                    type="button"
                                    onClick={() => removeTag(i)}
                                    className="font-bold hover:text-violet-900 dark:hover:text-violet-100"
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
