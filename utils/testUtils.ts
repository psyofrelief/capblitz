"use client";

import { useRef, useEffect } from "react";
import { useAppState } from "@/utils/appContext";

export function useStartTimer() {
  const { timerActive, timer, setTimer } = useAppState();
  const intervalIdRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const startTimer = () => {
    if (timerActive && timer > 0) {
      intervalIdRef.current = setInterval(() => {
        setTimer((prevTimer: number) => {
          if (prevTimer <= 1 || !timerActive) {
            return 0; // Reset timer to 0 and stop interval
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
  };

  useEffect(() => {
    if (!timerActive) {
      clearInterval(intervalIdRef.current);
    }
  }, [timerActive]);

  useEffect(() => {
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, []);

  return startTimer;
}

export function useResetTest() {
  const { setTypedText, setMistakes, testDuration, setTimer, setTimerActive } =
    useAppState();

  const resetTest = () => {
    setTypedText("");
    setMistakes(0);
    setTimer(testDuration);
    setTimerActive(false);
  };

  return resetTest;
}
