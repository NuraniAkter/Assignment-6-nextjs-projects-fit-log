"use client";

import { useEffect, useState } from "react";

import { IWorkout } from "@/types/workout.type";
import { getAllWorkouts } from "@/lib/api";
import Loading from "@/components/shared/Loading";
import WorkoutCard from "./WorkoutCard";

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState<IWorkout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const data = await getAllWorkouts();
        setWorkouts(data);
      } catch {
        setError("Failed to load workouts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  return (
    <section
      id="library"
      className="mx-auto max-w-350 scroll-mt-20 px-4 pb-20 sm:px-6 lg:px-8"
    >
      <div className="border-t border-[#272a31] pt-12">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ccff00]">
          The Library
        </p>

        <h2 className="font-display mt-2 text-4xl font-bold uppercase text-white sm:text-5xl">
          Twelve Lifts
        </h2>

        <p className="mt-3 text-sm text-[#858991]">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {loading && <Loading className="min-h-80" />}

      {!loading && error && (
        <div className="mt-10 rounded-lg border border-red-900 bg-red-950/30 p-5 text-center">
          <p className="text-sm text-red-400">{error}</p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 rounded-md border border-red-700 px-4 py-2 text-xs font-bold uppercase tracking-wide text-red-300 transition hover:bg-red-900/40"
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}
