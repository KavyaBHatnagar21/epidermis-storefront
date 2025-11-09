import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  // Parse query params
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("order_id");

  // Determine if success or failed based on presence of orderId
  const isSuccess = Boolean(orderId);

  return (
    <div className="max-w-xl mx-auto p-8 text-center mh min-h-lg mt-12">
      {isSuccess ? (
        <>
          <h1 className="text-4xl font-extrabold mb-4 text-gray-900">Thank you for your purchase!</h1>
          <p className="text-lg text-gray-700 mb-2">Your order has been successfully placed.</p>
          <p className="text-lg font-semibold text-gray-800 mb-4">Order ID: <span className="text-indigo-600">{orderId.slice(-10)}</span></p>
          <p className="text-md text-gray-600 italic">You will be kept updated through WhatsApp.</p>
          <button
            onClick={() => navigate("/contact")}
            className="text-blue-600"
          >
            Have Questions? Get in Touch!
          </button>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-4 text-red-600">Failed</h1>
          <p className="mb-6">There was a problem with your order.</p>
          <button
            onClick={() => navigate("/contact")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Contact Us
          </button>
        </>
      )}
    </div>
  );
}

export default OrderSuccess;
