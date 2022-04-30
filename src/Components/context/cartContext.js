import React, { useState, createContext } from "react";

export const cartContext = createContext({});
export const CartItemsContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);

  const onAdd = (product) => {

    const exist = cartItems?.find((x) => x.id === product.id);


    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, Count: exist.Count + 1 } : x
        )
      );
    } else {

      setCartItems([...cartItems, { ...product, Count: 1 }]);
    }
  };

  return (
    <cartContext.Provider value={{ cartItems, onAdd }}>

      {props.children}
    </cartContext.Provider>
  );
};
