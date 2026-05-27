export default function FeaturedPlansGridSkeleton() {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
      {[...Array(3)].map((_, index) => (
        <article
          key={index}
          className="flex flex-col bg-white/60 rounded-2xl overflow-hidden h-full animate-pulse"
        >
          <div className="aspect-square bg-[#d8cabc]" />

          <div className="px-3 py-5 flex flex-col flex-grow">
            <div className="h-6 w-3/4 rounded bg-[#c8b6a7] mb-4" />

            <div className="space-y-2 mb-6">
              <div className="h-3 w-full rounded bg-[#d8cabc]" />
              <div className="h-3 w-11/12 rounded bg-[#d8cabc]" />
              <div className="h-3 w-2/3 rounded bg-[#d8cabc]" />
            </div>

            <div className="mt-auto">
              <div className="h-7 w-32 rounded bg-[#c8b6a7] mb-4" />
              <div className="h-11 w-full rounded bg-[#8e947d]" />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
