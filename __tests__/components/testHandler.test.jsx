import "@testing-library/jest-dom";
import { useCalcWpm, useCalcCpm, useCalcAccuracy } from "../../utils/calcUtils";
import { useAppState } from "../../utils/appContext";
import { renderHook } from "@testing-library/react";

jest.mock("../../utils/appContext", () => ({
  useAppState: jest.fn(),
}));

describe("useCalcWpm", () => {
  it("calculates WPM correctly", () => {
    useAppState.mockImplementation(() => ({
      typedText: "hello world two times",
      testDuration: 120,
      timer: 0,
    }));

    const { result } = renderHook(() => useCalcWpm());
    expect(result.current()).toBe(2); // 5 words / 2 minutes = 2.5, rounded to 2
  });

  it("returns 0 if timer is active", () => {
    useAppState.mockImplementation(() => ({
      typedText: "hello world",
      testDuration: 60,
      timer: 1,
    }));

    const { result } = renderHook(() => useCalcWpm());
    expect(result.current()).toBe(0);
  });
});

describe("useCalcCpm", () => {
  it("calculates CPM correctly", () => {
    useAppState.mockImplementation(() => ({
      typedText: "hello world",
      testDuration: 60,
      timer: 0,
    }));

    const { result } = renderHook(() => useCalcCpm());
    expect(result.current()).toBe(11); // 11 characters / 1 minute = 11
  });

  it("returns 0 if timer is active", () => {
    useAppState.mockImplementation(() => ({
      typedText: "hello world",
      testDuration: 60,
      timer: 1,
    }));

    const { result } = renderHook(() => useCalcCpm());
    expect(result.current()).toBe(0);
  });
});

describe("useCalcAccuracy", () => {
  it("calculates accuracy correctly", () => {
    useAppState.mockImplementation(() => ({
      typedText: "hello world",
      mistakes: 1,
    }));

    const { result } = renderHook(() => useCalcAccuracy());
    expect(result.current()).toBe(91); // (10 correct / 11 total) * 100 = 90.9090909, rounded to 91
  });

  it("returns 100 if no text has been typed", () => {
    useAppState.mockImplementation(() => ({
      typedText: "",
      mistakes: 0,
    }));

    const { result } = renderHook(() => useCalcAccuracy());
    expect(result.current()).toBe(100);
  });
});
