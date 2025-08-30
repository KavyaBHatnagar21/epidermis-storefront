import { Link } from "react-router-dom";
import clsx from "clsx";
import iconArrow from "../assets/icon_arrow.svg";
import H4 from "./H4";

export default function ArrowLink({
  to,
  children,
  className,
  useButton = false,
  ...props
}) {
  if (useButton) {
    return (
      <button
        className={clsx(
          "border-primary hover:bg-primary border px-6 py-2 font-serif tracking-widest uppercase transition hover:text-white",
          className,
        )}
        {...props}
      >
        {children || "Explore →"}
      </button>
    );
  }

  return (
    <Link
      to={to}
      className={clsx(
        "flex items-center py-4 font-serif tracking-widest uppercase transition",
        className,
      )}
      {...props}
    >
      <H4>{children}</H4>
      <img src={iconArrow} alt="arrow right" className="ml-4" />
    </Link>
  );
}
