import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import P from "./P";

export default function ProductCard({ product, className, ...props }) {
  return (
    <Link
      to={`/product/${product.handle}`}
      className={clsx(
        "flex w-64 flex-col items-center transition hover:bg-gray-100",
        className,
      )}
      {...props}
    >
      {product.images && product.images.length > 0 && (
        <div className="mb-6 flex aspect-square w-full items-center justify-center overflow-hidden">
          <img
            src={product.images[0].url}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-102"
          />
        </div>
      )}
      <P className="text-secondary mb-2 font-sans">{product.title}</P>
      {product.variants &&
        product.variants.length > 0 &&
        product.variants[0].calculated_price && (
          <P className="mb-4">
            ₹{" "}
            {product.variants[0].calculated_price.calculated_amount.toFixed(2)}
          </P>
        )}
    </Link>
  );
}
