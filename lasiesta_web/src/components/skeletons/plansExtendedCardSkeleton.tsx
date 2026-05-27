export default function PlansExtendedCardSkeleton() {
  return (
    <div className="w-full flex flex-col gap-8 px-4">
      {[...Array(3)].map((_, index) => (
        <section key={index} className="py-0 px-4">
          <div
            className={`max-w-6xl mx-auto flex flex-col ${
              index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
            } gap-8 lg:gap-12 p-4 bg-gray-200/90 rounded-xl shadow-2xl animate-pulse`}
          >
            {/* Skeleton da imagem */}
            <div className="relative w-full max-w-[400px] aspect-[4/5] md:aspect-square rounded-2xl overflow-hidden bg-gray-300 shrink-0" />

            {/* Skeleton do conteúdo */}
            <div className="flex-1 min-h-full flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Título */}
                <div className="h-10 w-2/3 bg-gray-300 rounded-md" />

                {/* Parágrafos */}
                <div className="space-y-3">
                  <div className="h-4 w-full bg-gray-300 rounded-md" />
                  <div className="h-4 w-full bg-gray-300 rounded-md" />
                  <div className="h-4 w-5/6 bg-gray-300 rounded-md" />
                  <div className="h-4 w-4/6 bg-gray-300 rounded-md" />
                </div>
              </div>

              {/* Preço + botão */}
              <div className="flex flex-col gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-28 bg-gray-300 rounded-md" />
                  <div className="h-5 w-16 bg-gray-300 rounded-md" />
                </div>

                <div className="h-12 w-full bg-gray-300 rounded-xl" />
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}