import React from "react";
import CartIcon from "../assets/icon_cart.svg";
import ProfileIcon from "../assets/icon_profile.svg";
import HamburgerIcon from "../assets/icon_hamburger.svg";

export default function IconButton({ name, children, className, ...props }) {
  const icons = {
    cart: CartIcon,
    profile: ProfileIcon,
    hamburger: HamburgerIcon,
  };

  const Icon = icons[name] || null;

  return (
    <button
      className={`block h-7 transition hover:bg-gray-100 ${className || ""}`}
      {...props}
    >
      {Icon ? (
        <img src={Icon} alt={`${name} icon`} className="inline-block h-full" />
      ) : (
        children
      )}
    </button>
  );
}
