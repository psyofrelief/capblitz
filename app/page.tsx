"use client";
import Loader from "@/components/loader";
import { Results } from "@/components/results";
import TestHandler from "@/components/testHandler";
import { Button } from "@/components/ui/button";
import { useAppState } from "@/utils/appContext";
import { useResetTest } from "@/utils/testUtils";
import { useEffect, useState } from "react";

const Home = () => {
  const resetTest = useResetTest();
  const { timer, timerActive, inputFocused } = useAppState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (document) {
      setTimeout(() => {
        setIsLoading(false);
      }, 250);
    }
  }, []);

  return (
    <>
      {isLoading && (
        <div className="absolute top-0 left-0 bottom-0 right-0 bg-black flex justify-center items-center">
          <Loader />
        </div>
      )}
      {!timer ? <Results /> : null}

      {timer && <p className="text-primary text-xl text-center">{timer}</p>}
      {!isLoading && <TestHandler />}

      {timerActive || !timer ? (
        <>
          <Button onClick={resetTest} className="block sm:hidden">
            Restart
          </Button>
          <p className="hidden sm:block text-primary">
            Press{" "}
            <span className="inline-flex pointer-events-none h-5 select-none items-center gap-1 rounded border bg-primary px-2 font-mono text-sm font-medium text-background">
              Enter
            </span>{" "}
            to restart
          </p>
        </>
      ) : (
        inputFocused && (
          <p className="hidden sm:block italic text-primary">
            Start typing to begin
          </p>
        )
      )}
    </>
  );
};

export default Home;
