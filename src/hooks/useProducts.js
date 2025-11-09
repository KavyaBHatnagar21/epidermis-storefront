import { useState, useEffect } from "react";
import { sdk } from "../configs/medusa";
import {useRegion} from "./useRegion.js";

export default function useProducts({
  categoryId = null,
  limit = 20,
  offset = 0,
} = {}) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const {region} = useRegion();

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);
      try {
        const response = await sdk.store.product.list({
          fields: "*variants.calculated_price",
          region_id: region.id,
          limit,
          offset,
          ...(categoryId ? { category_id: categoryId } : {}),
        });
        setProducts(response.products);
      } catch (err) {
        setError(err);
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [categoryId, limit, offset]);

  return { products, loading, error };
}
