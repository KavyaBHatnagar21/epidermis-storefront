import React from "react";

const CartItem = ({ item, formatPrice, updateItemQuantity, removeFromCart }) => {
  return (
    <li key={item.id} className="flex items-center py-4">
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
            className={`bg-gray-200 text-gray-700 px-2 rounded hover:bg-gray-300 ${
              item.quantity >= 5 ? "opacity-50 cursor-not-allowed" : ""
            }`}
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
    </li>
  );
};

export default CartItem;
