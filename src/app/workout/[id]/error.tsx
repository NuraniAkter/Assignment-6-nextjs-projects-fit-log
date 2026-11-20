"use client";

import Link from "next/link";

export default function WorkoutError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-[#0b0c0f] px-4 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ccff00]">
        FitLog
      </p>

      <h1 className="font-display mt-3 text-3xl font-bold uppercase text-white sm:text-4xl">
        Could not load this workout
      </h1>

      <p className="mt-3 max-w-md text-sm text-[#858991]">
        The workout service may be unavailable right now. Try
        again or head back to the library.
      </p>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-md bg-[#ccff00] px-5 py-3 text-xs font-black uppercase tracking-wide text-black transition hover:brightness-90"
        >
          Try again
        </button>

        <Link
          href="/"
          className="rounded-md border border-[#383b42] px-5 py-3 text-xs font-black uppercase tracking-wide text-white transition hover:border-[#ccff00] hover:text-[#ccff00]"
        >
          Back to workouts
        </Link>
      </div>
    </main>
  );
}
