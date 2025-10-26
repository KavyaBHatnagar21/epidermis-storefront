import React from "react";
import { Link } from "react-router-dom";
import IconButton from "./IconButton";

const CartButton = ({ itemCount }) => {
  return (
    <Link to="/cart" className="relative inline-block">
      <IconButton name="cart" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
          {itemCount}
        </span>
      )}
    </Link>
  );
};

export default CartButton;
