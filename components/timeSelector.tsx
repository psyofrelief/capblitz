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
import { Timer } from "lucide-react";

type Status = {
  value: string;
  label: string;
};

const statuses: Status[] = [
  { value: "30", label: "30" },
  { value: "60", label: "60" },
  { value: "90", label: "90" },
  { value: "120", label: "120" },
];

export default function TimeSelector() {
  const { setTestDuration, setTimer, testDuration } = useAppState();
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery({ query: "(min-width: 640px)" });

  const [selectedStatus, setSelectedStatus] = useState<Status | null>(() => {
    const savedStatus = localStorage.getItem("selectedTimer");
    return savedStatus
      ? JSON.parse(savedStatus)
      : { value: testDuration.toString(), label: testDuration.toString() };
  });
  // Effect for initializing testDuration from localStorage
  useEffect(() => {
    const savedTime =
      typeof window !== "undefined"
        ? localStorage.getItem("selectedTimer")
        : null;
    if (savedTime) {
      const timeStatus = JSON.parse(savedTime);
      setSelectedStatus(timeStatus);
      setTestDuration(timeStatus.value);
    } else {
      setSelectedStatus({
        value: testDuration.toString(),
        label: testDuration.toString(),
      });
    }
  }, [testDuration]);

  useEffect(() => {
    if (selectedStatus) {
      localStorage.setItem("selectedTimer", JSON.stringify(selectedStatus));
      setTestDuration(+selectedStatus.value);
      setTimer(+selectedStatus.value);
    }
  }, [selectedStatus]);

  if (isDesktop) {
    return (
      <div className="flex items-center gap-2">
        <p className="text-sm text-primary">timer:</p>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-center w-[150px]">
              {selectedStatus ? <>{selectedStatus.label}</> : <>+ Time</>}
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
        <Button variant="outline" className="w-[120px] justify-start gap-2">
          <Timer className="size-4 text-primary" /> <span>timer</span>
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
      <CommandInput placeholder="Filter time..." />
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
