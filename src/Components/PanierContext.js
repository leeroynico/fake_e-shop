import React, { useState, createContext } from "react";

export const PanierContext = createContext();

export const PanierProvider = (props) => {
  const [panier, setPanier] = useState([]);

  return (
    <PanierContext.Provider value={[panier, setPanier]}>
      {props.children}
    </PanierContext.Provider>
  );
};
