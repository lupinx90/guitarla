import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db";

const useCart = () => {
  const defaultCart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

  const [data, setData] = useState([]);
  const [cart, setCart] = useState(defaultCart);

  useEffect(() => {
    setData(db);
  }, [data]);

  useEffect(() => {
    saveLocalStorage();
  }, [cart,saveLocalStorage]);

  function addToCart(item) {
    const itemExist = cart.findIndex((guitar) => guitar.id === item.id);

    if (itemExist >= 0) {
      const updatedCart = [...cart];
      updatedCart[itemExist].qty++;
      setCart(updatedCart);
    } else {
      item.qty = 1;
      setCart([...cart, item]);
    }
  }

  function removeFromCart(id) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }

  function increaseQty(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.qty < 3) {
        return {
          ...item,
          qty: item.qty + 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function decreaseQty(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.qty > 1) {
        return {
          ...item,
          qty: item.qty - 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function emptyCart() {
    setCart([]);
  }

  function saveLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

    //State derivado
    const isEmpty = useMemo( () => cart.length === 0, [cart] );
    const cartTotal = useMemo( () => cart.reduce( (total, item) => total + (item.qty * item.price), 0), [cart] );
  

  return {
    data,
    cart,
    addToCart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    emptyCart,
    isEmpty,
    cartTotal
  };
};

export default useCart;
