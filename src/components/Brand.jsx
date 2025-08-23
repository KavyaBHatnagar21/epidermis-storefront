import { Link } from "react-router-dom";

export default function Brand() {
  return (
    <div className="flex justify-center">
      <Link to="/" className="font-serif text-primary text-2xl tracking-widest">
        EPIDERMIS
      </Link>
    </div>
  );
}
