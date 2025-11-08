import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

const baseStyles = "w-full px-4 py-4 inline-flex items-center justify-center border font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

const variantStyles = {
  primary: "bg-brown text-white hover:opacity-100 focus:ring-blue-500",
  secondary: "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200 focus:ring-gray-500",
  danger: "bg-red-600 border-red-600 text-white hover:bg-red-700 focus:ring-red-500",
};

const sizeStyles = {
  sm: "px-2.5 py-1.5 text-sm",
  md: "px-4 py-2 text-md",
  lg: "px-6 py-3 text-lg",
};

const LinkButton = ({
  to,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) => {
  return (
    <Link
      to={to}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
