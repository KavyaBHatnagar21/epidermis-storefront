import React from "react";
import CartIcon from "../assets/icon_cart.svg";
import ProfileIcon from "../assets/icon_profile.svg";

export default function IconButton({ name, children, className, ...props }) {
  const icons = {
    cart: CartIcon,
    profile: ProfileIcon,
  };

  const Icon = icons[name] || null;

  return (
    <button className={` p-2 transition hover:bg-gray-100 ${className || ""}`} {...props}>
      {Icon ? <img src={Icon} alt={`${name} icon`} className="inline-block w-10 h-10" /> : children}
    </button>
  );
}
