import { Link } from "react-router-dom";
import P from "./P";

export default function NavLink({ to, children }) {
  return (
    <Link to={to} className="p-2 transition hover:bg-gray-100">
      <P>{children}</P>
    </Link>
  );
}
