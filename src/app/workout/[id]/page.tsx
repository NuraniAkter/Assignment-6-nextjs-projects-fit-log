import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getWorkoutById } from "@/lib/api";
import DetailActions from "@/components/workout/DetailActions";

interface WorkoutDetailsPageProps {
  params: Promise<{ id: string }>;
}

const specRows = [
  { key: "equipment", label: "Equipment" },
  { key: "difficulty", label: "Difficulty" },
  { key: "sets", label: "Sets" },
  { key: "reps", label: "Reps" },
  { key: "duration", label: "Duration" },
  { key: "calories", label: "Calories" },
  { key: "rating", label: "Rating" },
] as const;

export default async function WorkoutDetailsPage({
  params,
}: WorkoutDetailsPageProps) {
  const { id } = await params;
  const workout = await getWorkoutById(id);

  if (!workout) {
    notFound();
  }

  const specValues: Record<
    (typeof specRows)[number]["key"],
    string | number
  > = {
    equipment: workout.equipment,
    difficulty: workout.difficulty,
    sets: workout.sets,
    reps: workout.reps,
    duration: `${workout.duration} min`,
    calories: `${workout.caloriesBurned} kcal`,
    rating: workout.rating,
  };

  return (
    <main className="min-h-screen bg-[#0b0c0f] px-4 py-10 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-xs font-black uppercase tracking-wide text-[#ccff00] transition hover:brightness-90"
        >
          <span aria-hidden="true">←</span>
          Back to workouts
        </Link>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="relative h-87.5 overflow-hidden rounded-2xl border border-[#272a31] bg-[#15171c] sm:h-130">
              <Image
                src={workout.image}
                alt={workout.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          <div>
            <div className="mb-5 flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-md bg-[#ccff00] px-3 py-1 text-[10px] font-black uppercase tracking-wide text-black"
                >
                  {muscle}
                </span>
              ))}
            </div>

            <h1 className="font-display text-4xl font-bold uppercase leading-tight tracking-wide sm:text-6xl">
              {workout.name}
            </h1>

            <p className="mt-5 leading-7 text-[#a2a6ae]">
              {workout.description}
            </p>

            <dl className="mt-7 divide-y divide-[#272a31] overflow-hidden rounded-xl border border-[#272a31] bg-[#15171c] px-5">
              {specRows.map((row) => (
                <div
                  key={row.key}
                  className="flex items-center justify-between gap-4 py-3.5"
                >
                  <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#858991]">
                    {row.label}
                  </dt>
                  <dd className="text-right text-sm font-bold text-white">
                    {row.key === "rating" ? (
                      <span className="inline-flex items-center gap-1.5">
                        <span className="text-[#ccff00]">★</span>
                        {specValues[row.key]}
                      </span>
                    ) : (
                      specValues[row.key]
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <section className="mt-8">
              <h2 className="font-display text-2xl font-bold uppercase tracking-wide">
                Instructions
              </h2>

              <ol className="mt-4 space-y-3">
                {workout.instructions.map((instruction, index) => (
                  <li
                    key={instruction}
                    className="flex gap-4 rounded-xl border border-[#22252b] bg-[#15171c] p-4"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-xs font-black text-black">
                      {index + 1}
                    </span>

                    <p className="text-sm leading-6 text-[#a2a6ae]">
                      {instruction}
                    </p>
                  </li>
                ))}
              </ol>
            </section>

            <div className="mt-8">
              <DetailActions workout={workout} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
