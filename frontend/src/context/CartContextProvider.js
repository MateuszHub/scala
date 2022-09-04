import React, { createContext, useEffect, useState } from "react";

const getPersistedValue = () => {
  const serializedValue = localStorage.getItem('cart')
  if (!serializedValue) {
    return [];
  }

  return JSON.parse(serializedValue)
}

export const CartContext = createContext({
  items: [],
  addProductToCart: () => { },
  removeProductFromCart: () => { }
});


export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState(getPersistedValue());

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addProductToCart = product => {
    setCart([...cart, product]);
  };

  const removeProductFromCart = product => {
    setCart([...cart].filter(i => i !== product));
  };

  return (
    <CartContext.Provider value={{
      items: cart,
      addProductToCart: addProductToCart,
      removeProductFromCart: removeProductFromCart
    }}
    >
      {children}
    </CartContext.Provider>
  );
}
