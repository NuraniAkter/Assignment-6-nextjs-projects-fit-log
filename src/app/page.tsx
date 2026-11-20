import Image from "next/image";
import Link from "next/link";

import WorkoutLibrary from "@/components/workout/WorkoutLibrary";

export default function HomePage() {
  return (
    <main className="bg-[#0b0c0f]">
      <section className="mx-auto max-w-350 px-4 pt-8 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-[#272a31] bg-[#15171c]">
          <div className="grid items-center gap-8 p-7 sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-4 lg:p-14">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#ccff00]">
                Workout Library
              </p>

              <h1 className="font-display mt-4 text-5xl font-bold uppercase leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-7xl">
                Train with intent. Log
                <br />
                every set.
              </h1>

              <p className="mt-6 max-w-lg text-sm leading-6 text-[#858991] sm:text-[15px]">
                FitLog is a dark, no-nonsense gym companion:
                pick a lift, lock it into today&apos;s plan, and
                watch the week&apos;s work add up.
              </p>

              <Link
                href="#library"
                className="mt-8 inline-flex items-center rounded-md bg-[#ccff00] px-5 py-3 text-[11px] font-black uppercase tracking-wide text-black transition hover:brightness-90"
              >
                Browse Workouts
              </Link>
            </div>

            <div className="mx-auto w-full max-w-sm lg:mx-0 lg:max-w-md lg:justify-self-end">
              <Image
                src="/banner.png"
                alt="FitLog workout banner"
                width={334}
                height={334}
                priority
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <WorkoutLibrary />
    </main>
  );
}
