import React, {useEffect, useState} from "react";
import {RegionContext} from "./RegionContext.js";
import {sdk} from "../configs/medusa.js";

export const RegionProvider = ({children}) => {
  const [region, setRegion] = useState(null)

  useEffect(() => {
    const fetchRegion = async () => {
      try {
        const {regions} = await sdk.store.region.list()
        if (regions && regions.length > 0) {
          setRegion(regions[0])  // Automatically use first region
        } else {
          console.error("No regions found in backend.")
        }
      } catch (err) {
        console.error("Error fetching regions:", err)
      }
    }

    fetchRegion()
  }, [])

  return (
    <RegionContext.Provider value={{region}}>
      {children}
    </RegionContext.Provider>
  )
}