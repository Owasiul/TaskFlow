"use client";
import { Button } from "@heroui/react";
import { Play, Pause, RotateCcw } from "lucide-react";
import React, { useState, useEffect } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && seconds > 0) {
      interval = setInterval(() => setSeconds((s) => s - 1), 1000);
    } else if (seconds === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(25 * 60);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4">
        Timer
      </h3>

      <div className="text-center mb-5">
        <p className="text-4xl font-bold text-gray-900 dark:text-white font-mono">
          {formatTime(seconds)}
        </p>
      </div>

      <div className="flex gap-2 justify-center">
        <Button
          isIconOnly
          variant="flat"
          size="sm"
          onClick={toggleTimer}
          className="bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400"
        >
          {isRunning ? <Pause size={18} /> : <Play size={18} />}
        </Button>
        <Button
          isIconOnly
          variant="flat"
          size="sm"
          onClick={resetTimer}
          className="bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400"
        >
          <RotateCcw size={18} />
        </Button>
      </div>
    </div>
  );
};

export default Timer;
