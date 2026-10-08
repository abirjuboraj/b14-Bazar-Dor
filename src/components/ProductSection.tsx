import { Product } from "@/type/type";
import ProductCard from "./ProductCard";

const ProductSection = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
  );

  const products: Product[] = await res.json();

  console.log(products);
  const risingPriceProducts: Product[] = products
    .filter((product: Product) => product.change.dir === "up")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct));

  const fallingPriceProducts: Product[] = products
    .filter((product: Product) => product.change.dir === "down")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct));

  return (
    <section className="max-w-6xl mx-auto w-full px-3 sm:my-15 sm:px-4">
      <div className="mt-10">
        <h2 className="mb-5 flex items-center gap-1 text-2xl font-bold text-neutral-800">
          <span className="text-lg font-medium leading-none text-red-500">
            ▲
          </span>
          <span>আজ দাম বেড়েছে</span>
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {risingPriceProducts.slice(0, 6).map((product: Product) => (
            <ProductCard key={product.id} product={product}></ProductCard>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <h2 className="mb-5 flex items-center gap-1 text-2xl font-bold text-neutral-800">
          <span className="text-lg font-medium leading-none text-green-500">
            ▼
          </span>
          <span>আজ দাম কমেছে</span>
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {fallingPriceProducts.slice(0, 6).map((product: Product) => (
            <ProductCard key={product.id} product={product}></ProductCard>
          ))}
        </div>
      </div>

      <div className="mt-10">
          <div>
            <h2>সব পণ্য</h2>
            <p>মোট ৩৩টি পণ্য দেখানো হচ্ছে</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product:Product) =>(
                    <ProductCard key={product.id} product={product}></ProductCard>
                ))}
            </div>
          </div>
      </div>
    </section>
  );
};

export default ProductSection;
