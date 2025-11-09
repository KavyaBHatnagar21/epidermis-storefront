import React, { useEffect, useState } from "react";
import { sdk } from "../configs/medusa.js"; // adjust path
import useCart from "../hooks/useCart.js";
import Button from "./Button.jsx";

export default function Payment({ onComplete }) {
  const { cart } = useCart();
  const [loading, setLoading] = useState(false);
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    if (!cart) return;
    setLoading(true);
    sdk.store.payment
      .listPaymentProviders({ region_id: cart.region_id || "" })
      .then(({ payment_providers }) => setProviders(payment_providers || []))
      .catch((e) => console.error("Failed to list providers", e))
      .finally(() => setLoading(false));
  }, [cart]);

  if (!cart) return null;

  const defaultProvider = providers.length > 0 ? providers[0].id : "";

  return (
    <div>
      {loading && <div>Loading payment providers…</div>}
      <div>
        {providers.length > 0 && (
          <div className="mb-4">
            Selected payment method: <strong>Dummy payment Method</strong>
          </div>
        )}
      </div>
      <Button disabled={!defaultProvider} onClick={() => onComplete(defaultProvider)}>
        Proceed to Pay
      </Button>
    </div>
  );
}
