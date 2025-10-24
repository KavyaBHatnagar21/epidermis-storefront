import React, { useEffect, useState } from "react";
import CollectionPreview from "../components/CollectionPreview";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { sdk } from "../configs/medusa";

export default function Shop() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    sdk.store.category
      .list()
      .then(({ product_categories }) => {
        setCategories(product_categories);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Message>Failed to load categories.</Message>;
  }

  return (
    <div>
      {categories && categories.length > 0 ? (
        categories.map((cat) => (
          <CollectionPreview
            key={cat.id}
            category_id={cat.id}
            category_title={cat.name}
            category_handle={cat.handle}
          />
        ))
      ) : (
        <Message>No categories found.</Message>
      )}
    </div>
  );
}
