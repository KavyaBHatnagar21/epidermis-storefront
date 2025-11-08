import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useUser from "../hooks/useUser.js";
import TextInput from "../components/TextInput.jsx";
import Button from "../components/Button.jsx";

const CreateAddressPage = () => {
  const { createAddress } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const redirect = params.get("redirect") || "/checkout/address";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState(""); // renamed province to state for India context
  const [postalCode, setPostalCode] = useState("");
  const [addressName, setAddressName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createAddress({
        first_name: firstName,
        last_name: lastName,
        phone,
        address_1: address1,
        address_2: address2,
        city,
        province: state,
        country_code: "IN",
        postal_code: postalCode,
        address_name: addressName,
      });
      navigate(redirect);
    } catch (err) {
      setError(err.message || "Failed to create address");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(redirect);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Add New Address</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <TextInput
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <TextInput
          placeholder="Address Line 1"
          value={address1}
          onChange={(e) => setAddress1(e.target.value)}
          required
        />
        <TextInput
          placeholder="Address Line 2"
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
        />
        <TextInput
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <TextInput
          placeholder="State (e.g. Uttar Pradesh)"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
        <TextInput
          placeholder="Postal Code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
        />
        <TextInput
          placeholder="Address Name (e.g. Home, Office)"
          value={addressName}
          onChange={(e) => setAddressName(e.target.value)}
          required
        />
        <div className="flex gap-4 mt-4">
          <Button type="submit" variant="primary" size="md" disabled={loading}>
            {loading ? "Saving..." : "Save Address"}
          </Button>
          <Button type="button" variant="secondary" size="md" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateAddressPage;
