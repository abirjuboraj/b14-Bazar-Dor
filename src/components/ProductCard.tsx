import { Product } from "@/type/type";

const ProductCard = ({ product }: { product: Product }) => {
  const getUnit = (unit: string) => {
    if (unit === "kg") return "কেজি";
    if (unit === "litre") return "লিটার";
    if (unit === "dozen") return "ডজন";
    if (unit === "piece") return "পিস";

    return unit;
  };
  return (
    <div
      key={product.id}
      className="group rounded-2xl border border-neutral-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-green-400 hover:shadow-lg"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl bg-green-50 text-3xl sm:h-14 sm:w-14 sm:text-4xl">
          {product.image}
        </div>

        <div className="min-w-0">
          <h2 className="truncate text-base font-bold text-neutral-800 sm:text-lg">
            {product.nameBn}
          </h2>

          <p className="mt-1 text-xs text-neutral-500 sm:text-sm">
            প্রতি {getUnit(product.unit)}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs font-medium text-neutral-500 sm:text-sm">
          আজকের দাম
        </p>

        <div className="mt-1 flex items-center justify-between gap-2">
          <span className="text-md font-bold text-neutral-900 ">
            {product.today.toLocaleString("bn-BD")} টাকা
          </span>

          {product.change.dir === "up" && (
            <span className="shrink-0 rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-500 ">
              <span className="text-[10px]">▲</span>{" "}
              {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
            </span>
          )}

          {product.change.dir === "down" && (
            <span className="shrink-0 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-600 sm:text-sm">
              <span className="text-[10px]">▼</span>{" "}
              {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
            </span>
          )}
          {product.change.dir === "flat" && (
            <span className="shrink-0 rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-semibold text-neutral-500 sm:text-sm">
              — ০.০%
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
