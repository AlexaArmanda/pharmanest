import { createContext, useContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);


  useEffect(() => {
    const syncCartAcrossTabs = (event) => {
      if (event.key === "cart") {
        setCart(event.newValue ? JSON.parse(event.newValue) : []);
      }
    };

    window.addEventListener("storage", syncCartAcrossTabs);
    return () => {
      window.removeEventListener("storage", syncCartAcrossTabs);
    };
  }, []);


  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.ProductID === product.ProductID);
  
      if (existingProduct) {
        return prevCart.map(item =>
          item.ProductID === product.ProductID
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };
  
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.ProductID !== productId));
  };
  

  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.ProductID === productId
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      )
    );
  };
  

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, decreaseQuantity, setCart  }}>
      {children}
    </CartContext.Provider>
  );
};
