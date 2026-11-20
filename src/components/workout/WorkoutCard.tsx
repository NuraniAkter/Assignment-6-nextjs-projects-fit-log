import Image from "next/image";
import Link from "next/link";

import { IWorkout } from "@/types/workout.type";
import {
  ClockIcon,
  FlameIcon,
  StarIcon,
} from "@/components/shared/Icons";

interface WorkoutCardProps {
  workout: IWorkout;
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden rounded-2xl border border-[#22252b] bg-[#15171c] transition duration-300 hover:-translate-y-1 hover:border-[#ccff00]/40"
    >
      <div className="relative h-56 w-full overflow-hidden bg-[#1b1e24]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
        />
      </div>

      <div className="p-5">
        <div className="mb-4 flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-md bg-[#ccff00] px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-black"
            >
              {muscle}
            </span>
          ))}
        </div>

        <h3 className="font-display text-xl font-bold uppercase tracking-wide text-white">
          {workout.name}
        </h3>

        <p className="mt-2 text-sm text-[#858991]">
          {workout.equipment}
        </p>

        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-[#272a31] pt-4">
          <div className="flex items-center gap-2">
            <ClockIcon className="h-4 w-4 shrink-0 text-[#ccff00]" />

            <div>
              <p className="text-[9px] font-bold uppercase tracking-wide text-[#777b84]">
                Duration
              </p>
              <p className="mt-0.5 text-xs font-black text-white">
                {workout.duration} min
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <FlameIcon className="h-4 w-4 shrink-0 text-[#ccff00]" />

            <div>
              <p className="text-[9px] font-bold uppercase tracking-wide text-[#777b84]">
                Calories
              </p>
              <p className="mt-0.5 text-xs font-black text-white">
                {workout.caloriesBurned}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <StarIcon className="h-4 w-4 shrink-0 text-[#ccff00]" />

            <div>
              <p className="text-[9px] font-bold uppercase tracking-wide text-[#777b84]">
                Rating
              </p>
              <p className="mt-0.5 text-xs font-black text-white">
                {workout.rating}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;
