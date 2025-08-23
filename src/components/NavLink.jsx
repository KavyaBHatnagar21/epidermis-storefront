import { Link } from "react-router-dom";

export default function NavLink({ to, children }) {
  return (
    <Link to={to} className=" hover:bg-gray-100 transition p-2">
      {children}
    </Link>
  );
}
