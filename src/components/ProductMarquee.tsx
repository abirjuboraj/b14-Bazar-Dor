"use client";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { Product } from "@/type/type";

type MarqueeProps = {
  products: Product[];
};

const getUnit = (unit: string) => {
  if (unit === "kg") return "কেজি";
  if (unit === "litre") return "লিটার";
  if (unit === "dozen") return "ডজন";
  if (unit === "piece") return "পিস";

  return unit;
};

const ProductMarquee = ({ products }: MarqueeProps) => {
  return (
    <div className="w-full border-y border-neutral-200 bg-neutral-50">
      <Marquee
        speed={70}
        pauseOnHover
        className="py-2"
      >
        {products.map((product) => {
          const { dir, pct } = product.change;

          return (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="mx-5 flex shrink-0 items-center gap-2 text-sm"
            >
              <span className="text-lg">{product.image}</span>

              <span className="font-medium text-neutral-800 hover:underline">
                {product.nameBn}
              </span>

              <span className="font-semibold text-neutral-800">
                {product.today.toLocaleString("bn-BD")} টাকা
                <span className="ml-1 text-xs font-normal">
                  / {getUnit(product.unit)}
                </span>
              </span>

              {dir === "up" && (
                <span className="font-semibold text-red-500">
                  ▲ {pct.toLocaleString("bn-BD")}%
                </span>
              )}

              {dir === "down" && (
                <span className="font-semibold text-green-600">
                  ▼ {pct.toLocaleString("bn-BD")}%
                </span>
              )}

              {dir === "flat" && (
                <span className="font-semibold text-neutral-400">—0.0%</span>
              )}
            </Link>
          );
        })}
      </Marquee>
    </div>
  );
};

export default ProductMarquee;
