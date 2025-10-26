import React, {createContext, useEffect, useState} from "react";
import {sdk} from "../configs/medusa.js";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [customer, setCustomer] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function refreshToken() {
      const loggedInCustomer = await sdk.store.customer.retrieve()
      if (loggedInCustomer) {
        setIsAuthenticated(true)
        setCustomer(loggedInCustomer.customer)
      }
    }
    refreshToken();
  }, []);

  const login = async ({email, password}) => {
    try {
      const token = await sdk.auth.login("customer", "emailpass", {
        email, password,
      });

      const {customer} = await sdk.store.customer.retrieve();
      setIsAuthenticated(true);
      setCustomer(customer);

      return token;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    return sdk.auth.logout()
      .then(() => {
        setIsAuthenticated(false);
        setCustomer({});
        navigate("/auth");
      });
  };

  const register = ({email, password, firstName, lastName, phone}) => {
    return sdk.auth.register("customer", "emailpass", {
      email, password,
    })
      .then(() => {
        return sdk.store.customer.create({
          first_name: firstName, last_name: lastName, email, phone,
        });
      })
      .then(({customer}) => {
        setIsAuthenticated(true);
        setCustomer(customer);
        return customer;
      });
  };

  return (<AuthContext.Provider value={{isAuthenticated, customer, login, logout, register}}>
    {children}
  </AuthContext.Provider>);
};

const useAuth = () => React.useContext(AuthContext);

export {AuthContext, AuthProvider};
export default useAuth;
