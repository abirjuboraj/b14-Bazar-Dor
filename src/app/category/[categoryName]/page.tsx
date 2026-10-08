import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { Product, categoryType } from "@/type/type";
import Link from "next/link";
import { FaHome, FaShoppingBasket } from "react-icons/fa";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ categoryName: string }>;
}) => {
  const { categoryName } = await params;

  const categoryRes = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
  );

  const categories: categoryType[] = await categoryRes.json();

  const isValidCategory = categories.some(
    (category) => category.slug === categoryName,
  );

  if (!isValidCategory) {
    notFound();
  }

  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products?category=${categoryName}`,
  );

  if (!res.ok) {
    notFound();
  }

  const products: Product[] = await res.json();

  if (!products.length) {
    return (
      <main className="mx-auto flex min-h-[60vh] w-full max-w-6xl items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-3xl text-green-600">
            <FaShoppingBasket />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-neutral-800">
            এই ক্যাটাগরিতে কোনো পণ্য নেই
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-neutral-500">
            দুঃখিত, এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য পাওয়া যাচ্ছে না। অন্য
            ক্যাটাগরি দেখতে হোম পেজে ফিরে যান।
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-green-700 hover:shadow-md"
          >
            <FaHome />
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </main>
    );
  }

  const category = products[0];

  return (
    <main className="mx-auto w-full max-w-6xl px-3 py-6 sm:px-4 sm:py-8">
      <section className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-4xl sm:h-20 sm:w-20 sm:text-5xl">
            {category.categoryIcon}
          </div>

          <div>
            <h1 className="text-2xl font-bold text-neutral-800 sm:text-3xl">
              {category.categoryNameBn}
            </h1>

            <p className="mt-1 text-sm text-neutral-500">
              {products.length.toLocaleString("bn-BD")} টি পণ্যের আজকের দাম ও
              পরিবর্তন
            </p>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-neutral-200  p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
              className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-700 outline-none focus:border-green-500"
            >
              <option value="default">ডিফল্ট</option>
              <option value="low">দাম: কম থেকে বেশি</option>
              <option value="high">দাম: বেশি থেকে কম</option>
            </select>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default CategoryPage;
