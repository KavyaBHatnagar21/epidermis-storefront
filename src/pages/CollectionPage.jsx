import React from "react";
import { useParams } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import useCollections from "../hooks/useCollections";
import H3 from "../components/H3";
import ProductCard from "../components/ProductCard";
import Message from "../components/Message";

export default function CollectionPage() {
  const { id } = useParams();
  const { products, loading, error } = useProducts({ collectionId: id });
  const {
    collections,
    loading: loadingCollection,
    error: errorCollection,
  } = useCollections(id, "title");

  const collectionTitle =
    collections && collections.length > 0 && collections[0]
      ? `${collections[0].title} Collection`
      : "Collection";

  if (!(collections && collections.length > 0 && collections[0])) {
    return <Message>This collection doesn't exist.</Message>;
  }
  return (
    <div className="container mx-auto mt-8 mb-20 sm:px-16">
      <H3 className="mb-12 text-center">{collectionTitle}</H3>
      <div className="row-start-2 mb-20 grid grid-cols-3 justify-items-center gap-y-16">
        {loading && <p>Loading products...</p>}
        {error && <p>Failed to load products.</p>}
        {products && products.length > 0
          ? products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          : !loading && (
              <Message className="col-span-3">No products found.</Message>
            )}
      </div>
    </div>
  );
}
