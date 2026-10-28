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
      <div className="relative mx-auto max-w-6xl px-5 pt-16 pb-20 md:pt-24 md:pb-28">
        <p className="section-label text-accent-soft">{label}</p>
        <h1 className="mt-4 max-w-[20ch] text-[2.1rem] leading-[1.3] font-bold text-balance md:text-5xl md:leading-[1.25]">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-[56ch] text-[16px] leading-[1.8] text-pretty text-primary-foreground/75 md:text-[17px]">
            {description}
          </p>
        )}
      </div>
      {/* arch silhouette echoing the home hero */}
      <div
        aria-hidden
        className="arch pointer-events-none absolute top-12 right-8 bottom-0 hidden w-64 rounded-b-none border border-b-0 border-accent/30 md:block lg:right-20"
      />
    </section>
  );
}

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  tone = "light",
}: {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  const center = align === "center";
  return (
    <div className={center ? "text-center" : ""}>
      {label && <p className="section-label">{label}</p>}
      <h2
        className={
          "mt-3 text-[1.75rem] leading-[1.35] font-bold text-balance md:text-[2.4rem] " +
          (tone === "dark" ? "text-primary-foreground" : "text-primary")
        }
      >
        {title}
      </h2>
      {description && (
        <p
          className={
            "mt-4 max-w-[58ch] text-[16px] leading-[1.8] text-pretty " +
            (tone === "dark" ? "text-primary-foreground/75" : "text-muted-foreground") +
            (center ? " mx-auto" : "")
          }
        >
          {description}
        </p>
      )}
    </div>
  );
}
