import { useContext } from "react";
import { UserContext } from "../context/UserContext.js";

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within an AuthProvider");
  }
  return context;
};

export default useUser;
