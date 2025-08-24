import { Link } from "react-router-dom";
import clsx from "clsx";
import iconArrow from "../assets/icon_arrow.svg";
import H4 from "./H4";

export default function ArrowLink({ to, children, className, ...props }) {
  return (
    <Link to={to} className={clsx("flex items-center", className)} {...props}>
      <H4>{children}</H4>
      <img src={iconArrow} alt="arrow right" className="ml-4" />
    </Link>
  );
}
