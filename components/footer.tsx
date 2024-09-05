"use client";
import { useAppState } from "@/utils/appContext";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

export default function Footer() {
  const { timerActive } = useAppState();
  return (
    <footer
      className={`${timerActive && "hidden"} flex text-sm text-foreground  items-center gap-2 px-10 py-5`}
    >
      <p className="mr-auto">Faried Idris © 2024</p>
      <a
        href="https://www.linkedin.com/in/faried-idris"
        rel="noreferrer"
        target="_blank"
        aria-label="Redirect to LinkedIn profile for Faried Idris"
      >
        <LinkedInLogoIcon className="size-8 hover:text-secondary transition-colors" />
      </a>
      <a
        href="https://github.com/psyofrelief"
        rel="noreferrer"
        target="_blank"
        aria-label="Redirect to Github profile for Faried Idris"
      >
        <GitHubLogoIcon className="size-8 hover:text-secondary transition-colors" />
      </a>
    </footer>
  );
}
