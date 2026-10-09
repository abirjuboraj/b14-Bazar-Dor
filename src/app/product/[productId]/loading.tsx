import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Loading = () => {
  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 px-3 py-6 sm:px-4 sm:py-8">
      <section className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 gap-4">
            <Skeleton height={80} width={80} borderRadius={16} />
            <div className="flex-1">
              <Skeleton height={26} width={180} />
              <Skeleton height={16} width={130} />
              <Skeleton height={16} width={200} />
            </div>
          </div>

          <div className="rounded-2xl bg-neutral-50 p-4 md:w-52">
            <Skeleton height={16} width={90} />
            <Skeleton height={36} width={120} />
            <Skeleton height={16} width={100} />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6">
        <Skeleton height={28} width={200} />

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-neutral-200 p-5"
            >
              <Skeleton height={16} width={100} />
              <Skeleton height={28} width={150} />
              <Skeleton height={14} width={130} />
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Skeleton height={26} width={230} />
          <div className="mt-4">
            <Skeleton count={5} height={42} className="mb-2" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Loading;