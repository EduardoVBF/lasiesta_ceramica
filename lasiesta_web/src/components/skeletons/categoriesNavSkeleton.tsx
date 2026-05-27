export default function CategoriesNavSkeleton() {
  return (
    <div className="w-full max-w-[90%] mb-4 overflow-hidden">
      <div className="flex overflow-x-auto justify-start gap-x-1 px-1">
        {[...Array(8)].map((_, index) => (
          <button
            key={index}
            className={`pt-4 rounded-b-lg px-6 py-1 text-sm font-bold transition-all duration-300 whitespace-nowrap cursor-pointer hover:bg-gray-500/20 hover:text-marrom-avermelhado/90 focus:outline-none bg-[#a35c42]/20 w-30 h-10`}
          ></button>
        ))}
      </div>
    </div>
  );
}
