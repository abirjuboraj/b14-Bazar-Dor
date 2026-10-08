import { categoryType } from "@/type/type";
import Link from "next/link";

const CategoryLinks = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories"
  );

  const categoryName: categoryType[] = await res.json();

  return (
    <div className="w-full border-y border-gray-200 bg-white/80">
      <div className="mx-auto w-full max-w-6xl">
        <nav className="flex items-center gap-1 overflow-x-auto py-2 sm:gap-2 sm:py-2.5">
          {categoryName.map((item: categoryType) => (
            <Link
              key={item.slug}
              href={`/category/${item.slug}`}
              className="group flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-gray-600 transition-all duration-200 hover:bg-green-50 hover:text-green-600 sm:gap-2 sm:px-3.5 sm:text-sm lg:px-4"
            >
              <span className="text-base leading-none transition-transform duration-200 group-hover:scale-110 sm:text-lg">
                {item.icon}
              </span>

              <span className="whitespace-nowrap">{item.nameBn}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default CategoryLinks;

