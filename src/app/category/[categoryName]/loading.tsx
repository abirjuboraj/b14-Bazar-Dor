
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Loading = () => {
  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 px-3 py-6 sm:px-4 sm:py-8">
      <section className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-5">
        <Skeleton height={64} width={64} borderRadius={16} />
        <div className="flex-1">
          <Skeleton height={28} width={180} />
          <Skeleton height={16} width={240} />
        </div>
      </section>

      <section className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <Skeleton height={24} width={130} />
          <Skeleton height={38} width={120} borderRadius={12} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-neutral-200 p-4"
            >
              <div className="flex gap-3">
                <Skeleton height={56} width={56} borderRadius={12} />
                <div className="flex-1">
                  <Skeleton height={16} />
                  <Skeleton height={14} width="65%" />
                  <Skeleton height={20} width="50%" />
                </div>
              </div>
              <Skeleton height={36} className="mt-4" borderRadius={10} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Loading;

