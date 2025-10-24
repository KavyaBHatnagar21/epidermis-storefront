import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import { sdk } from "../configs/medusa";

export default function CategoriesPage() {
  const { categoryId } = useParams();
  const [categoryTitle, setCategoryTitle] = useState("");

  useEffect(() => {
    sdk.store.category
      .retrieve(categoryId)
      .then(({ product_category }) => {
        setCategoryTitle(product_category.name);
      })
      .catch(() => {
        setCategoryTitle("");
      });
  }, [categoryId]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">{categoryTitle} Category</h1>
      <CategoryProducts categoryId={categoryId} />
    </div>
  );
}

function CategoryProducts({ categoryId }) {
  const { products, loading, error } = useProducts({ categoryId, limit: 20 });

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Failed to load products.</p>;
  }

  if (!products || products.length === 0) {
    return <p>No products found for this category.</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
