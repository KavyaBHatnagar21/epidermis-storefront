import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useUser from "../hooks/useUser.js";
import useCart from "../hooks/useCart.js";
import AddressCard from "../components/AddressCard.jsx";

const CheckoutPayment = () => {
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const selectedAddressId = searchParams.get("address_id");

  const { customer } = useUser();
  const { cart, setCart } = useCart();

  useEffect(() => {
    const updateCartAddress = async () => {
      const customerAddress = customer?.addresses.find(
        (address) => address.id === selectedAddressId
      );
      if (!cart || !customerAddress) {
        return;
      }
      setLoading(true);

      const address = {
        first_name: customerAddress.first_name || "",
        last_name: customerAddress.last_name || "",
        address_1: customerAddress.address_1 || "",
        company: customerAddress.company || "",
        postal_code: customerAddress.postal_code || "",
        city: customerAddress.city || "",
        country_code:
          customerAddress.country_code || cart.region?.countries?.[0].iso_2,
        province: customerAddress.province || "",
        phone: customerAddress.phone || "",
      };

      try {
        const { cart: updatedCart } = await sdk.store.cart.update(cart.id, {
          shipping_address: address,
          billing_address: address,
        });
        setCart(updatedCart);
      } catch (error) {
        console.error("Failed to update cart address:", error);
      } finally {
        setLoading(false);
      }
    };

    updateCartAddress();
  }, [selectedAddressId, customer, cart, setCart]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const customerAddress = customer?.addresses.find(
    (address) => address.id === selectedAddressId
  );

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold">You're on the cart page</h1>
      {customerAddress && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <h2 className="font-semibold mb-2">Selected Address:</h2>
          <AddressCard address={customerAddress} />
        </div>
      )}
    </div>
  );
};

export default CheckoutPayment;
