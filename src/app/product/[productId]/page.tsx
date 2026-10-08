import { Product } from "@/type/type";
import { notFound } from "next/navigation";

const ProductDetails = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;

  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products/${productId}`,
  );

  if (!res.ok) {
    notFound();
  }

  const product: Product = await res.json();

  const getUnit = (unit: string) => {
    if (unit === "kg") return "কেজি";
    if (unit === "litre") return "লিটার";
    if (unit === "dozen") return "ডজন";
    if (unit === "piece") return "পিস";

    return unit;
  };

  const lowestMarket = product.markets.reduce((min, market) =>
    market.min < min.min ? market : min,
  );

  const highestMarket = product.markets.reduce((max, market) =>
    market.max > max.max ? market : max,
  );

  const averagePrice =
    product.markets.reduce(
      (total, market) => total + (market.min + market.max) / 2,
      0,
    ) / product.markets.length;

  return (
    <main className="mx-auto w-full max-w-6xl px-3 py-6 sm:px-4 sm:py-8">
      <section className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex min-w-0 items-start gap-4 sm:gap-5">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-5xl sm:h-24 sm:w-24 sm:text-6xl">
              {product.image}
            </div>

            <div className="min-w-0">
              <h1 className="text-xl font-bold text-neutral-800 sm:text-2xl">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-sm text-neutral-500">
                প্রতি {getUnit(product.unit)}
                <span className="mx-1 text-neutral-300">•</span>
                {product.categoryNameBn}
              </p>

              <p
                className={`mt-4 text-sm font-medium ${
                  product.change.dir === "up"
                    ? "text-red-500"
                    : product.change.dir === "down"
                      ? "text-green-600"
                      : "text-neutral-500"
                }`}
              >
                {product.change.dir === "up" &&
                  "গতকালের তুলনায় আজ দাম বেড়েছে • "}

                {product.change.dir === "down" &&
                  "গতকালের তুলনায় আজ দাম কমেছে • "}

                {product.change.dir === "flat" &&
                  "গতকালের তুলনায় আজ দাম অপরিবর্তিত"}

                {product.change.dir !== "flat" && (
                  <>
                    {Math.abs(
                      product.today - product.yesterday,
                    ).toLocaleString("bn-BD")}{" "}
                    টাকা
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="w-full rounded-2xl bg-neutral-50 p-4 text-center md:w-52 md:shrink-0">
            <p className="text-sm font-medium text-neutral-500">
              আজকের দাম
            </p>

            <p className="mt-1 text-3xl font-bold text-neutral-900">
              {product.today.toLocaleString("bn-BD")}
            </p>

            <p className="mt-1 text-xs text-neutral-500">
              টাকা / {getUnit(product.unit)}
            </p>

            <div className="mt-3">
              {product.change.dir === "up" && (
                <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-500">
                  ▲ {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
                </span>
              )}

              {product.change.dir === "down" && (
                <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-600">
                  ▼ {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
                </span>
              )}

              {product.change.dir === "flat" && (
                <span className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-sm font-semibold text-neutral-500">
                  — ০.০%
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6">
        <div>
          <h2 className="text-xl font-bold text-neutral-800 sm:text-2xl">
            দামের সারসংক্ষেপ
          </h2>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-green-100 bg-green-50/50 p-5">
            <p className="text-sm font-medium text-neutral-500">
              সর্বনিম্ন দাম
            </p>

            <p className="mt-2 text-2xl font-bold text-green-600">
              {lowestMarket.min.toLocaleString("bn-BD")} টাকা
            </p>

            <p className="mt-1 text-xs text-neutral-500">
              সবচেয়ে কম দামের বাজার
            </p>
          </div>

          <div className="rounded-2xl border border-red-100 bg-red-50/50 p-5">
            <p className="text-sm font-medium text-neutral-500">
              সর্বাধিক দাম
            </p>

            <p className="mt-2 text-2xl font-bold text-red-500">
              {highestMarket.max.toLocaleString("bn-BD")} টাকা
            </p>

            <p className="mt-1 text-xs text-neutral-500">
              সবচেয়ে বেশি দামের বাজার
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-5 sm:col-span-2 lg:col-span-1">
            <p className="text-sm font-medium text-neutral-500">
              গড় দাম
            </p>

            <p className="mt-2 text-2xl font-bold text-blue-600">
              {Number(averagePrice.toFixed(2)).toLocaleString("bn-BD")} টাকা
            </p>

            <p className="mt-1 text-xs text-neutral-500">
              প্রতি {getUnit(product.unit)}-এর হিসাবে
            </p>
          </div>
        </div>

        <div className="mt-8">
          <div>
            <h2 className="text-xl font-bold text-neutral-800">
              বাজারভিত্তিক আজকের দাম
            </h2>
          </div>

          <div className="mt-4 overflow-x-auto rounded-2xl border border-neutral-200">
            <table className="w-full min-w-160 text-left text-sm">
              <thead className="bg-neutral-50">
                <tr className="border-b border-neutral-200">
                  <th className="px-4 py-4 font-semibold text-neutral-700">
                    বাজার
                  </th>

                  <th className="px-4 py-4 font-semibold text-neutral-700">
                    বিভাগ
                  </th>

                  <th className="px-4 py-4 font-semibold text-neutral-700">
                    সর্বনিম্ন
                  </th>

                  <th className="px-4 py-4 font-semibold text-neutral-700">
                    সর্বাধিক
                  </th>

                  <th className="px-4 py-4 font-semibold text-neutral-700">
                    গড়
                  </th>
                </tr>
              </thead>

              <tbody>
                {product.markets.map((market) => {
                  const average = (market.min + market.max) / 2;

                  return (
                    <tr
                      key={`${market.market}-${market.division}`}
                      className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50"
                    >
                      <td className="px-4 py-4 font-medium text-neutral-800">
                        {market.market}
                      </td>

                      <td className="px-4 py-4 text-neutral-500">
                        {market.division}
                      </td>

                      <td className="px-4 py-4 font-semibold text-green-600">
                        {market.min.toLocaleString("bn-BD")} টাকা
                      </td>

                      <td className="px-4 py-4 font-semibold text-red-500">
                        {market.max.toLocaleString("bn-BD")} টাকা
                      </td>

                      <td className="px-4 py-4 font-semibold text-neutral-700">
                        {average.toLocaleString("bn-BD")} টাকা
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetails;