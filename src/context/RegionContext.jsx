import React, { createContext, useContext, useState, useEffect } from "react";
import { sdk } from "../configs/medusa";

const RegionContext = createContext({
  region: null,
});

export const RegionProvider = ({ children }) => {
  const [region, setRegion] = useState(null);

  // Example effect: fetch default region or region data from Medusa backend if needed
  useEffect(() => {
    const fetchRegion = async () => {
      try {
        //TODO: Handle edge cases (e.g., loading, errors, empty data)
        const response = await sdk.store.region.list();
        if (response && response.regions) {
          setRegion(response.regions[0]);
        }
      } catch (error) {
        console.error("Failed to fetch region data:", error);
      }
    };

    fetchRegion();
  }, []);

  return (
    <RegionContext.Provider value={{ region }}>
      {children}
    </RegionContext.Provider>
  );
};

export const useRegion = () => {
  const context = useContext(RegionContext);
  if (context === undefined) {
    throw new Error("useRegion must be used within a RegionProvider");
  }
  return context;
};
