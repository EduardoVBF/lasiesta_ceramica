export default function CarouselAdminSkeleton() {
  return (
    <section className="grid grid-cols-1 gap-6 z-10 animate-pulse">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="relative h-[340px] rounded-3xl overflow-hidden shadow-lg bg-[#d8cabc]"
        >
          <div className="absolute top-4 left-4 flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-[#a35c42]/40" />
            <div className="h-7 w-20 rounded-full bg-white/60" />
          </div>

          <div className="absolute top-4 right-4 flex flex-col gap-3">
            <div className="h-10 w-10 rounded-full bg-white/70" />
            <div className="h-10 w-10 rounded-full bg-white/70" />
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
            <div className="h-8 w-64 max-w-[70%] rounded bg-white/60 mb-4" />
            <div className="h-4 w-96 max-w-[80%] rounded bg-white/50" />
          </div>
        </div>
      ))}
    </section>
  );
}
