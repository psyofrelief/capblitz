"use client";
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
import { TextIcon } from "lucide-react";

type Status = {
  value: string;
  label: string;
};

const statuses: Status[] = [
  {
    value: "words",
    label: "Words",
  },
  {
    value: "sentences",
    label: "Sentences",
  },
];

export default function TypeSelector() {
  const { testType, setTestType, timerActive } = useAppState();
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery({ query: "(min-width: 640px)" });
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(() => {
    const savedType = localStorage.getItem("type");
    return savedType
      ? JSON.parse(savedType)
      : { value: testType, label: testType };
  });

  useEffect(() => {
    const savedType =
      typeof window !== "undefined" ? localStorage.getItem("type") : null;
    if (savedType) {
      const typeStatus = JSON.parse(savedType);
      setSelectedStatus(typeStatus);
      setTestType(typeStatus.value);
    } else {
      setSelectedStatus({
        value: testType.toString(),
        label: testType.toString(),
      });
    }
  }, [testType]);

  useEffect(() => {
    if (selectedStatus) {
      localStorage.setItem("type", JSON.stringify(selectedStatus));
      setTestType(selectedStatus.value);
    }
  }, [selectedStatus]);

  if (isDesktop) {
    return (
      <div
        className={`${isDesktop ? "ml-8" : ""} ${timerActive && "opacity-0 pointer-events-none"} flex items-center gap-2`}
      >
        <p className="text-sm text-primary">type:</p>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-center w-[150px]">
              {selectedStatus ? <>{selectedStatus.label}</> : <>+ Type</>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <StatusList
              setOpen={setOpen}
              setSelectedStatus={setSelectedStatus}
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className={`${timerActive && "opacity-0 pointer-events-none"}w-[120px] gap-2 justify-start`}
        >
          <TextIcon className="size-4 text-primary" />
          <span>type</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
        </div>
      </DrawerContent>
    </Drawer>
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
      <CommandInput placeholder="Filter type..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {statuses.map((status) => (
            <CommandItem
              key={status.value}
              value={status.value}
              onSelect={(value) => {
                setSelectedStatus(
                  statuses.find((priority) => priority.value === value) || null,
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
