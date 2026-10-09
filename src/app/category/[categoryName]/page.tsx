import { notFound } from "next/navigation";
import { Product, categoryType } from "@/type/type";
import EmptyState from "@/components/EmptyState";
import SortedProducts from "@/components/SortedProducts";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ categoryName: string }>;
}) => {
  const { categoryName } = await params;

  const categoryRes = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories",
  );

  const categories: categoryType[] = await categoryRes.json();

  const isValidCategory = categories.some(
    (category) => category.slug === categoryName,
  );

  if (!isValidCategory) {
    notFound();
  }

  const res = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products?category=${categoryName}`,
  );

  if (!res.ok) {
    notFound();
  }

  const products: Product[] = await res.json();

  if (!products.length) {
    return <EmptyState />;
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

      <section className="mt-6 rounded-2xl border border-neutral-200 p-5 sm:p-6">
        <SortedProducts products={products} />
      </section>
    </main>
  );
};

export default CategoryPage;
