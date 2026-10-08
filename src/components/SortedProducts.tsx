"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/type/type";

const SortedProducts = ({ products }: { products: Product[] }) => {
  const [sort, setSort] = useState("default");

  const sortedProducts = [...products];

  if (sort === "low") {
    sortedProducts.sort((a, b) => a.today - b.today);
  }

  if (sort === "high") {
    sortedProducts.sort((a, b) => b.today - a.today);
  }

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-semibold text-neutral-700 sm:text-base">
          মোট {products.length.toLocaleString("bn-BD")} টি পণ্য দেখানো হচ্ছে
        </p>

        <div className="flex items-center gap-2">
          <label
            htmlFor="sort"
            className="whitespace-nowrap text-sm font-medium text-neutral-600"
          >
            সাজান:
          </label>

          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-auto rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-green-500 sm:w-auto"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">দাম: কম থেকে বেশি</option>
            <option value="high">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default SortedProducts;