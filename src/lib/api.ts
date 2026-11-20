import { IWorkout } from "@/types/workout.type";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export const getAllWorkouts = async (): Promise<IWorkout[]> => {
  const response = await fetch(API_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }

  return response.json();
};

export const getWorkoutById = async (
  id: string
): Promise<IWorkout | null> => {
  const response = await fetch(
    `${API_URL}/${encodeURIComponent(id)}`,
    {
      cache: "no-store",
    }
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch workout");
  }

  return response.json();
};
