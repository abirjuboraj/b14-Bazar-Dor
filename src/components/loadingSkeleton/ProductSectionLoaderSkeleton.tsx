
const ProductSectionSkeleton = () => {
  return (
    <section className="mx-auto w-full max-w-6xl px-3 sm:my-15 sm:px-4">
      {[6, 6, 9].map((count, index) => (
        <div key={index} className="mt-10">
          <div className="mb-5 h-7 w-40 animate-pulse rounded-md bg-gray-200" />

          {index === 2 && (
            <div className="mb-5 h-4 w-48 animate-pulse rounded bg-gray-200" />
          )}

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: count }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-200 bg-white p-4"
              >
                <div className="mb-4 h-32 animate-pulse rounded-lg bg-gray-200" />

                <div className="mb-2 h-4 w-3/4 animate-pulse rounded bg-gray-200" />

                <div className="mb-4 h-3 w-1/2 animate-pulse rounded bg-gray-200" />

                <div className="flex items-center justify-between">
                  <div className="h-5 w-20 animate-pulse rounded bg-gray-200" />
                  <div className="h-6 w-16 animate-pulse rounded-md bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default ProductSectionSkeleton;

