"use client";
import { useResetTest } from "@/utils/testUtils";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCalcAccuracy, useCalcCpm, useCalcWpm } from "@/utils/calcUtils";

export function Results() {
  const calcWpm = useCalcWpm();
  const calcCpm = useCalcCpm();
  const calcAccuracy = useCalcAccuracy();
  const resetTest = useResetTest();
  return (
    <Dialog defaultOpen={true} onOpenChange={resetTest}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="gap-y-1">
          <DialogTitle>Test Results</DialogTitle>
          <DialogDescription>
            Here are the statistics for the test you completed.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-2">
          <p className="gap-2">
            <span className="font-bold">WPM: </span>
            {calcWpm()}
          </p>

          <p className="gap-2">
            <span className="font-bold">CPM: </span>
            {calcCpm()}
          </p>

          <p className="gap-2">
            <span className="font-bold">Accuracy: </span>
            {calcAccuracy()}%
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
