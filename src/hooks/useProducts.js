import { useState, useEffect } from "react";
import { sdk } from "../configs/medusa";

export default function useProducts({
  collectionId = null,
  limit = 20,
  offset = 0,
} = {}) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);
      try {
        const response = await sdk.store.product.list({
          fields: "*variants.calculated_price",
          //region_id: "IN",
          limit,
          offset,
          ...(collectionId ? { collection_id: collectionId } : {}),
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
  }, [collectionId, limit, offset]);

  return { products, loading, error };
}
