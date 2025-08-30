import { Link } from "react-router-dom";
import clsx from "clsx";

export default function Brand({ variant = "dark", className, ...props }) {
  return (
    <Link
      to="/"
      className={clsx(
        "font-serif text-2xl tracking-widest",
        variant === "dark" ? "text-primary" : "text-white",
        className,
      )}
      {...props}
    >
      EPIDERMIS
    </Link>
  );
}
