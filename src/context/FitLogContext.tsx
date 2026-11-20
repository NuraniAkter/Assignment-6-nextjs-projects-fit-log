"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import toast from "react-hot-toast";

import {
  IPlanWorkout,
  IWorkout,
} from "@/types/workout.type";

interface FitLogMetrics {
  exercises: number;
  minutes: number;
  calories: number;
}

interface FitLogContextType {
  plan: IPlanWorkout[];
  saved: IWorkout[];
  metrics: FitLogMetrics;
  isHydrated: boolean;

  addToPlan: (workout: IWorkout) => void;
  removeFromPlan: (id: number) => void;

  saveWorkout: (workout: IWorkout) => void;
  removeFromSaved: (id: number) => void;

  markAsDone: (id: number) => void;

  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  isDone: (id: number) => boolean;
}

const FitLogContext = createContext<
  FitLogContextType | undefined
>(undefined);

const readStoredArray = <T,>(key: string): T[] => {
  const stored = localStorage.getItem(key);

  if (!stored) {
    return [];
  }

  const parsed: unknown = JSON.parse(stored);

  return Array.isArray(parsed) ? (parsed as T[]) : [];
};

export const FitLogProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [plan, setPlan] = useState<IPlanWorkout[]>([]);
  const [saved, setSaved] = useState<IWorkout[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect -- One-time hydration from localStorage after mount. */
  useEffect(() => {
    try {
      const storedPlan = readStoredArray<IWorkout>("fitlog-plan");
      const storedSaved = readStoredArray<IWorkout>("fitlog-saved");
      const storedDone = readStoredArray<number>("fitlog-done");

      const withDoneState = storedPlan.map((workout) => {
        const doneFlag =
          typeof (workout as IPlanWorkout).isDone === "boolean"
            ? (workout as IPlanWorkout).isDone
            : storedDone.includes(workout.id);

        return { ...workout, isDone: doneFlag };
      });

      setPlan(withDoneState);
      setSaved(storedSaved);

      localStorage.removeItem("fitlog-done");
    } catch {
      setPlan([]);
      setSaved([]);
    } finally {
      setIsHydrated(true);
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan, isHydrated]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved, isHydrated]);

  const addToPlan = (workout: IWorkout) => {
    if (plan.length >= 5) {
      toast.error("Today's plan is full! Max 5 lifts.");
      return;
    }

    if (plan.some((item) => item.id === workout.id)) {
      toast.error("Already in today's plan.");
      return;
    }

    setPlan((prev) => [
      ...prev,
      { ...workout, isDone: false },
    ]);
    toast.success(`${workout.name} added to today's plan.`);
  };

  const removeFromPlan = (id: number) => {
    setPlan((prev) =>
      prev.filter((item) => item.id !== id)
    );
    toast.success("Removed from today's plan.");
  };

  const saveWorkout = (workout: IWorkout) => {
    if (saved.some((item) => item.id === workout.id)) {
      toast.error("Already saved for later.");
      return;
    }

    setSaved((prev) => [...prev, workout]);
    toast.success(`${workout.name} saved for later.`);
  };

  const removeFromSaved = (id: number) => {
    setSaved((prev) =>
      prev.filter((item) => item.id !== id)
    );
    toast.success("Removed from saved workouts.");
  };

  const markAsDone = (id: number) => {
    const selected = plan.find((item) => item.id === id);

    if (!selected || selected.isDone) {
      return;
    }

    setPlan((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, isDone: true }
          : item
      )
    );
    toast.success(`${selected.name} marked as done.`);
  };

  const isInPlan = (id: number) => {
    return plan.some((item) => item.id === id);
  };

  const isSaved = (id: number) => {
    return saved.some((item) => item.id === id);
  };

  const isDone = (id: number) => {
    return (
      plan.find((item) => item.id === id)?.isDone ??
      false
    );
  };

  const metrics: FitLogMetrics = {
    exercises: plan.length,
    minutes: plan.reduce(
      (total, item) => total + item.duration,
      0
    ),
    calories: plan.reduce(
      (total, item) => total + item.caloriesBurned,
      0
    ),
  };

  return (
    <FitLogContext.Provider
      value={{
        plan,
        saved,
        metrics,
        isHydrated,
        addToPlan,
        removeFromPlan,
        saveWorkout,
        removeFromSaved,
        markAsDone,
        isInPlan,
        isSaved,
        isDone,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
};

export const useFitLog = () => {
  const context = useContext(FitLogContext);

  if (!context) {
    throw new Error(
      "useFitLog must be used inside FitLogProvider"
    );
  }

  return context;
};
