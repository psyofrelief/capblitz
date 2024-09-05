"use client";
// App state variables that are shared across multiple components / pages
import { createContext, useState, useContext } from "react";

interface AppState {
  theme: string;
  setTheme: (theme: string) => void;
  typedText: string;
  setTypedText: (typedText: string) => void;
  timerActive: boolean;
  setTimerActive: (timerActive: boolean) => void;
  mistakes: number;
  setMistakes: (mistakes: number) => void;
  timer: number;
  setTimer: React.Dispatch<React.SetStateAction<number>>;

  testType: string;
  setTestType: (testType: string) => void;
  testDuration: number;
  setTestDuration: (startTime: number) => void;
  inputFocused: boolean;
  setInputFocused: (inputFocused: boolean) => void;
}

const AppStateContext = createContext<AppState>({
  theme: "",
  setTheme: () => {},
  typedText: "",
  setTypedText: () => {},
  timerActive: false,
  setTimerActive: () => {},
  mistakes: 0,
  setMistakes: () => {},
  timer: 30,
  setTimer: () => {},

  testType: "sentences",
  setTestType: () => {},
  testDuration: 30,
  setTestDuration: () => {},
  inputFocused: true,
  setInputFocused: () => {},
});

interface AppStateProviderProps {
  children: React.ReactNode;
}

export const AppStateProvider: React.FC<AppStateProviderProps> = ({
  children,
}) => {
  const [theme, setTheme] = useState<string>("vscode");
  const [typedText, setTypedText] = useState<string>("");
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [mistakes, setMistakes] = useState<number>(0);
  const [testDuration, setTestDuration] = useState<number>(60);

  const [timer, setTimer] = useState<number>(testDuration);
  const [inputFocused, setInputFocused] = useState<boolean>(true);
  const [testType, setTestType] = useState<string>("sentences");

  return (
    <AppStateContext.Provider
      value={{
        theme,
        setTheme,
        typedText,
        setTypedText,
        timerActive,
        setTimerActive,
        mistakes,
        setMistakes,
        timer,
        setTimer,
        testType,
        setTestType,
        testDuration,
        setTestDuration,
        inputFocused,
        setInputFocused,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);
