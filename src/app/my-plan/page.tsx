"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  IPlanWorkout,
  IWorkout,
} from "@/types/workout.type";
import { useFitLog } from "@/context/FitLogContext";
import Loading from "@/components/shared/Loading";
import {
  ArrowRightIcon,
  CheckIcon,
  ChevronDownIcon,
  ClockIcon,
  FlameIcon,
  StarIcon,
  XIcon,
} from "@/components/shared/Icons";

type Tab = "plan" | "saved";
type SortKey = "duration" | "calories" | "rating";

function Metric({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="px-4 py-5 text-center sm:px-6">
      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#858991] sm:text-[10px]">
        {label}
      </p>
      <p className="font-display mt-1 text-3xl font-bold text-white sm:text-4xl">
        {value}
      </p>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] text-[#858991]">
      <span className="text-[#ccff00]">{icon}</span>
      <span className="sr-only">{label}:</span>
      {value}
    </span>
  );
}

export default function MyPlanPage() {
  const {
    plan,
    saved,
    metrics,
    isHydrated,
    markAsDone,
    removeFromPlan,
    removeFromSaved,
  } = useFitLog();

  const [activeTab, setActiveTab] = useState<Tab>("plan");
  const [sortBy, setSortBy] =
    useState<SortKey>("duration");

  const currentList: (IWorkout | IPlanWorkout)[] =
    activeTab === "plan" ? plan : saved;

  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === "duration") {
      return a.duration - b.duration;
    }

    if (sortBy === "calories") {
      return b.caloriesBurned - a.caloriesBurned;
    }

    return b.rating - a.rating;
  });

  return (
    <main className="min-h-screen bg-[#0b0c0f] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ccff00]">
          FitLog
        </p>

        <h1 className="font-display mt-2 text-4xl font-bold uppercase tracking-wide sm:text-5xl">
          My Plan
        </h1>

        <p className="mt-3 max-w-xl text-sm text-[#858991]">
          Cap of five lifts for today. Finish them, then
          load more.
        </p>

        <section className="mt-8 grid grid-cols-3 divide-x divide-[#272a31] overflow-hidden rounded-xl border border-[#272a31] bg-[#15171c]">
          <Metric label="Exercises" value={metrics.exercises} />
          <Metric label="Minutes" value={metrics.minutes} />
          <Metric label="Calories" value={metrics.calories} />
        </section>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex self-start rounded-2xl border border-[#2a2d32] bg-[#15171c] p-1.5">
            <button
              type="button"
              aria-pressed={activeTab === "plan"}
              onClick={() => setActiveTab("plan")}
              className={`rounded-xl border px-5 py-2.5 text-sm font-bold transition ${
                activeTab === "plan"
                  ? "border-[#3d4148] bg-[#1b1e24] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                  : "border-transparent text-[#8b9099] hover:text-white"
              }`}
            >
              Today&apos;s Plan
            </button>

            <button
              type="button"
              aria-pressed={activeTab === "saved"}
              onClick={() => setActiveTab("saved")}
              className={`rounded-xl border px-5 py-2.5 text-sm font-bold transition ${
                activeTab === "saved"
                  ? "border-[#3d4148] bg-[#1b1e24] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                  : "border-transparent text-[#8b9099] hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>

          <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wide text-[#858991]">
            Sort By
            <span className="relative">
              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value as SortKey)
                }
                className="appearance-none rounded-md border border-[#383b42] bg-[#15171c] py-2 pl-3 pr-9 text-[11px] font-bold uppercase tracking-wide text-white outline-none transition focus:border-[#ccff00]"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>

              <ChevronDownIcon className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#ccff00]" />
            </span>
          </label>
        </div>

        {!isHydrated ? (
          <Loading className="min-h-80 rounded-xl" />
        ) : sortedList.length === 0 ? (
          <div className="mt-10 flex flex-col items-center justify-center rounded-xl border border-dashed border-[#383b42] bg-[#101216] px-6 py-16 text-center">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-white sm:text-3xl">
              Nothing Here Yet
            </h2>

            <p className="mt-3 max-w-sm text-sm text-[#858991]">
              Browse the library and add a lift to get today
              moving.
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#ccff00] px-5 py-3 text-xs font-black uppercase tracking-wide text-black transition hover:brightness-90"
            >
              Go to workouts
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <ul className="mt-6 space-y-3">
            {sortedList.map((workout) => {
              const isPlanTab = activeTab === "plan";
              const isDone = isPlanTab
                ? (workout as IPlanWorkout).isDone
                : false;

              return (
                <li
                  key={workout.id}
                  className="flex flex-col gap-4 rounded-xl border border-[#22252b] bg-[#15171c] p-3 sm:flex-row sm:items-center"
                >
                  <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-lg bg-[#1b1e24] sm:h-24 sm:w-32">
                    <Image
                      src={workout.image}
                      alt={workout.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 128px"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap gap-1.5">
                      {workout.muscleGroups.map((muscle) => (
                        <span
                          key={muscle}
                          className="rounded bg-[#ccff00] px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-black"
                        >
                          {muscle}
                        </span>
                      ))}
                    </div>

                    <h3 className="font-display mt-2 truncate text-lg font-bold uppercase tracking-wide text-white">
                      {workout.name}
                    </h3>

                    <p className="mt-0.5 text-xs text-[#858991]">
                      {workout.equipment}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-4">
                      <Stat
                        icon={<ClockIcon className="h-3.5 w-3.5" />}
                        label="Duration"
                        value={`${workout.duration} min`}
                      />
                      <Stat
                        icon={<FlameIcon className="h-3.5 w-3.5" />}
                        label="Calories"
                        value={`${workout.caloriesBurned} kcal`}
                      />
                      <Stat
                        icon={<StarIcon className="h-3.5 w-3.5" />}
                        label="Rating"
                        value={workout.rating}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                    <Link
                      href={`/workout/${workout.id}`}
                      className="rounded-md border border-[#383b42] px-3 py-2 text-[10px] font-black uppercase tracking-wide text-white transition hover:border-[#ccff00] hover:text-[#ccff00]"
                    >
                      View Details
                    </Link>

                    {isPlanTab && (
                      <button
                        type="button"
                        onClick={() => markAsDone(workout.id)}
                        disabled={isDone}
                        className={`inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-[10px] font-black uppercase tracking-wide transition ${
                          isDone
                            ? "cursor-not-allowed bg-[#2a2d34] text-[#858991]"
                            : "bg-[#ccff00] text-black hover:brightness-90"
                        }`}
                      >
                        <CheckIcon className="h-3.5 w-3.5" />
                        {isDone ? "Done" : "Mark as Done"}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        isPlanTab
                          ? removeFromPlan(workout.id)
                          : removeFromSaved(workout.id)
                      }
                      aria-label={`Remove ${workout.name}`}
                      title={`Remove ${workout.name}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#383b42] text-[#858991] transition hover:border-red-700 hover:bg-red-950/40 hover:text-red-400"
                    >
                      <XIcon className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </main>
  );
}
