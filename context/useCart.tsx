"use client";

import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  JSX,
} from "react";
import { Toaster, toast } from "sonner";

import { useQuery } from "@apollo/client";
import { GET_STORE_USER } from "@/graphql/store";
import { CartContextType, CartItem } from "@/types/global";

export const CartContext = createContext({});

export function CartProvider(props: { children: JSX.Element }) {
  const [cartItems, setCartItems] = useState<CartItem[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { data: userStore, loading: loading_store } = useQuery(GET_STORE_USER);

  useEffect(() => {
    const carts = localStorage.getItem("cartItems");
    setLoading(true);
    if (carts) {
      if (carts.length > 0) {
        setCartItems(JSON.parse(carts));
        setTimeout(() => {
          setLoading(false);
        }, 500);
        return;
      }
    }
    setTimeout(() => {
      setLoading(false);
      return;
    }, 500);
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return;
    }
  }, [cartItems]);

  const updateLocalStorage = () => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  const addToCart = (product_id: string) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.productId === product_id
      );
      if (existingItem) {
        return prevItems.map((res) =>
          res.productId === product_id ? { ...res, qty: res.qty + 1 } : res
        );
      }
      const newItem: CartItem = { productId: product_id, qty: 1 };
      const updatedItems = [...prevItems, newItem];
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const minusCart = (product_id: string) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems?.find(
        (item) => item.productId === product_id
      );
      if (existingItem) {
        return prevItems?.map((res) =>
          res.productId === product_id ? { ...res, qty: res.qty - 1 } : res
        );
      }
      const updatedItems = prevItems?.filter(
        (item: CartItem) => item.productId === product_id
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const removeFromCart = (id: String) => {
    setCartItems((prevItems) => {
      const item = prevItems.filter((item) => item.productId != id);
      localStorage.setItem("cartItems", JSON.stringify(item));
      return item;
    });
  };

  const cleanCartItems = () => {
    localStorage.removeItem("cartItems");
    setCartItems([]);
  };

  const addCarts = (items: CartItem[]) => {
    toast.success("The product is added into the cart!");
    setCartItems(items.concat(cartItems));
    updateLocalStorage();
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    if (typeof window !== "undefined") {
      global && window.location.reload();
    }
  };

  if (loading || loading_store) {
    return null;
  }

  return (
    <CartContext.Provider
      value={{
        loading: loading,
        cartItems: cartItems,
        membershipId: userStore?.customer,
        addToCart: addToCart,
        addCarts: addCarts,
        removeFromCart: removeFromCart,
        minusCart: minusCart,
        cleanCartItems: cleanCartItems,
        logout: logout,
      }}
    >
      <Toaster position="top-center" closeButton richColors />
      {props.children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext) as CartContextType;
