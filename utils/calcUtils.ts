"use client";

import { useAppState } from "@/utils/appContext";

export function useCalcWpm() {
  const { typedText, testDuration, timer } = useAppState();

  const calcWpm = () => {
    if (timer) {
      return 0;
    }

    // Trim the text to remove leading and trailing spaces, then split
    const trimmedText = typedText.trim();
    const numWords = trimmedText ? trimmedText.split(/\s+/).length : 0;
    const minutesElapsed = testDuration / 60;

    const wpm = numWords / minutesElapsed;

    return Math.round(wpm);
  };

  return calcWpm;
}

export function useCalcCpm() {
  const { typedText, testDuration, timer } = useAppState();

  const calcCpm = () => {
    if (timer) {
      return 0; // Return 0 CPM if the timer is still active
    }

    // Trim the text to remove leading and trailing spaces
    const trimmedText = typedText.trim();
    const numCharacters = trimmedText.length;
    const minutesElapsed = testDuration / 60;

    const cpm = numCharacters / minutesElapsed;

    return Math.round(cpm); // Return rounded CPM
  };

  return calcCpm;
}

export function useCalcAccuracy() {
  const { typedText, mistakes } = useAppState();

  const calcAccuracy = () => {
    const totalTypedCharacters = typedText.length;
    const totalCorrectCharacters = totalTypedCharacters - mistakes;

    if (totalTypedCharacters === 0) {
      return 100; // Return 100% accuracy if no text has been typed to avoid division by zero
    }

    const accuracy = (totalCorrectCharacters / totalTypedCharacters) * 100;
    return Math.round(accuracy); // Round to nearest whole number for simplicity
  };

  return calcAccuracy;
}
