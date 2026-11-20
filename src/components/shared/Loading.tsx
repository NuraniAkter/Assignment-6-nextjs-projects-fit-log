interface LoadingProps {
  label?: string;
  className?: string;
}

export default function Loading({
  label = "Loading workouts…",
  className = "min-h-[70vh]",
}: LoadingProps) {
  return (
    <div
      className={`flex items-center justify-center bg-[#0b0c0f] ${className}`}
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#292c32] border-t-[#ccff00]" />

        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#858991]">
          {label}
        </p>
      </div>
    </div>
  );
}
