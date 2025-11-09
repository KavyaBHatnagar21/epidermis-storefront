import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser.js";
import useCart from "../hooks/useCart.js";
import AddressCard from "../components/AddressCard.jsx";
import Loading from "../components/Loading.jsx";
import Payment from "../components/Payment.jsx";
import { sdk } from "../configs/medusa.js";

const CheckoutPayment = () => {
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const selectedAddressId = searchParams.get("address_id");

  const { customer } = useUser();
  const { cart, updateCart, unsetCart } = useCart();

  // Step 1: Update cart addresses when an address is chosen
  useEffect(() => {
    const updateCartAddress = async () => {
      const customerAddress = customer?.addresses?.find(
        (address) => address.id === selectedAddressId
      );
      if (!cart || !customerAddress) return;

      setLoading(true);

      const address = {
        first_name: customerAddress.first_name || "",
        last_name: customerAddress.last_name || "",
        address_1: customerAddress.address_1 || "",
        company: customerAddress.company || "",
        postal_code: customerAddress.postal_code || "",
        city: customerAddress.city || "",
        province: customerAddress.province || "",
        phone: customerAddress.phone || "",
        country_code:
          customerAddress.country_code || cart.region?.countries?.[0]?.iso_2,
      };

      try {
        await updateCart({
          updateData: {
            shipping_address: address,
            billing_address: address,
            email: customer?.email,
          },
        });
      } catch (error) {
        console.error("Failed to update cart address:", error);
      } finally {
        setLoading(false);
      }
    };

    updateCartAddress();
  }, [customer, selectedAddressId]);

  // Step 2: Handle provider selection and initiate payment session
  const handleProviderSelected = async (providerId) => {
    if (!providerId || !cart) return;

    try {
      setLoading(true);
      await sdk.store.payment.initiatePaymentSession(cart, {
        provider_id: providerId,
      });

      // Optional: Retrieve session for provider-hosted redirect flows
      const { payment_sessions } = await sdk.store.cart.retrieve(cart.id);
      console.log(await sdk.store.cart.retrieve(cart.id))
      // return;
      const session = payment_sessions?.find(
        (s) => s.provider_id === providerId
      );

      if (session?.data?.redirect_url) {
        // Hosted payment (e.g., Stripe Checkout, PayPal)
        window.location.href = session.data.redirect_url;
      } else {
        // No redirect → allow placing order directly
        await completeOrder();
      }
    } catch (error) {
      console.error("Failed to initiate payment session:", error);
      alert("Payment initialization failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Complete order after successful payment
  const completeOrder = async () => {
    if (!cart?.id) return;
    try {
      setLoading(true);
      const { order } = await sdk.store.cart.complete(cart.id);
      unsetCart();
      navigate(`/order-success?order_id=${order.id}`);
    } catch (error) {
      console.error("Order completion failed:", error);
      alert("Could not complete the order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  const customerAddress = customer?.addresses?.find(
    (address) => address.id === selectedAddressId
  );

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {customerAddress && (
        <div className="mb-6 p-4 border rounded bg-gray-50">
          <h2 className="font-semibold mb-2">Delivery Address</h2>
          <AddressCard address={customerAddress} />
        </div>
      )}

      <Payment onComplete={handleProviderSelected} />

      <div className="mt-8 text-sm text-gray-500 text-center">
        Secure payment method to be added<br/>(RazorPay or PhonePe, yet to decide)
      </div>
    </div>
  );
};

export default CheckoutPayment;
