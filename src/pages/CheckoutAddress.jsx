import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser.js";
import H3 from "../components/H3.jsx";
import Loading from "../components/Loading.jsx";
import LinkButton from "../components/LinkButton.jsx";
import AddressCard from "../components/AddressCard.jsx";

const CheckoutAddress = () => {
  const { customer } = useUser();
  const navigate = useNavigate();
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  useEffect(() => {
    if (!customer) {
      navigate("/auth?redirect=/checkout/address");
    }
  }, [customer, navigate]);

  if (!customer) {
    return <Loading />;
  }

  const addresses = customer?.addresses || [];

  const handleSelectAddress = (id) => {
    setSelectedAddressId(id);
  };

  return (<div className="max-w-md mx-auto p-6 flex flex-col gap-4">
    <H3 className="mb-6">Your Addresses</H3>
    {addresses.length === 0 ? (<div>
      <p className="mb-4 text-gray-700">You have no saved addresses.</p>
    </div>) : (<ul className="divide-y divide-gray-300">
      {addresses.map((address) => (<li
        key={address.id}
        className={`flex items-center p-4 cursor-pointer ${selectedAddressId === address.id ? "bg-gray-200" : "bg-white"} hover:bg-gray-100 rounded`}
        onClick={() => handleSelectAddress(address.id)}
        role="radio"
        aria-checked={selectedAddressId === address.id}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleSelectAddress(address.id);
          }
        }}
      >
        <input
          type="radio"
          name="address"
          checked={selectedAddressId === address.id}
          onChange={() => handleSelectAddress(address.id)}
          className="mr-4"
          aria-label={`Select address ${address.address_name || address.address_1}`}
        />
        <AddressCard address={address} />
      </li>))}
    </ul>)}
    <div className="flex flex-col gap-2 mt-6">
      <LinkButton
        variant="primary"
        size="lg"
        to={selectedAddressId ? `/checkout/payment?address_id=${selectedAddressId}` : "#"}
        disabled={!selectedAddressId}
      >
        Continue
      </LinkButton>
      <LinkButton variant="secondary" size="lg" to="/profile/address/new?redirect=/checkout/address">
        Add New Address
      </LinkButton>
    </div>
  </div>);
};

export default CheckoutAddress;
