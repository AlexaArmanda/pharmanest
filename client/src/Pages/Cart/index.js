import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckoutModal from '../../Components/CheckoutModal';
import { CiTrash } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } else {
      console.log('Cart is empty in localStorage.');
    }
  }, []);

  const increaseQuantity = (productID) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.ProductID === productID ? { ...item, quantity: item.quantity + 1 } : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const decreaseQuantity = (productID) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) =>
          item.ProductID === productID
            ? item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : null
            : item
        )
        .filter((item) => item !== null);

      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeFromCart = (productID) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.ProductID !== productID);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.Price * item.quantity, 0);
  const totalItemsInCart = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckoutSuccess = (orderData) => {
    console.log('Order successfully placed:', orderData);
    localStorage.removeItem('cart');
    setCart([]);
    navigate('/thank-you', { state: orderData });
  };

  return (
    <section className="section cartPage">
      <div className="container">
        <h2 className="hd mb-1">Your Cart</h2>
        <p>
          There are <b>{totalItemsInCart}</b> products in your cart
        </p>

        <div className="row">
          <div className="col-md-9 pr-5">
            <div className="table-responsive">
              <table className="table ">
                <thead>
                  <tr>
                    <th width="35%">Product</th>
                    <th width="15%">Unit Price</th>
                    <th width="20%">Quantity</th>
                    <th width="15%">Subtotal</th>
                    <th width="10%">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.length > 0 ? (
                    cart.map((product) => (
                      <tr key={product.ProductID}>
                        <td width="35%">
                          <div className="d-flex align-items-center cartItemImgWrapper">
                            <div className="imgWrapper">
                              <img
                                src={product.imageURL}
                                alt={product.Name}
                                className="w-100"
                              />
                            </div>
                            <div className="info px-3">
                              <h6>{product.Name}</h6>
                            </div>
                          </div>
                        </td>
                        <td width="15%">${product.Price.toFixed(2)}</td>
                        <td width="20%">
                          <div className="d-flex align-items-center">
                            <button className="btn btn-sm btn-light" onClick={() => decreaseQuantity(product.ProductID)}><FaMinus />
                            </button>
                            <span className="mx-2">{product.quantity}</span>
                            <button className="btn btn-sm btn-light" onClick={() => increaseQuantity(product.ProductID)}><FaPlus />
                            </button>
                          </div>
                        </td>
                        <td width="15%">
                          ${(product.Price * product.quantity).toFixed(2)}
                        </td>
                        <td width="10%">
                          <span className="remove" onClick={() => removeFromCart(product.ProductID)}>
                            <CiTrash size={20} />
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">Your cart is empty.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border p-3 cardDetails">
              <h4>Cart Totals</h4>
              <div className="d-flex align-items-center mb-3">
                <span>Subtotal</span>
                <span className="ml-auto">
                  <b>${totalAmount.toFixed(2)}</b>
                </span>
              </div>
              <div className="d-flex align-items-center">
                <span>Total</span>
                <span className="ml-auto">
                  <b>${totalAmount.toFixed(2)}</b>
                </span>
              </div>
              <Button className="btn-checkout" onClick={() => {
                setOpenModal(true);
              }}>
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <CheckoutModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        totalAmount={totalAmount}
        cartItems={cart}
        handleCheckoutSuccess={handleCheckoutSuccess}
      />
    </section>
  );
};

export default Cart;
