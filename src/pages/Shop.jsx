import CollectionPreview from "../components/CollectionPreview";
import Loading from "../components/Loading";
import Message from "../components/Message";
import useCollections from "../hooks/useCollections";

export default function Shop() {
  const { collections, loading, error } = useCollections();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Message>Failed to load collections.</Message>;
  }

  return (
    <div>
      {collections && collections.length > 0 ? (
        collections.map((col) => (
          <CollectionPreview key={col.id} title={col.title} />
        ))
      ) : (
        <Message>No collections found.</Message>
      )}
    </div>
  );
}
