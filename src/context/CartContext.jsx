import { createContext, useState } from "react";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const isInCart = (id) => {
    let existe = cart.some((p) => p.id === id);
    return existe;
  };

  const agregarAlCarrito = (product) => {
    if (isInCart(product.id)) {
      let nuevoCarrito = cart.map((p) => {
        return p.id === product.id ? { ...p, quantity: product.quantity } : p;
      });
      setCart(nuevoCarrito);
    } else {
      setCart([...cart, product]);
    }
  };

  const limpiarCarrito = () => {
    setCart([]);
  };

  const deleteProductById = (id) => {
    const nuevoCarrito = cart.filter((p) => p.id !== id);
    setCart(nuevoCarrito);
  };

  const getTotalPrice = () => {
    let total = cart.reduce((amount, product) => {
      return amount + product.price * product.quantity;
    }, 0);
    return total;
  };

  const getTotalQuantity = () => {
    let total = cart.reduce((acum, product) => {
      return acum + product.quantity;
    }, 0);
    return total;
  };

  const getQuantityById = (id) => {
    let product = cart.find((prod) => prod.id === id);
    return product?.quantity;
  };

  let data = {
    cart,
    setCart,
    agregarAlCarrito,
    limpiarCarrito,
    deleteProductById,
    getTotalPrice,
    getTotalQuantity,
    getQuantityById,
  };
  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
