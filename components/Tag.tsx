
export default function Tag({ title, className }: { title: string, className?: string }) {
  return (
    <span className={`rounded-full bg-sky-100 text-blue-700 px-2 py-1 text-sm ${className}`}>
      {title}
    </span>
  )
}