export function PackageFeatures({
  items,
  dark = false,
  className = "",
}: {
  items: (string | null | undefined)[];
  dark?: boolean;
  className?: string;
}) {
  return (
    <ul className={"grid content-start gap-3.5 " + className}>
      {items.filter(Boolean).map((f) => (
        <li
          key={f}
          className={
            "flex gap-3 text-[15px] leading-[1.65] " +
            (dark ? "text-primary-foreground/85" : "text-foreground/80")
          }
        >
          <svg
            aria-hidden
            viewBox="0 0 16 16"
            className={"mt-[5px] size-3.5 shrink-0 " + (dark ? "text-accent-soft" : "text-accent")}
          >
            <path fill="currentColor" d="M8 0l2.2 5.8L16 8l-5.8 2.2L8 16l-2.2-5.8L0 8l5.8-2.2z" />
          </svg>
          {f}
        </li>
      ))}
    </ul>
  );
}
