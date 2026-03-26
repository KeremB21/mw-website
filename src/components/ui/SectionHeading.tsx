export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-semibold tracking-[0.24em] text-[color:var(--km-muted)]">
        {eyebrow.toUpperCase()}
      </p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[color:var(--km-fg)] sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-sm leading-6 text-[color:var(--km-muted)] sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  )
}

