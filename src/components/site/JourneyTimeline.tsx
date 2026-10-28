import { toBn } from "@/lib/site";
import { useSiteContent } from "@/lib/site-content";

export function JourneyTimeline({ compact = false }: { compact?: boolean }) {
  const { journey } = useSiteContent();
  const steps = compact ? journey.slice(0, 4) : journey;

  return (
    <ol className="relative grid gap-8 pl-14">
      <span aria-hidden className="absolute top-3 bottom-3 left-[17px] w-px bg-accent/35" />
      {steps.map((step, i) => (
        <li key={step.t + i} className="relative">
          <span className="font-display absolute top-0 -left-14 grid size-9 place-items-center rounded-full border border-accent/60 bg-primary text-[15px] font-bold text-accent-soft">
            {toBn(i + 1)}
          </span>
          <h3 className="font-display text-[19px] font-bold">{step.t}</h3>
          <p className="mt-1.5 text-[15px] leading-relaxed text-primary-foreground/70">{step.d}</p>
        </li>
      ))}
    </ol>
  );
}
