import React from "react";
import ArrowLink from "./ArrowLink";
import H3 from "./H3";
import useProducts from "../hooks/useProducts";
import ProductCard from "./ProductCard";

export default function CollectionPreview({ title, id }) {
  const { products, loading, error } = useProducts({
    limit: 6,
    collectionId: id,
  });

  return (
    <div className="container mx-auto mt-8 mb-20 sm:px-16">
      <H3 className="mb-12 text-center">{title} Collection</H3>
      <div className="row-start-2 mb-20 grid grid-cols-3 justify-items-center gap-y-16">
        {loading && <p>Loading products...</p>}
        {error && <p>Failed to load products.</p>}
        {products && products.length > 0
          ? products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          : !loading && <p>No products found.</p>}
      </div>
      <ArrowLink to={`/collection/${id}`} className="justify-center">
        Explore More
      </ArrowLink>
    </div>
  );
}
