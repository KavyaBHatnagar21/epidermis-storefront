import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { sdk } from "../configs/medusa";
import {useRegion} from "../hooks/useRegion.js";
import H3 from "../components/H3.jsx";

export default function CategoriesPage() {
  const { categoryId:handle } = useParams(); // changed: handle instead of categoryId
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(null);
  const {region} = useRegion();

  useEffect(() => {
    if (!handle) return;

    setLoading(true);
    sdk.store.category
      .list({ handle })
      .then(({ product_categories }) => {
        console.log(product_categories);
        const found = product_categories?.[0] || null;
        setCategory(found);
      })
      .catch((err) => {
        console.error("Failed to load category:", err);
        setCategory(null);
      })
      .finally(() => setLoading(false));
  }, [handle]);

  useEffect(() => {
    async function fetchProducts(categoryId) {
      setLoading(true);
      try {
        const response = await sdk.store.product.list({
          fields: "*variants.calculated_price",
          region_id: region.id,
          ...(categoryId ? { category_id: categoryId } : {}),
        });
        setProducts(response.products);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts(category?.id);
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading category...</p>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Category not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 mb-20 sm:px-16">
      <H3 className="mb-12 text-center">{category.name} Collection</H3>
      <div className="row-start-2 mb-20 grid grid-cols-3 justify-items-center gap-y-16">
        {loading && <p>Loading products...</p>}
        {products && products.length > 0
          ? products.map((product) => (
            <ProductCard key={product.id} product={product}/>
          ))
          : !loading && <p>No products found.</p>}
      </div>
    </div>
  );
}

