export default function RestApiIcon({ className = 'h-full w-full' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect x="10" y="14" width="44" height="36" rx="6" fill="#0ea5e9" fillOpacity="0.18" stroke="#38bdf8" strokeWidth="2" />
      <path d="M22 28h20M22 34h14M22 40h18" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M42 20h6v6" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="46" cy="22" r="3" fill="#38bdf8" />
    </svg>
  )
}
