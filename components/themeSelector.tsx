import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppState } from "@/utils/appContext";
import { DonutIcon } from "lucide-react";

type Status = {
  value: string;
  label: string;
};

const statuses: Status[] = [
  { value: "amethyst", label: "Amethyst" },
  { value: "azure", label: "Azure" },
  { value: "coral", label: "Coral" },
  { value: "dark", label: "Dark" },
  { value: "mkbhd", label: "Mkbhd" },
  { value: "mocha", label: "Mocha" },
  { value: "mountain", label: "Mountain" },
  { value: "ocean", label: "Ocean" },
  { value: "pink-sky", label: "Pink Sky" },
  { value: "rose-milk", label: "Rose Milk" },
  { value: "terminal", label: "Terminal" },
  { value: "vscode", label: "VsCode" },
];

export default function ThemeSelector() {
  const { timerActive, theme, setTheme } = useAppState();
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery({ query: "(min-width: 640px)" });
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);

  // Effect for initializing theme from localStorage
  useEffect(() => {
    const savedTheme =
      typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (savedTheme) {
      const themeStatus = JSON.parse(savedTheme);
      setSelectedStatus(themeStatus);
      setTheme(themeStatus.value);
    } else {
      setSelectedStatus({ value: theme.toLowerCase(), label: theme });
    }
  }, [theme]);

  useEffect(() => {
    if (selectedStatus) {
      const themeClass = `theme-${selectedStatus.value}`;
      const htmlClassList = document.documentElement?.classList;
      const bodyClassList = document.querySelector("body")?.classList;
      if (!bodyClassList || !htmlClassList) {
        return;
      }
      const bodyThemeClasses = Array.from(bodyClassList).filter((className) =>
        className.startsWith("theme-"),
      );
      const htmlThemeClasses = Array.from(bodyClassList).filter((className) =>
        className.startsWith("theme-"),
      );

      // Remove all theme classes
      bodyThemeClasses.forEach((className) => {
        bodyClassList.remove(className);
      });
      htmlThemeClasses.forEach((className) => {
        htmlClassList.remove(className);
      });

      bodyClassList.add(themeClass);
      htmlClassList.add(themeClass);

      localStorage.setItem("theme", JSON.stringify(selectedStatus));
      setTheme(selectedStatus.value);
    }
  }, [selectedStatus]);

  return (
    <div
      className={`${isDesktop ? "ml-16" : ""} ${timerActive && "opacity-0 pointer-events-none"} flex items-center gap-2`}
    >
      {isDesktop ? (
        <Popover open={open} onOpenChange={setOpen}>
          <p className="text-sm text-primary">theme:</p>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-center w-[150px]">
              {selectedStatus ? <>{selectedStatus.label}</> : <>+ Theme</>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0 text-primary" align="start">
            <StatusList
              setOpen={setOpen}
              setSelectedStatus={setSelectedStatus}
            />
          </PopoverContent>
        </Popover>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              className="w-[120px] justify-start flex gap-2 items-center"
            >
              <DonutIcon className="text-primary size-4" />
              <span>theme</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mt-4 border-t">
              <StatusList
                setOpen={setOpen}
                setSelectedStatus={setSelectedStatus}
              />
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}

function StatusList({
  setOpen,
  setSelectedStatus,
}: {
  setOpen: (open: boolean) => void;
  setSelectedStatus: (status: Status | null) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter themes..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {statuses.map((status) => (
            <CommandItem
              key={status.value}
              value={status.value}
              onSelect={(value) => {
                setSelectedStatus(
                  statuses.find((status) => status.value === value) || null,
                );
                setOpen(false);
              }}
            >
              {status.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
