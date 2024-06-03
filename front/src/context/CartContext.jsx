import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { clearCart as clearCartAPI } from "../services/api";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [itemAmount, setItemAmount] = useState(0);
  const [total, setTotal] = useState(0);

  const loadCart = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/cart", {
        withCredentials: true,
      });
      setCart(response.data);
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
    const total = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.quantity;
    }, 0);
    setTotal(total);
  }, [cart]);

  useEffect(() => {
    const amount = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.quantity;
    }, 0);
    setItemAmount(amount);
  }, [cart]);

  const increment = async (productId) => {
    try {
      await axios.post(
        "http://localhost:3000/api/cart",
        { productId, quantity: 1 },
        {
          withCredentials: true,
        }
      );
      loadCart();
    } catch (error) {
      console.error("Error incrementing product quantity:", error);
    }
  };

  const decrement = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/api/cart/${productId}`, {
        withCredentials: true,
      });
      loadCart();
    } catch (error) {
      console.error("Error decrementing product quantity:", error);
    }
  };

  const clearCart = async () => {
    try {
      await clearCartAPI();
      setCart([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        itemAmount,
        total,
        setCart,
        loadCart,
        increment,
        decrement,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
