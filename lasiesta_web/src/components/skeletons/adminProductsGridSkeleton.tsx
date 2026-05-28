export default function AdminProductsGridSkeleton() {
  return (
    <div className="col-span-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-2xl p-4 bg-white animate-pulse"
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
    </div>
  );
}
