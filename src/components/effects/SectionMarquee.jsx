const ITEMS = [
  'JAVA',
  'SPRING BOOT',
  'REACT',
  'TYPESCRIPT',
  'TAILWIND',
  'VITE',
  'MICRONAUT',
  'GIT',
  'SQL',
  'FULL STACK',
]

const SectionMarquee = () => {
  const track = [...ITEMS, ...ITEMS]

  return (
    <div
      className="relative overflow-hidden border-y border-white/[0.08] bg-black py-3"
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-black to-transparent" />
      <div className="marquee-track flex w-max gap-10">
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-10 font-mono text-[11px] tracking-[0.35em] text-white/35"
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-primary-400/60" />
          </span>
        ))}
      </div>
    </div>
  )
}

export default SectionMarquee
