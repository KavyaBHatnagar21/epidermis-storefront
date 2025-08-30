import { useState, useEffect } from "react";
import { sdk } from "../configs/medusa";

export default function useCollections(id = null, fields = null) {
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCollections() {
      setLoading(true);
      setError(null);
      try {
        let response;
        if (id) {
          response = await sdk.store.collection.retrieve(id, fields ? { fields } : undefined);
          setCollections([response.collection]);
        } else {
          response = await sdk.store.collection.list({
            order: "handle",
          });
          setCollections(response.collections);
        }
      } catch (err) {
        setError(err);
        console.error("Failed to fetch collections", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCollections();
  }, [id, fields]);

  return { collections, loading, error };
}
