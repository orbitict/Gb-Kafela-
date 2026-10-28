import { toBn } from "@/lib/site";
import { useSiteContent } from "@/lib/site-content";

export function JourneyTimeline({ compact = false }: { compact?: boolean }) {
  const { journey } = useSiteContent();
  const steps = compact ? journey.slice(0, 4) : journey;

  return (
    <ol className="relative grid gap-7 pl-10">
      <span className="absolute top-2 bottom-2 left-[11px] w-0.5 bg-accent/30" />
      {steps.map((step, i) => (
        <li key={step.t + i} className="relative">
          <span className="absolute top-1 -left-10 grid size-6 place-items-center rounded-full bg-accent text-[11px] font-bold text-accent-foreground ring-4 ring-primary">
            {toBn(i + 1)}
          </span>
          <h3 className="font-bold">{step.t}</h3>
          <p className="mt-1 text-[13px] leading-relaxed text-primary-foreground/65">{step.d}</p>
        </li>
      ))}
    </ol>
  );
}
