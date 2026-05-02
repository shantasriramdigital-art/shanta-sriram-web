export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-40 rounded bg-[#E8ECF0]" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 rounded-lg border border-[#E8ECF0] bg-white" />
        ))}
      </div>
      <div className="h-72 rounded-lg border border-[#E8ECF0] bg-white" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="h-72 rounded-lg border border-[#E8ECF0] bg-white" />
        <div className="h-72 rounded-lg border border-[#E8ECF0] bg-white" />
      </div>
    </div>
  )
}
