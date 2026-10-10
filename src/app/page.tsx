import Banner from "@/components/Banner";
import ProductSectionSkeleton from "@/components/loadingSkeleton/ProductSectionLoaderSkeleton";
import ProductSection from "@/components/ProductSection";
import { Suspense } from "react";



export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <Suspense fallback={<ProductSectionSkeleton></ProductSectionSkeleton>}>
        <ProductSection></ProductSection>
      </Suspense>
    </div>
  );
}
