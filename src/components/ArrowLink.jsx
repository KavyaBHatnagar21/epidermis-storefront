import { Link } from "react-router-dom";
import iconArrow from "../assets/icon_arrow.svg";
import H4 from "./H4";

export default function ArrowLink({ to, children }) {
  return (
    <Link to={to} className="flex items-center">
      <H4>{children}</H4>
      <img src={iconArrow} alt="arrow right" className="ml-4" />
    </Link>
  );
}
