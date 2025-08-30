import { Link } from "react-router-dom";
import clsx from "clsx";
import P from "./P";

export default function NavLink({ to, children, className, ...props }) {
  return (
    <Link to={to} className={clsx("p-2 transition hover:bg-gray-100", className)} {...props}>
      <P>{children}</P>
    </Link>
  );
}
