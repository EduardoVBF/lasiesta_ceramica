export default function FeaturedCategoriesGridSkeleton() {
  return (
    <div className="grid gap-4 my-4 grid-cols-1 md:grid-cols-3">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="h-64 rounded-2xl bg-[#d8cabc] animate-pulse shadow-lg"
        />
      ))}
    </div>
  );
}