import React, {createContext, useEffect, useState} from "react";
import {sdk} from "../configs/medusa.js";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({children}) => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function refreshToken() {
      setLoading(true);
      setError(null);
      try {
        const loggedInCustomer = await sdk.store.customer.retrieve()
        if (loggedInCustomer) {
          setCustomer(loggedInCustomer.customer)
        } else {
          setCustomer(null);
        }
      } catch (error) {
        setError("Failed to refresh authentication status.");
        setCustomer(null);
        throw error;
      }
      setLoading(false);
    }
    refreshToken();
  }, []);

  const login = async ({email, password}) => {
    setError(null);
    try {
      // The SDK may return a token string or an object with a 'location' property for third-party auth flows.
      // Currently, third-party auth is not used, but this is kept for future-proofing.
      const response = await sdk.auth.login("customer", "emailpass", {
        email, password,
      });

      if (response && typeof response === "object" && response.location) {
        // For now, just log a message. Future implementation may redirect or notify the user.
        console.info("Third-party auth flow detected. Redirect to:", response.location);
      } else {
        const {customer} = await sdk.store.customer.retrieve();
        setCustomer(customer);
      }

      return response;
    } catch (error) {
      setError("Login failed. Please check your credentials and try again.");
      throw error;
    }
  };

  const logout = () => {
    return sdk.auth.logout()
      .then(() => {
        setCustomer({});
        navigate("/auth");
      });
  };

  const register = ({email, password, firstName, lastName, phone}) => {
    setError(null);
    return sdk.auth.register("customer", "emailpass", {
      email, password,
    })
      .then(() => {
        return sdk.store.customer.create({
          first_name: firstName, last_name: lastName, email, phone,
        });
      })
      .then(({customer}) => {
        setCustomer(customer);
        return customer;
      })
      .catch(() => {
        setError("Registration failed. Please try again.");
        throw new Error("Registration failed");
      });
  };

  const createAddress = async (addressData) => {
    setError(null);
    try {
      const { customer } = await sdk.store.customer.createAddress(addressData);
      setCustomer(customer);
      return customer;
    } catch (error) {
      setError("Failed to create address. Please try again.");
      throw error;
    }
  };

  const clearError = () => setError(null);

  return (<UserContext.Provider value={{customer, loading, error, login, logout, register, createAddress, clearError}}>
    {children}
  </UserContext.Provider>);
};

export {UserContext, UserProvider};
