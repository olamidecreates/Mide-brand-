import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
  /** Pause the scroll animation on hover — a small, premium micro-interaction. */
  pauseOnHover?: boolean;
}

/**
 * Infinite horizontal ticker. Renders the item list twice back-to-back and
 * animates a -50% translate so the loop is seamless. Respects
 * prefers-reduced-motion via the global stylesheet.
 */
export function Marquee({ items, className, pauseOnHover = true }: MarqueeProps) {
  const track = [...items, ...items];

  return (
    <div
      className={cn(
        "group relative flex overflow-hidden border-y border-paper/10",
        className
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "flex shrink-0 animate-marquee items-center",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {track.map((item, i) => (
          <span
            key={i}
            className="flex items-center whitespace-nowrap px-6 py-3 font-mono text-xs uppercase tracking-widest text-paper/70"
          >
            {item}
            <span className="ml-6 h-1 w-1 rounded-full bg-electric" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}
