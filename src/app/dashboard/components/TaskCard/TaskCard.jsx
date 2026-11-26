"use client";
import { Avatar, Button, Card, Checkbox, Chip, Progress } from "@heroui/react";
import { Calendar, Flag, MoreVertical, Users } from "lucide-react";
import React, { useState } from "react";

const TaskCard = ({ task, onCompleteChange }) => {
  const { description, dueDate, photoURL, priority, tags, title } = task;
  const [isCompleted, setIsCompleted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Priority configuration
  const priorityConfig = {
    high: {
      color: "danger",
      icon: Flag,
      label: "High",
      bgColor: "bg-danger-50",
    },
    medium: {
      color: "warning",
      icon: Flag,
      label: "Medium",
      bgColor: "bg-warning-50",
    },
    low: {
      color: "success",
      icon: Flag,
      label: "Low",
      bgColor: "bg-success-50",
    },
  };

  const currentPriority =
    priorityConfig[priority?.toLowerCase()] || priorityConfig.medium;
  const PriorityIcon = currentPriority.icon;

  // Handle completion toggle - only from checkbox
  const handleCompleteToggle = (checked) => {
    setIsCompleted(checked);
    if (onCompleteChange) {
      onCompleteChange(task._id, checked);
    }
  };

  // Due date formatting with status
  const getDueDateStatus = () => {
    if (!dueDate || isCompleted) return null;
    const due = new Date(dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDateObj = new Date(dueDate);
    dueDateObj.setHours(0, 0, 0, 0);
    const daysDiff = Math.ceil((dueDateObj - today) / (1000 * 60 * 60 * 24));

    if (daysDiff < 0) return { text: "Overdue", color: "danger" };
    if (daysDiff === 0) return { text: "Today", color: "warning" };
    if (daysDiff === 1) return { text: "Tomorrow", color: "primary" };
    return { text: `${daysDiff} days left`, color: "default" };
  };

  const dueDateStatus = getDueDateStatus();

  // Format due date for display
  const formatDueDate = (date) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card
      variant="default"
      className={`group w-full p-3 sm:p-4 md:p-5 shadow-sm border border-default-100 rounded-lg sm:rounded-xl md:rounded-2xl bg-surface transition-all duration-300 hover:shadow-md hover:scale-[1.01] ${
        isCompleted ? "opacity-75 bg-default-50" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header Section */}
      <div className="flex items-start justify-between gap-1.5 sm:gap-2 md:gap-3 mb-2 sm:mb-2.5 md:mb-3.5">
        <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2.5 flex-1 min-w-0">
          {/* Rounded Checkbox - Only this controls completion */}
          <Checkbox
            aria-label="Mark task complete"
            isSelected={isCompleted}
            onValueChange={handleCompleteToggle}
            size="lg"
            radius="full"
            color="success"
            classNames={{
              wrapper:
                "rounded-full after:rounded-full cursor-pointer m-0 flex-shrink-0",
              icon: "rounded-full",
              label: "hidden",
            }}
          >
            {null}
          </Checkbox>

          <div className="flex flex-col gap-0.5 sm:gap-1 md:gap-1.5 flex-1 min-w-0">
            <div className="flex items-center gap-0.5 sm:gap-1 md:gap-1.5 flex-wrap">
              <Chip
                size="sm"
                variant="flat"
                color={isCompleted ? "success" : currentPriority.color}
                startcontent={!isCompleted && <PriorityIcon size={12} />}
                className={`font-semibold text-[8px] sm:text-[9px] md:text-[10px] uppercase h-4.5 sm:h-5 md:h-5.5 px-1 sm:px-1.5 md:px-2 tracking-wider ${
                  isCompleted ? "bg-success-100 text-success-700" : ""
                }`}
              >
                {isCompleted ? "Completed" : currentPriority.label}
              </Chip>

              {tags && tags.length > 0 && !isCompleted && (
                <>
                  {tags.slice(0, 1).map((tag, index) => (
                    <Chip
                      key={index}
                      size="sm"
                      variant="light"
                      className="text-[8px] sm:text-[9px] md:text-[10px] uppercase h-4.5 sm:h-5 md:h-5.5 px-1 sm:px-1.5 md:px-2 bg-default-100/70 text-default-600 font-medium hidden sm:inline-flex md:inline-flex"
                    >
                      {tag}
                    </Chip>
                  ))}

                  {tags.length > 1 && (
                    <span className="text-[8px] sm:text-[9px] md:text-[10px] text-default-400 font-semibold bg-default-50 px-0.5 sm:px-1 md:px-1.5 py-0.5 rounded-md">
                      +{tags.length - 1}
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <Button
          size="sm"
          variant="light"
          isIconOnly
          className={`text-default-500 border border-default-200/60 h-6 sm:h-6 md:h-7 w-6 sm:w-6 md:w-auto md:px-3 rounded-lg sm:rounded-lg md:rounded-full text-xs font-medium transition-all duration-200 flex-shrink-0 ${
            isHovered
              ? "bg-default-100 border-transparent text-default-800"
              : ""
          }`}
        >
          <MoreVertical size={14} className="sm:w-3.5 sm:h-3.5 md:hidden" />
          <span className="hidden md:inline">Edit</span>
        </Button>
      </div>

      {/* Content Section - No click handler */}
      <div className="mb-2 sm:mb-3 md:mb-4">
        <h3
          className={`text-xs sm:text-sm md:text-base font-semibold tracking-tight text-default-800 mb-0.5 sm:mb-0.5 md:mb-1 transition-all line-clamp-2 ${
            isCompleted ? "line-through text-default-400" : ""
          }`}
        >
          {title}
        </h3>

        {description && (
          <p
            className={`text-[11px] sm:text-xs md:text-xs text-default-500 leading-relaxed line-clamp-2 ${
              isCompleted ? "line-through text-default-300" : ""
            }`}
          >
            {description}
          </p>
        )}
      </div>

      {/* Media Section - Collapses automatically if photoURL is missing/null */}
      {photoURL && photoURL !== null && !isCompleted && (
        <div className="relative w-full h-28 sm:h-36 md:h-44 mb-2 sm:mb-3 md:mb-4 overflow-hidden rounded-md sm:rounded-lg md:rounded-xl bg-default-100 border border-default-100 transition-all duration-300">
          <img
            src={photoURL}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-103"
          />
        </div>
      )}

      {/* Footer Section */}
      <div className="flex flex-col sm:flex-col md:flex-row items-start sm:items-start md:items-center justify-between gap-1.5 sm:gap-2 md:gap-3 pt-1.5 sm:pt-2 md:pt-3 border-t border-default-100/80 text-[10px] sm:text-xs md:text-sm">

        {/* Due Date */}
        {dueDate && !isCompleted && (
          <div
            className={`flex items-center gap-0.5 sm:gap-1 md:gap-1.5 flex-wrap ${
              dueDateStatus?.color === "danger"
                ? "text-danger-500 font-semibold"
                : dueDateStatus?.color === "warning"
                  ? "text-warning-600 font-semibold"
                  : "text-default-500 font-medium"
            }`}
          >
            <Calendar size={11} className="sm:w-3 sm:h-3 md:w-[13px] md:h-[13px]" />
            <span className="text-[10px] sm:text-xs md:text-xs hidden md:inline">
              {formatDueDate(dueDate)}
            </span>
            {dueDateStatus && (
              <span
                className={`text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-wider font-bold ${
                  dueDateStatus.color === "danger"
                    ? "text-danger-400"
                    : dueDateStatus.color === "warning"
                      ? "text-warning-500"
                      : "text-default-400"
                }`}
              >
                {dueDateStatus.text}
              </span>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default TaskCard;
