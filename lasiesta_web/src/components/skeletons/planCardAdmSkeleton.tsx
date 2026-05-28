export default function PlanCardAdmSkeleton() {
  return (
    <section className="grid grid-cols-1 gap-6 z-10 animate-pulse">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="relative bg-white/70 backdrop-blur rounded-3xl border border-gray-100 shadow-sm px-4 py-5 flex justify-between animate-pulse"
        >
          {/* CONTENT */}
          <div className="flex flex-col gap-4 px-2 w-full">
            {/* HEADER */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4 w-full">
                {/* IMAGE */}
                <div className="w-20 h-20 rounded-lg bg-gray-200 shrink-0" />

                {/* INFO */}
                <div className="flex flex-col gap-3 w-full">
                  {/* TITLE + BADGES */}
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-52 bg-gray-200 rounded-md" />
                    <div className="h-6 w-20 bg-gray-200 rounded-full" />
                    <div className="h-6 w-24 bg-gray-200 rounded-full" />
                  </div>

                  {/* PRICE */}
                  <div className="flex items-end gap-2">
                    <div className="h-10 w-36 bg-gray-200 rounded-md" />
                    <div className="h-6 w-20 bg-gray-200 rounded-md" />
                  </div>
                </div>
              </div>
            </div>

            {/* SHORT DESCRIPTION */}
            <div className="flex flex-col gap-2 mt-2">
              <div className="h-4 w-full bg-gray-200 rounded-md" />
              <div className="h-4 w-[90%] bg-gray-200 rounded-md" />
              <div className="h-4 w-[75%] bg-gray-200 rounded-md" />
            </div>

            {/* EXPAND BUTTON */}
            <div className="h-5 w-40 bg-gray-200 rounded-md mt-2" />
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col items-center gap-4 ml-4 pt-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full" />
            <div className="w-8 h-8 bg-gray-200 rounded-full" />
            <div className="w-8 h-8 bg-gray-200 rounded-full" />
            <div className="w-8 h-8 bg-gray-200 rounded-full" />
          </div>
        </div>
      ))}
    </section>
  );
}
