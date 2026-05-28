export default function AdminProductsPageSkeleton() {
  return (
    <div className="flex flex-col animate-pulse">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6 z-10">
        <div className="space-y-3">
          <div className="h-10 w-52 bg-gray-200 rounded-md" />

          <div className="h-4 w-72 bg-gray-200 rounded-md" />
        </div>

        <div className="h-11 w-44 bg-gray-200 rounded-xl" />
      </header>

      <section className="grid grid-cols-1 gap-4 z-10">
        {/* FILTROS */}
        <div className="flex gap-2 flex-wrap">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-9 w-24 bg-gray-200 rounded-full" />
          ))}
        </div>

        {/* SEARCH */}
        <div className="h-12 w-full bg-gray-200 rounded-xl" />

        {/* GRID DE PRODUTOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-2xl p-4 bg-white"
            >
              {/* imagem */}
              <div className="w-full h-52 bg-gray-200 rounded-xl mb-4" />

              {/* título */}
              <div className="h-6 w-3/4 bg-gray-200 rounded mb-3" />

              {/* descrição */}
              <div className="space-y-2 mb-4">
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-5/6 bg-gray-200 rounded" />
              </div>

              {/* footer */}
              <div className="flex items-center justify-between mt-6">
                <div className="h-8 w-24 bg-gray-200 rounded-lg" />

                <div className="flex gap-2">
                  <div className="h-9 w-9 bg-gray-200 rounded-lg" />
                  <div className="h-9 w-9 bg-gray-200 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINAÇÃO */}
        <div className="flex justify-center gap-2 mt-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 w-10 bg-gray-200 rounded-lg" />
          ))}
        </div>
      </section>
    </div>
  );
}
