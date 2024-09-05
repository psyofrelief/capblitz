import { useAppState } from "@/utils/appContext";
import { useStartTimer } from "@/utils/testUtils";
import { useEffect, useRef, useState } from "react";
import { sentences } from "wordlist/sentences";
import { words } from "wordlist/words";

export default function TestHandler() {
  const {
    typedText,
    setTypedText,
    timerActive,
    setTimerActive,
    setTimer,
    setMistakes,
    testType,
    testDuration,
    timer,
    theme,
    inputFocused,
    setInputFocused,
  } = useAppState();

  const [paragraph, setParagraph] = useState<string>("");
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const startTimer = useStartTimer();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (timer === 0) {
      return;
    }
    if (!timerActive) {
      setTimerActive(true);
    }
    setTypedText(e.target.value);
    scrollParagraph();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      resetTest();
    }
  };

  const resetTest = () => {
    setTypedText("");
    setMistakes(0);
    setTimer(testDuration);
    setTimerActive(false);
  };

  const scrollParagraph = () => {
    const pletters = document.querySelectorAll("span");
    if (typedText.length && textAreaRef.current && typedText.length > 5) {
      pletters[typedText.length + 1].scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  };

  const calcCharMistake = (char: string, index: number) => {
    if (typedText[index] === char) {
      return "text-secondary";
    }
    if (typedText[index]) {
      return char !== " "
        ? "text-red-500 error"
        : "bg-destructive  opacity-30 error";
    }
    return "text-foreground opacity-90";
  };

  useEffect(() => {
    if (!timerActive) {
      paragraphRef.current?.scrollTo(0, 0);
      textAreaRef.current?.focus();
    }
  }, [timerActive, testDuration, testType, theme]);

  useEffect(() => {
    if (typedText) {
      const errors = document.querySelectorAll(".error");
      setMistakes(errors.length);
    }
  }, [typedText]);

  useEffect(() => {
    if (!typedText.length) {
      return;
    }
    startTimer();
  }, [timerActive]);

  useEffect(() => {
    if (timerActive) {
      return;
    }
    if (testType === "sentences") {
      const randomIndex = Math.floor(Math.random() * sentences.length);
      setParagraph(sentences[randomIndex]);
    } else if (testType === "words") {
      const randomIndex = Math.floor(Math.random() * words.length);
      setParagraph(words[randomIndex]);
    }
  }, [testType, timerActive]);

  return (
    <div
      className="relative my-10 text-foreground h-[115px] sm:h-[128px]  overflow-y-scroll w-[300px] sm:w-[600px] font-mono font-extralight p-[10px]   text-lg flex items-center"
      onClick={() => {
        setInputFocused(true);
        textAreaRef.current?.focus();
      }}
      onKeyUp={() => {
        setInputFocused(true);
        textAreaRef.current?.focus();
      }}
    >
      <textarea
        ref={textAreaRef}
        value={typedText}
        onChange={handleInputChange}
        className="absolute left-0 right-0 top-[3px] bottom-0  p-[10px] h-115px text-lg resize-none opacity-0 text-primary border-none outline-none leading-tight"
        onKeyDown={handleKeyDown}
        onFocus={() => {
          setInputFocused(true);
        }}
        onBlur={() => {
          setInputFocused(false);
        }}
      />
      {inputFocused ? (
        <p
          id="paragraph"
          ref={paragraphRef}
          className="text-2xl sm:text-3xl h-full overflow-y-scroll pointer-events-none pl-[1px]   my-auto"
        >
          {paragraph.split("").map((char, index) => (
            <span
              key={+index}
              className={` ${index === typedText.length && "caret"} ${calcCharMistake(char, index)}`}
            >
              {char}
            </span>
          ))}
        </p>
      ) : (
        <p
          id="blurred"
          className="h-full w-full text-2xl sm:text-3xl cursor-pointer absolute top-0 right-0 left-0 bottom-0  items-center justify-center text-center text-foreground opacity-80 flex"
        >
          Click here to begin typing...
        </p>
      )}
    </div>
  );
}
