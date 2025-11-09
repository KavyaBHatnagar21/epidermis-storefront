import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sdk } from "../configs/medusa.js";
import { UserContext } from "./UserContext.js";

export const UserProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // helper to extract sensible message from SDK errors
  const extractErrorMessage = (err) =>
    err?.response?.data?.message || err?.message || String(err);

  useEffect(() => {
    let mounted = true;

    async function refreshToken() {
      setLoading(true);
      setError(null);
      try {
        const resp = await sdk.store.customer.retrieve();
        // handle both { customer } and direct customer shapes
        const resolvedCustomer = resp?.customer ?? resp ?? null;
        if (mounted) {
          setCustomer(resolvedCustomer || null);
        }
      } catch (err) {
        // set a friendly error but do not rethrow from a mount effect
        if (mounted) {
          setCustomer(null);
        }
        console.error("refreshToken failed:", extractErrorMessage(err));
      } finally {
        if (mounted) setLoading(false);
      }
    }

    refreshToken();

    return () => {
      mounted = false;
    };
  }, []);

  const login = async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await sdk.auth.login("customer", "emailpass", {
        email,
        password,
      });

      if (response && typeof response === "object" && response.location) {
        console.info("Third-party auth flow detected. Redirect to:", response.location);
      } else {
        const resp = await sdk.store.customer.retrieve();
        const resolvedCustomer = resp?.customer ?? resp ?? null;
        setCustomer(resolvedCustomer);
      }

      return response;
    } catch (err) {
      const msg = extractErrorMessage(err) || "Login failed. Please try again.";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await sdk.auth.logout();
      setCustomer(null);
      navigate("/auth");
    } catch (err) {
      setError("Logout failed. Please try again.");
      console.error("logout failed:", extractErrorMessage(err));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async ({ email, password, firstName, lastName, phone }) => {
    setLoading(true);
    setError(null);
    try {
      await sdk.auth.register("customer", "emailpass", { email, password });

      await sdk.store.customer.create({
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
      });

      await sdk.auth.login("customer", "emailpass", {
        email,
        password,
      });

      const { customer } = await sdk.store.customer.retrieve();
      setCustomer(customer);
      return customer;
    } catch (err) {
      const msg =
        extractErrorMessage(err) || "Registration failed. Please try again.";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createAddress = async (addressData) => {
    setLoading(true);
    setError(null);
    try {
      const resp = await sdk.store.customer.createAddress(addressData);
      const resolvedCustomer = resp?.customer ?? resp ?? null;
      setCustomer(resolvedCustomer);
      return resolvedCustomer;
    } catch (err) {
      const msg = extractErrorMessage(err) || "Failed to create address. Please try again.";
      console.error("Failed while creating address:", extractErrorMessage(err));
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return (
    <UserContext.Provider
      value={{
        customer,
        loading,
        error,
        login,
        logout,
        register,
        createAddress,
        clearError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
