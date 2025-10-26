import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import useCart from "../context/useCart";
import H3 from "../components/H3.jsx";
import Button from "../components/Button.jsx";

const CartPage = () => {
  const {cart, removeFromCart, updateItemQuantity} = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cart) {
      setLoading(false);
    }
  }, [cart]);

  const formatPrice = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency", currency: cart?.currency_code || "INR",
    }).format(amount);
  };

  if (loading) {
    return <div>Loading cart...</div>;
  }

  if (!cart) {
    return <div>No cart available.</div>;
  }

  if (cart.items?.length === 0) {
    return (<div className="max-w-md mx-auto p-6 text-center py-20">
        <p className="text-lg mb-4 text-gray-700">
          Looks like your cart is feeling a little lonely. Time to add some fresh pieces from the shop and elevate your
          style.
        </p>
        <Link
          to="/shop"
          className="inline-block mt-4 bg-gray-900 text-white py-3 px-6 rounded hover:bg-gray-800 transition"
        >
          Go to Shop
        </Link>
      </div>);
  }

  return (<div className="max-w-md mx-auto p-6 flex flex-col gap-4">
      <H3 className="mb-6">Your Cart</H3>
      <ul className="divide-y divide-gray-300">
        {cart.items?.map((item) => (<li key={item.id} className="flex items-center py-4">
            <img
              src={item.thumbnail || item.image_url || ""}
              alt={item.title}
              className="w-20 h-20 object-cover rounded mr-4"
            />
            <div className="flex-1">
              <h2 className="font-semibold">{item.title}</h2>
              <p className="text-gray-700">{formatPrice(item.unit_price)}</p>
              <div className="flex items-center space-x-2 mt-2">
                <button
                  onClick={() => {
                    if (item.quantity > 1) {
                      updateItemQuantity(item.id, item.quantity - 1);
                    }
                  }}
                  className="bg-gray-200 text-gray-700 px-2 rounded hover:bg-gray-300"
                  aria-label={`Decrease quantity of ${item.title}`}
                >
                  -
                </button>
                <span className="px-3">{item.quantity}</span>
                <button
                  onClick={() => {
                    if (item.quantity < 5) {
                      updateItemQuantity(item.id, item.quantity + 1);
                    }
                  }}
                  className={`bg-gray-200 text-gray-700 px-2 rounded hover:bg-gray-300 ${item.quantity >= 5 ? "opacity-50 cursor-not-allowed" : ""}`}
                  aria-label={`Increase quantity of ${item.title}`}
                  disabled={item.quantity >= 5}
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-600 hover:text-red-800 font-bold text-xl px-3"
              aria-label={`Remove ${item.title} from cart`}
            >
              &times;
            </button>
          </li>))}
      </ul>
      <Button
        variant="primary"
        size="lg"
        onClick={() => alert("Proceed to checkout")}
      >
        Checkout
      </Button>
    </div>);
};

export default CartPage;
