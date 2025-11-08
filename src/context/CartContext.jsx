import React, { createContext, useEffect, useState } from "react";
import { sdk } from "../configs/medusa.js";
import { useRegion } from "./RegionContext.jsx";
import useUser from "../hooks/useUser.js";

const CartContext = createContext(null);

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const { region } = useRegion();
  const { customer } = useUser();

  const getOrCreateCart = async () => {
    if (cart) {
      return cart;
    }

    const cartId = localStorage.getItem("cart_id");
    if (cartId) {
      try {
        const { cart: dataCart } = await sdk.store.cart.retrieve(cartId);
        setCart(dataCart);
        return dataCart;
      } catch (error) {
        console.error("Failed to retrieve cart:", error);
        localStorage.removeItem("cart_id");
        setCart(null);
      }
    }

    try {
      const { cart: newCart } = await sdk.store.cart.create({
        region_id: region.id,
      });
      localStorage.setItem("cart_id", newCart.id);
      setCart(newCart);
      return newCart;
    } catch (error) {
      console.error("Failed to create cart:", error);
      return null;
    }
  };

  useEffect(() => {
    if (!region) {
      return;
    }

    if (!cart) {
      getOrCreateCart();
    }
  }, [region]);

  useEffect(() =>
  {
    const updateCartEmail = async () => {
      if (cart && customer?.email && cart.email !== customer.email) {
        try {
          const { cart: updatedCart } = await sdk.store.cart.update(cart.id, {
            email: customer.email,
          });
          setCart(updatedCart);
        } catch (error) {
          console.error("Failed to update cart email:", error);
        }
      }
    };
    updateCartEmail();
  }, [customer?.email, cart]);

  const refreshCart = () => {
    localStorage.removeItem("cart_id");
    setCart(null);
  };

  const addToCart = async (variant_id, quantity = 1) => {
    try {
      const currentCart = await getOrCreateCart();
      if (!currentCart) {
        throw new Error("Could not get or create cart");
      }
      const { cart: updatedCart } = await sdk.store.cart.createLineItem(
        currentCart.id,
        {
          variant_id,
          quantity,
        }
      );
      setCart(updatedCart);
      return updatedCart;
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      throw error;
    }
  };

  const removeFromCart = async (lineItemId) => {
    try {
      const currentCart = await getOrCreateCart();
      if (!currentCart) {
        throw new Error("Could not get or create cart");
      }
      const { cart: updatedCart } = await sdk.store.cart.deleteLineItem(
        currentCart.id,
        lineItemId
      );
      setCart(updatedCart);
      return updatedCart;
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      throw error;
    }
  };

  const updateItemQuantity = async (lineItemId, quantity) => {
    try {
      if (quantity > 5) {
        quantity = 5;
      }
      const currentCart = await getOrCreateCart();
      if (!currentCart) {
        throw new Error("Could not get or create cart");
      }
      const { cart: updatedCart } = await sdk.store.cart.updateLineItem(
        currentCart.id,
        lineItemId,
        { quantity }
      );
      setCart(updatedCart);
      return updatedCart;
    } catch (error) {
      console.error("Failed to update item quantity:", error);
      throw error;
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart, refreshCart, addToCart, removeFromCart, updateItemQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
