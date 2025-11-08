import React from "react";

const AddressCard = ({ address }) => {
  return (
    <div>
      <p className="font-semibold">
        {address.address_name || `${address.first_name} ${address.last_name}`}
      </p>
      <p className="text-gray-700">{address.address_name ? `${address.first_name} ${address.last_name}` : ""}</p>
      <p className="text-gray-700">
        {address.address_1}
        {address.address_2 ? `, ${address.address_2}` : ""}
      </p>
      <p className="text-gray-700">
        {address.city}, {address.province} {address.postal_code}
      </p>
      <p className="text-gray-700">{`+91 ${address.phone.slice(-10)}`}</p>
    </div>
  );
};

export default AddressCard;
