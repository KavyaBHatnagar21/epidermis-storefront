import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart.js";
import H3 from "../components/H3.jsx";
import Button from "../components/Button.jsx";
import LinkButton from "../components/LinkButton.jsx";
import CartItem from "../components/CartItem.jsx";
import Loading from "../components/Loading.jsx";

const CartPage = () => {
  const { cart, removeFromCart, updateItemQuantity } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cart) {
      setLoading(false);
    }
  }, [cart]);

  const formatPrice = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: cart?.currency_code || "INR",
    }).format(amount);
  };

  if (loading) {
    return <Loading />;
  }

  if (!cart) {
    return <div>No cart available.</div>;
  }

  if (cart.items?.length === 0) {
    return (
      <div className="max-w-md mx-auto p-6 text-center py-20">
        <p className="text-lg mb-4 text-gray-700">
          Looks like your cart is feeling a little lonely. Time to add some fresh
          pieces from the shop and elevate your style.
        </p>
        <Link
          to="/shop"
          className="inline-block mt-4 bg-gray-900 text-white py-3 px-6 rounded hover:bg-gray-800 transition"
        >
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 flex flex-col gap-4">
      <H3 className="mb-6">Your Cart</H3>
      <ul className="divide-y divide-gray-300">
        {cart.items?.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            formatPrice={formatPrice}
            updateItemQuantity={updateItemQuantity}
            removeFromCart={removeFromCart}
          />
        ))}
      </ul>
      <LinkButton
        variant="primary"
        size="lg"
        to="/checkout/address"
        disabled={cart.items.length === 0}
      >
        Checkout
      </LinkButton>
    </div>
  );
};

export default CartPage;
