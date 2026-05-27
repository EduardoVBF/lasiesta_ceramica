export default function ProductGridSkeleton() {
    return (
      <section className="w-full max-w-[90%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-8">
        {[...Array(8)].map((_, index) => (
          <article
            key={index}
            className="w-full max-w-sm h-[35rem] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-b from-[#f5fbf3] to-[#efe6da] animate-pulse"
          >
            {/* IMAGE */}
            <div className="relative w-full aspect-square bg-[#e7ddd2]">
              {/* fake badges */}
              <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-[#d1c3b5]" />
              <div className="absolute top-2 right-2 w-10 h-10 rounded-full bg-[#d1c3b5]" />

              {/* fake category */}
              <div className="absolute bottom-2 left-2 w-20 h-5 rounded-full bg-[#d1c3b5]" />
            </div>

            {/* CONTENT */}
            <div className="px-3 pt-3 bg-[#bf7a6b8b] flex flex-col justify-between h-[calc(35rem-18.8rem)]">
              <div>
                {/* title */}
                <div className="h-6 w-3/4 rounded bg-[#d6b6ae] mb-3" />

                {/* description */}
                <div className="space-y-2 mb-4">
                  <div className="h-3 w-full rounded bg-[#dcc5bf]" />
                  <div className="h-3 w-5/6 rounded bg-[#dcc5bf]" />
                  <div className="h-3 w-2/3 rounded bg-[#dcc5bf]" />
                </div>
              </div>

              <div className="mb-3">
                {/* price */}
                <div className="h-7 w-32 rounded bg-[#d6b6ae] mb-4" />

                {/* button */}
                <div className="h-12 w-full rounded-xl bg-[#8e947d]" />
              </div>
            </div>
          </article>
        ))}
      </section>
    );
  }