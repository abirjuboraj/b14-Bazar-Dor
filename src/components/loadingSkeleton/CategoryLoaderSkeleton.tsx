
const CategorySectionSkeleton = () => {
  return (
    <div className="w-full border-y border-gray-200 bg-white/80">
      <div className="mx-auto w-full max-w-6xl">
        <nav
          aria-label="ক্যাটাগরি লোড হচ্ছে"
          className="flex items-center gap-2 overflow-hidden py-2 sm:py-2.5"
        >
          {[100, 120, 90, 110, 100, 125, 90].map((width, index) => (
            <div
              key={index}
              className="flex h-9 shrink-0 items-center gap-2 rounded-lg px-3 sm:h-10 sm:px-3.5"
            >
              <div className="h-4 w-4 animate-pulse rounded-full bg-gray-200 sm:h-5 sm:w-5" />

              <div
                className="h-3 animate-pulse rounded-md bg-gray-200 sm:h-3.5"
                style={{ width: `${width}px` }}
              />
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default CategorySectionSkeleton;

