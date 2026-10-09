"use client";

import { categoryType } from "@/type/type";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CategoryNavLinks = ({
  categories,
}: {
  categories: categoryType[];
}) => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1 overflow-x-auto py-2 sm:gap-2 sm:py-2.5">
      {categories.map((item) => {
        const isActive = pathname === `/category/${item.slug}`;

        return (
          <Link
            key={item.slug}
            href={`/category/${item.slug}`}
            aria-current={isActive ? "page" : undefined}
            className={`group flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all duration-200 sm:gap-2 sm:px-3.5 sm:text-sm lg:px-4 ${
              isActive
                ? "bg-green-100 text-green-700"
                : "text-gray-600 hover:bg-green-50 hover:text-green-600"
            }`}
          >
            <span className="text-base leading-none transition-transform duration-200 group-hover:scale-110 sm:text-lg">
              {item.icon}
            </span>

            <span className="whitespace-nowrap">{item.nameBn}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default CategoryNavLinks;