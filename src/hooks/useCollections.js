import { useState, useEffect } from "react";
import { sdk } from "../configs/medusa";

export default function useCollections() {
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCollections() {
      setLoading(true);
      setError(null);
      try {
        const response = await sdk.store.collection.list({
          order: "handle",
        });
        setCollections(response.collections);
      } catch (err) {
        setError(err);
        console.error("Failed to fetch collections", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCollections();
  }, []);

  return { collections, loading, error };
}
