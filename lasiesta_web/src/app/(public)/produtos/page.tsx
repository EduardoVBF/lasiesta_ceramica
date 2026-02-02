import { Suspense } from "react";
import ProductsClientPage from "./ProductsClientPage";
import LoaderComp from "@/components/ui/loaderComp";

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 flex justify-center">
          <LoaderComp text="Carregando produtos..." />
        </div>
      }
    >
      <ProductsClientPage />
    </Suspense>
  );
}