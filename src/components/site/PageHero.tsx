export function PageHero({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="pattern-geometric relative overflow-hidden bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
        <p className="section-label">{label}</p>
        <h1 className="mt-3 max-w-[22ch] text-3xl leading-tight font-bold text-balance md:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-pretty text-primary-foreground/75">
            {description}
          </p>
        )}
      </div>
      <div className="pointer-events-none absolute -top-16 -right-16 size-56 rounded-full border-[24px] border-accent/10" />
    </section>
  );
}

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
}: {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      {label && <p className="section-label">{label}</p>}
      <h2 className="mt-2 text-2xl leading-tight font-bold text-balance text-primary md:text-3xl">
        {title}
      </h2>
      {description && (
        <p
          className={
            "mt-3 max-w-[54ch] text-[15px] leading-relaxed text-pretty text-muted-foreground" +
            (align === "center" ? " mx-auto" : "")
          }
        >
          {description}
        </p>
      )}
    </div>
  );
}
