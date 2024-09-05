import { useStartTimer, useResetTest } from "../../utils/testUtils";
import { useAppState } from "../../utils/appContext";
import { renderHook, act } from "@testing-library/react";

jest.mock("../../utils/appContext", () => ({
  useAppState: jest.fn(),
}));

beforeEach(() => {
  setTimer = jest.fn();
  useAppState.mockImplementation(() => ({
    timerActive: true,
    timer: 5,
    setTimer,
  }));

  jest.useFakeTimers();
  jest.spyOn(global, "setInterval");
  jest.spyOn(global, "clearInterval");
  clearInterval;
});

afterEach(() => {
  jest.clearAllMocks();
  jest.useRealTimers();
});

describe("useStartTimer", () => {
  it("should set an interval when timer is active and above zero", () => {
    const { result } = renderHook(() => useStartTimer());
    act(() => {
      result.current();
    });
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });
  it("should set an interval when timer is active and above zero", () => {
    const { result } = renderHook(() => useStartTimer());
    act(() => {
      result.current();
    });
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });

  it("should clear interval when timer is not active", () => {
    useAppState.mockImplementation(() => ({
      timerActive: false,
      timer: 5,
      setTimer,
    }));
    const { result, unmount } = renderHook(() => useStartTimer());
    act(() => {
      result.current();
    });
    unmount();
    expect(clearInterval).toHaveBeenCalledTimes(1);
  });
  describe("useResetTest", () => {
    it("should reset all test states", () => {
      const setTypedText = jest.fn();
      const setMistakes = jest.fn();
      const setTimer = jest.fn();
      const setTimerActive = jest.fn();
      useAppState.mockImplementation(() => ({
        setTypedText,
        setMistakes,
        testDuration: 60,
        setTimer,
        setTimerActive,
      }));
      const { result } = renderHook(() => useResetTest());
      act(() => {
        result.current();
      });
      expect(setTypedText).toHaveBeenCalledWith("");
      expect(setMistakes).toHaveBeenCalledWith(0);
      expect(setTimer).toHaveBeenCalledWith(60);
      expect(setTimerActive).toHaveBeenCalledWith(false);
    });
  });
});
