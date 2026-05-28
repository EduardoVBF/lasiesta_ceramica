export default function PublicProductDetailSkeleton() {
  return (
    <main className="relative animate-pulse">
      {/* HEADER */}
      <div className="h-20 w-full bg-gray-100 mb-4" />

      <section className="max-w-7xl mx-auto p-2 relative z-10">
        {/* BACK */}
        <div className="h-4 w-40 bg-gray-200 rounded mb-6" />

        <div className="flex flex-col lg:flex-row gap-6">
          {/* GALERIA */}
          <div className="w-full lg:w-[480px] flex flex-col gap-4 pr-4 lg:border-r-2 border-gray-200">
            {/* IMAGE */}
            <div className="w-full aspect-square rounded-2xl bg-gray-200" />

            {/* THUMBS */}
            <div className="flex gap-2 flex-wrap">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-20 h-20 rounded-xl bg-gray-200"
                />
              ))}
            </div>
          </div>

          {/* INFO */}
          <div className="flex-1 flex flex-col gap-6">
            {/* TITLE */}
            <div className="space-y-3">
              <div className="h-10 w-72 bg-gray-200 rounded" />

              <div className="h-6 w-28 rounded-full bg-gray-200" />
            </div>

            {/* PRICE */}
            <div className="space-y-3">
              <div className="h-10 w-40 bg-gray-200 rounded" />

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-gray-200" />

                <div className="h-3 w-64 bg-gray-200 rounded" />
              </div>
            </div>

            {/* SHORT DESCRIPTION */}
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-200 rounded" />

              <div className="h-4 w-[95%] bg-gray-200 rounded" />

              <div className="h-4 w-[80%] bg-gray-200 rounded" />
            </div>

            {/* LONG DESCRIPTION */}
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-200 rounded" />

              <div className="h-4 w-[98%] bg-gray-200 rounded" />

              <div className="h-4 w-[90%] bg-gray-200 rounded" />

              <div className="h-4 w-[85%] bg-gray-200 rounded" />

              <div className="h-4 w-[75%] bg-gray-200 rounded" />
            </div>

            {/* DETAILS */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-gray-200" />

                <div className="h-4 w-40 bg-gray-200 rounded" />
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-gray-200" />

                <div className="h-4 w-32 bg-gray-200 rounded" />
              </div>
            </div>

            {/* COLORS */}
            <div className="space-y-3">
              <div className="h-5 w-40 bg-gray-200 rounded" />

              <div className="flex gap-2 flex-wrap">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-8 w-20 rounded-full bg-gray-200"
                  />
                ))}
              </div>
            </div>

            {/* BUTTON */}
            <div className="h-12 w-52 rounded-xl bg-gray-200 mt-4" />
          </div>
        </div>
      </section>
    </main>
  );
}