"use clinet";

import React from "react";
import dynamic from "next/dynamic";
import "@/styles/editor.css";

const ProductDetail = dynamic(() => import("./component/ProductDetail"));

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <section className="px-0 sm:px-0 lg:px-6 mx-auto py-3 sm:py-3 lg:py-6">
      <ProductDetail slug={params.id} />
    </section>
  );
}
