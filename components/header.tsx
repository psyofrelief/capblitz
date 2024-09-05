"use client";
import { useEffect, useState } from "react";
import ThemeSelector from "./themeSelector";
import TimeSelector from "./timeSelector";
import TypeSelector from "./typeSelector";
import { useAppState } from "@/utils/appContext";

export default function Header() {
  const { timerActive } = useAppState();
  const [opened, setOpened] = useState(false);
  useEffect(() => {
    setOpened(true);
  }, []);

  return (
    <header className="flex items-center justify-between px-10 pt-10">
      {!timerActive && (
        <>
          <a href="/" aria-label="Redirect to Home Page for Faried Idris">
            <h1 className="text-3xl sm:text-5xl font-extrabold hover:underline">
              Cap<span className="text-primary">Blitz</span>
            </h1>
          </a>
          <div className="flex flex-col gap-3">
            {opened && (
              <>
                <TimeSelector />
                <TypeSelector />
                <ThemeSelector />
              </>
            )}
          </div>
        </>
      )}
    </header>
  );
}
