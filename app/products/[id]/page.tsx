import React from "react";
import dynamic from "next/dynamic";
import ProductViewInfo from "./component/ProductViewInfo";

// const ProductViewInfo = dynamic(() => import("./component/ProductViewInfo"));

const ProductSinglePage = () => {
  return (
    <section className="px-0 sm:px-0 lg:px-6 mx-auto py-3 sm:py-3 lg:py-6">
      <ProductViewInfo />
    </section>
  );
};

export default ProductSinglePage;
