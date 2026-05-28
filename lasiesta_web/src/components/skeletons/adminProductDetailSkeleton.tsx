export default function AdminProductDetailSkeleton() {
  return (
    <main className="animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div className="h-5 w-32 bg-gray-200 rounded" />

        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200" />
          <div className="w-8 h-8 rounded-full bg-gray-200" />
          <div className="w-8 h-8 rounded-full bg-gray-200" />
        </div>
      </div>

      <section className="flex flex-col lg:flex-row gap-8">
        {/* IMAGES */}
        <div className="w-full lg:w-[440px] flex flex-col gap-4">
          <div className="aspect-square rounded-2xl bg-gray-200" />

          <div className="flex gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-20 h-20 rounded-xl bg-gray-200" />
            ))}
          </div>
        </div>

        {/* INFO */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="space-y-3">
            <div className="h-8 w-72 bg-gray-200 rounded" />

            <div className="h-4 w-48 bg-gray-200 rounded" />

            <div className="flex gap-2">
              <div className="h-6 w-24 rounded-full bg-gray-200" />
              <div className="h-6 w-20 rounded-full bg-gray-200" />
              <div className="h-6 w-24 rounded-full bg-gray-200" />
            </div>

            <div className="h-10 w-40 bg-gray-200 rounded" />
          </div>

          <div className="space-y-2">
            <div className="h-5 w-28 bg-gray-200 rounded" />

            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-[90%] bg-gray-200 rounded" />
              <div className="h-4 w-[80%] bg-gray-200 rounded" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="h-5 w-32 bg-gray-200 rounded" />

            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-[95%] bg-gray-200 rounded" />
              <div className="h-4 w-[75%] bg-gray-200 rounded" />
              <div className="h-4 w-[85%] bg-gray-200 rounded" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="h-5 w-24 bg-gray-200 rounded" />
            <div className="h-4 w-40 bg-gray-200 rounded" />
          </div>

          <div className="space-y-2">
            <div className="h-5 w-28 bg-gray-200 rounded" />
            <div className="h-4 w-32 bg-gray-200 rounded" />
          </div>

          <div className="flex gap-2 mt-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-8 w-16 rounded-full bg-gray-200" />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
