import React from "react";

export const PanierContext = React.createContext();

export const PanierProvider = (props) => {
  return <PanierContext>{props.children}</PanierContext>;
};
