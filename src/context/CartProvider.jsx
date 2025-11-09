import {useEffect, useState} from "react";
import {useRegion} from "../hooks/useRegion.js";
import {CartContext} from "./CartContext.js";
import {sdk} from "../configs/medusa.js";
import useUser from "../hooks/useUser.js";

export const CartProvider = ({children}) => {
  const [cart, setCart] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {region} = useRegion();
  const {customer} = useUser();

  // Helper: centralized error handler
  const handleError = (msg, err) => {
    console.error(msg, err);
    setError(err?.message || msg);
    setLoading(false);
  };

  // --- INITIAL CART LOAD ---
  useEffect(() => {
    if (!region) return;

    if (cart) {
      localStorage.setItem("cart_id", cart.id);
      return;
    }

    const cartId = localStorage.getItem("cart_id");

    const fetchOrCreateCart = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!cartId) {
          await refreshCart();
        } else {
          const {cart: dataCart} = await sdk.store.cart.retrieve(cartId, {
            fields: "+items.variant.*,+items.variant.options.*,+items.variant.options.option.*",
          });
          setCart(dataCart);
        }
      } catch (err) {
        handleError("Error retrieving cart:", err);
      } finally {
        setLoading(false);
      }
    };


    fetchOrCreateCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, region]);

  useEffect(() => {
    console.log("user Changed")
    if (!region) return;
    if (!customer) return;
    if(!cart) return

    console.log("Region, Cart and customer exists");
    console.log("Cart ", cart);

    const handleUserChange = async () => {
      console.log("Transfering ownership")
      const {cart: updatedCart} = await sdk.store.cart.transferCart(cart.id)
      console.log("new customer id in cart is", updatedCart.customer_id)
      setCart(updatedCart);
    }

    if(cart.customer_id !== customer.id) {
      console.log("Cart customer id not same as logged in customer id", cart.customer_id, customer.id)
      handleUserChange();
    }
  }, [customer, region])

  // --- UPDATE REGION IF CHANGED ---
  useEffect(() => {
    if (!cart || !region || cart.region_id === region.id) return;

    setLoading(true);
    setError(null);

    sdk.store.cart
      .update(cart.id, {region_id: region.id})
      .then(({cart: dataCart}) => setCart(dataCart))
      .catch((err) => handleError("Error updating cart region:", err))
      .finally(() => setLoading(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region]);

  // --- CREATE OR REFRESH CART ---
  const refreshCart = async () => {
    if (!region) return;

    setLoading(true);
    setError(null);
    try {
      const {cart: dataCart} = await sdk.store.cart.create({
        region_id: region.id,
      });
      localStorage.setItem("cart_id", dataCart.id);
      setCart(dataCart);
      return dataCart;
    } catch (err) {
      handleError("Error creating cart:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- ADD ITEM TO CART ---
  const addToCart = async (variantId, quantity) => {
    setLoading(true);
    setError(null);
    try {
      const activeCart = cart || (await refreshCart());
      if (!activeCart) throw new Error("Could not create cart");
      const {cart: dataCart} = await sdk.store.cart.createLineItem(activeCart.id, {variant_id: variantId, quantity});
      setCart(dataCart);
      return dataCart;
    } catch (err) {
      handleError("Error adding item to cart:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- UPDATE CART DETAILS OR SHIPPING METHOD ---
  const updateCart = async ({updateData, shippingMethodData}) => {
    if (!updateData && !shippingMethodData) return cart;

    setLoading(true);
    setError(null);
    try {
      let returnedCart = cart;

      if (updateData) {
        const res = await sdk.store.cart.update(cart.id, updateData);
        returnedCart = res.cart;
      }

      if (shippingMethodData) {
        const res = await sdk.store.cart.addShippingMethod(cart.id, shippingMethodData);
        returnedCart = res.cart;
      }

      setCart(returnedCart);
      return returnedCart;
    } catch (err) {
      handleError("Error updating cart:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // --- UPDATE ITEM QUANTITY ---
  const updateItemQuantity = async (itemId, quantity) => {
    setLoading(true);
    setError(null);
    try {
      const {cart: dataCart} = await sdk.store.cart.updateLineItem(cart.id, itemId, {quantity});
      setCart(dataCart);
      return dataCart;
    } catch (err) {
      handleError("Error updating item quantity:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- REMOVE SINGLE ITEM ---
  const removeItem = async (itemId) => {
    const cartId = localStorage.getItem("cart_id");
    if (!cartId) return;

    setLoading(true);
    setError(null);
    try {
      const {parent: updatedCart} = await sdk.store.cart.deleteLineItem(cartId, itemId);
      setCart(updatedCart);
      return updatedCart;
    } catch (err) {
      handleError("Error removing item from cart:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- CLEAR CART COMPLETELY ---
  const unsetCart = () => {
    localStorage.removeItem("cart_id");
    setCart(undefined);
    setError(null);
  };

  return (<CartContext.Provider
    value={{
      cart, loading, error, addToCart, updateCart, refreshCart, updateItemQuantity, unsetCart, removeItem,
    }}
  >
    {children}
  </CartContext.Provider>);
};
