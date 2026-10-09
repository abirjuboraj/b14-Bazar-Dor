import { categoryType } from "@/type/type";
import CategoryNavLinks from "./CategoryNavLinks";

const CategoryLinks = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories"
  );

  const categoryName: categoryType[] = await res.json();

  return (
    <div className="w-full border-y border-gray-200 bg-white/80">
      <div className="mx-auto w-full max-w-6xl">
        <CategoryNavLinks categories={categoryName} />
      </div>
    </div>
  );
};

export default CategoryLinks;