"use client";

// Next.js Image component
import Image from "next/image";

// Next.js Link component
import Link from "next/link";

// Current route পাওয়ার জন্য
import { usePathname } from "next/navigation";

// Plan এবং Saved data পাওয়ার জন্য
import { useFitLog } from "@/context/FitLogContext";

export default function Navbar() {
  const pathname = usePathname();

  const { plan, saved } = useFitLog();

  // Workout page active কিনা
  const isWorkoutActive =
    pathname === "/" || pathname.startsWith("/workout");

  // My Plan page active কিনা
  const isPlanActive = pathname === "/my-plan";

  return (
    <header className="border-b border-[#22252b] bg-[#0b0c0f]">
      <div className="relative mx-auto flex h-16 max-w-350 items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <Image
            src="/logo.png"
            alt="FitLog Logo"
            width={32}
            height={32}
            priority
            className="h-8 w-8 object-contain"
          />

          {/* FITLOG text */}
          <span className="font-display text-base font-bold tracking-[0.16em] text-white">
            FITLOG
          </span>
        </Link>

        {/* Navigation */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 sm:flex">

          {/* Workout */}
          <Link
            href="/"
            className={`rounded-full border px-4 py-1.5 text-xs font-bold transition ${
              isWorkoutActive
                ? "border-[#ccff00]/20 bg-[#ccff00]/10 text-[#ccff00]"
                : "border-transparent text-[#9a9ea6] hover:text-white"
            }`}
          >
            Workouts
          </Link>

          {/* My Plan */}
          <Link
            href="/my-plan"
            className={`rounded-full border px-4 py-1.5 text-xs font-bold transition ${
              isPlanActive
                ? "border-[#ccff00]/20 bg-[#ccff00]/10 text-[#ccff00]"
                : "border-transparent text-[#9a9ea6] hover:text-white"
            }`}
          >
            My Plan
          </Link>

        </nav>

        {/* Plan and Saved counters */}
        <div className="flex items-center gap-5">

          {/* Plan */}
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-xs font-bold text-white transition hover:text-[#ccff00]"
          >
            <span>Plan</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ccff00] px-1 text-[10px] font-black text-black">
              {plan.length}
            </span>
          </Link>

          {/* Saved */}
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-xs font-bold text-[#9a9ea6] transition hover:text-white"
          >
            <span>Saved</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#3a3d44] bg-[#15171c] px-1 text-[10px] font-bold text-white">
              {saved.length}
            </span>
          </Link>

        </div>
      </div>

      {/* Mobile navigation */}
      <div className="border-t border-[#1d1f24] px-4 py-2 sm:hidden">
        <nav className="flex justify-center gap-1">

          <Link
            href="/"
            className={`rounded-full border px-4 py-1.5 text-xs font-bold ${
              isWorkoutActive
                ? "border-[#ccff00]/20 bg-[#ccff00]/10 text-[#ccff00]"
                : "border-transparent text-[#9a9ea6]"
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`rounded-full border px-4 py-1.5 text-xs font-bold ${
              isPlanActive
                ? "border-[#ccff00]/20 bg-[#ccff00]/10 text-[#ccff00]"
                : "border-transparent text-[#9a9ea6]"
            }`}
          >
            My Plan
          </Link>

        </nav>
      </div>
    </header>
  );
}