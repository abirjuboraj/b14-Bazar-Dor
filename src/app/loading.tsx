import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Loading = () => {
  return (
    <main className="space-y-8">
      <section className="mx-auto w-full max-w-6xl px-3 pt-6 sm:px-4">
        <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50 p-6 sm:p-10 lg:p-12">
          <div className="relative z-10 max-w-2xl">
            <Skeleton height={16} width={130} borderRadius={20} />

            <div className="mt-4">
              <Skeleton height={42} width="85%" />
              <Skeleton height={42} width="60%" />
            </div>

            <div className="mt-3 max-w-lg">
              <Skeleton count={2} height={16} />
            </div>

            <div className="mt-7 flex max-w-xl items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-2 shadow-sm">
              <Skeleton circle height={24} width={24} />
              <div className="flex-1">
                <Skeleton height={20} width="75%" />
              </div>
              <Skeleton height={42} width={90} borderRadius={12} />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Skeleton height={14} width={100} />
              <Skeleton height={14} width={120} />
              <Skeleton height={14} width={90} />
            </div>
          </div>

          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-neutral-200/40 blur-3xl sm:h-64 sm:w-64" />
          <div className="pointer-events-none absolute -bottom-16 right-20 h-40 w-40 rounded-full bg-neutral-200/40 blur-3xl" />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl space-y-8 px-3 sm:px-4">
        {["আজ দাম বেড়েছে", "আজ দাম কমেছে", "সব পণ্য"].map((title) => (
          <div key={title}>
            <Skeleton height={28} width={180} />

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({
                length: title === "সব পণ্য" ? 6 : 3,
              }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-neutral-200 bg-white p-4"
                >
                  <div className="flex gap-3">
                    <Skeleton height={60} width={60} borderRadius={12} />
                    <div className="min-w-0 flex-1">
                      <Skeleton height={18} />
                      <Skeleton height={14} width="65%" />
                      <Skeleton height={22} width="50%" />
                    </div>
                  </div>

                  <Skeleton
                    height={36}
                    className="mt-4"
                    borderRadius={10}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Loading;

