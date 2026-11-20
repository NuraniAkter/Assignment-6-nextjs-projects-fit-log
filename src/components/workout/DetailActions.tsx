"use client";

import { IWorkout } from "@/types/workout.type";
import { useFitLog } from "@/context/FitLogContext";
import {
  BookmarkIcon,
  CheckIcon,
  PlusIcon,
} from "@/components/shared/Icons";

interface DetailActionsProps {
  workout: IWorkout;
}

const DetailActions = ({ workout }: DetailActionsProps) => {
  const {
    plan,
    addToPlan,
    saveWorkout,
    isInPlan,
    isSaved,
  } = useFitLog();

  const alreadyInPlan = isInPlan(workout.id);
  const alreadySaved = isSaved(workout.id);
  const planIsFull = plan.length >= 5 && !alreadyInPlan;

  const planLabel = alreadyInPlan
    ? "Already in Today's Plan"
    : planIsFull
      ? "Plan Is Full (5)"
      : "Add to Today's Plan";

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={() => addToPlan(workout)}
        disabled={alreadyInPlan || planIsFull}
        className={`inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-xs font-black uppercase tracking-wide transition ${
          alreadyInPlan || planIsFull
            ? "cursor-not-allowed bg-[#2a2d34] text-[#858991]"
            : "bg-[#ccff00] text-black hover:brightness-90"
        }`}
      >
        {alreadyInPlan ? (
          <CheckIcon className="h-4 w-4" />
        ) : (
          <PlusIcon className="h-4 w-4" />
        )}
        {planLabel}
      </button>

      <button
        type="button"
        onClick={() => saveWorkout(workout)}
        disabled={alreadySaved}
        className={`inline-flex items-center justify-center gap-2 rounded-lg border px-6 py-3 text-xs font-black uppercase tracking-wide transition ${
          alreadySaved
            ? "cursor-not-allowed border-[#2a2d34] text-[#61656d]"
            : "border-[#ccff00] text-[#ccff00] hover:bg-[#ccff00] hover:text-black"
        }`}
      >
        <BookmarkIcon className="h-4 w-4" />
        {alreadySaved ? "Saved for Later" : "Save for Later"}
      </button>
    </div>
  );
};

export default DetailActions;
