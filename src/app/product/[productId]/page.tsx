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

  console.log(product);

  const getUnit = (unit: string) => {
    if (unit === "kg") return "কেজি";
    if (unit === "litre") return "লিটার";
    if (unit === "dozen") return "ডজন";
    if (unit === "piece") return "পিস";

    return unit;
  };

  return (
    <section className="max-w-6xl mx-auto px-3 py-6 sm:px-4 sm:py-8">
      <div className="mt-10 bg-white rounded-2xl">
        <div className="flex flex-col gap-6 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex min-w-0 items-start gap-4 sm:gap-5">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-5xl sm:h-24 sm:w-24 sm:text-6xl">
              {product.image}
            </div>

            <div className="min-w-0">
              <h3 className="text-xl font-bold text-neutral-800 sm:text-2xl">
                {product.nameBn}
              </h3>

              <p className="mt-1 text-sm text-neutral-500">
                প্রতি {getUnit(product.unit)}{" "}
                <span className="mx-1 text-neutral-300">•</span>{" "}
                {product.categoryNameBn}
              </p>

              <p className="mt-4 text-sm font-medium">
                {product.change.dir === "up" &&
                  "গতকালের তুলনায় আজ দাম বেড়েছে • "}
                {product.change.dir === "down" &&
                  "গতকালের তুলনায় আজ দাম কমেছে • "}
                {product.change.dir === "flat" &&
                  "গতকালের তুলনায় আজ দাম অপরিবর্তিত"}

                {product.change.dir !== "flat" && (
                  <>
                    {Math.abs(product.today - product.yesterday).toLocaleString(
                      "bn-BD",
                    )}{" "}
                    টাকা
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="w-full rounded-2xl bg-neutral-100 p-2 text-center md:w-52 md:shrink-0">
            <p className="text-sm font-medium text-neutral-500">আজকের দাম</p>

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
        <div></div>
      </div>

      <div className="mt-7 bg-white rounded-2xl border border-neutral-200 p-5">
        <h3>দামের সারসংক্ষেপ</h3>
        <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="border border-neutral-200 p-5 rounded-2xl">
                <h3>সর্বনিম্ন দাম</h3>
                <span className="text-green-500">টাকা</span>
                <p>সবচেয়ে কম দামের বাজার</p>
            </div>
            <div className="border border-neutral-200 p-5 rounded-2xl">
              <h3>সর্বাধিক দাম</h3>
                <span className="text-red-500">টাকা</span>
                <p>সবচেয়ে বেশি দামের বাজার</p>  
            </div>
            <div className="border border-neutral-200 p-5 rounded-2xl">
                <h3>গড় দাম</h3>
                <span className="text-green-500">টাকা</span>
                <p>প্রতি কেজি-এর হিসাবে</p>
            </div>
        </div>

        <div className="mt-7">
            <h2>বাজারভিত্তিক আজকের দাম</h2>
            
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
