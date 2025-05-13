import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckoutModal from "../../Components/CheckoutModal";
import { CiTrash } from "react-icons/ci";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useCart } from "../../context/CartContext";

const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
};

const Cart = () => {
  const { cart, setCart, removeFromCart, decreaseQuantity, addToCart } =
    useCart();
  const [openModal, setOpenModal] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [discountedTotal, setDiscountedTotal] = useState(0);
  const navigate = useNavigate();
  const width = useWindowWidth();

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    const total = cart.reduce((sum, item) => {
      const unitPrice =
        item.IsOnSale && item.SalePrice != null ? item.SalePrice : item.Price;
      return sum + unitPrice * item.quantity;
    }, 0);
    setTotalAmount(total);
    setDiscountedTotal(total);
  }, [cart]);

  const increaseQuantity = (productID) => {
    const product = cart.find((p) => p.ProductID === productID);
    if (product) addToCart(product);
  };

  const applyVoucher = () => {
    if (voucherCode === "Spring20") {
      const discount = 0.2;
      const discountedAmount = totalAmount * (1 - discount);
      setDiscountedTotal(discountedAmount);
      setTotalAmount(discountedAmount);
    } else {
      alert("Invalid voucher code!");
    }
  };

  const handleCheckoutSuccess = (orderData) => {
    localStorage.removeItem("cart");
    setCart([]);
    navigate("/thank-you", {
      state: {
        orderNumber: orderData.orderId,
        Address: orderData.shippingAddress,
        totalAmount: orderData.totalAmount,
      },
    });
  };

  return (
    <section className="section cartPage">
      <div className="container">
        <h2 className="hd mb-1">Your Cart</h2>
        <p>
          There are <b>{cart.reduce((sum, item) => sum + item.quantity, 0)}</b>{" "}
          products in your cart
        </p>

        <div className="row">
          <div className="col-md-8 pr-5">
            {width >= 768 ? (
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th width="30%">Product</th>
                      <th width="15%">Unit Price</th>
                      <th width="20%">Quantity</th>
                      <th width="15%">Subtotal</th>
                      <th width="15%">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.length > 0 ? (
                      cart.map((product) => (
                        <tr key={product.ProductID}>
                          <td>
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

                          <td>
                            $
                            {(product.IsOnSale && product.SalePrice != null
                              ? product.SalePrice
                              : product.Price
                            ).toFixed(2)}{" "}
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <button
                                className="btn btn-sm btn-light"
                                onClick={() =>
                                  decreaseQuantity(product.ProductID)
                                }
                              >
                                <FaMinus />
                              </button>
                              <span className="mx-2">{product.quantity}</span>
                              <button
                                className="btn btn-sm btn-light"
                                onClick={() =>
                                  increaseQuantity(product.ProductID)
                                }
                              >
                                <FaPlus />
                              </button>
                            </div>
                          </td>

                          <td>
                            $
                            {(
                              (product.IsOnSale && product.SalePrice != null
                                ? product.SalePrice
                                : product.Price) * product.quantity
                            ).toFixed(2)}
                          </td>

                          <td>
                            <span
                              className="remove"
                              onClick={() => removeFromCart(product.ProductID)}
                            >
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
            ) : (
              <div className="mobileCart">
                {cart.map((product) => (
                  <div className="mobileCartItem" key={product.ProductID}>
                    <div className="imgWrapper">
                      <img src={product.imageURL} alt={product.Name} />
                    </div>
                    <div className="info">
                      <h6>{product.Name}</h6>
                      <div className="brand">
                        Brand: {product.Brand || "N/A"}
                      </div>
                      <div className="actions">
                        <button
                          className="btn btn-sm btn-light"
                          onClick={() => decreaseQuantity(product.ProductID)}
                        >
                          <FaMinus />
                        </button>
                        <span>{product.quantity}</span>
                        <button
                          className="btn btn-sm btn-light"
                          onClick={() => increaseQuantity(product.ProductID)}
                        >
                          <FaPlus />
                        </button>
                      </div>
                      <div className="priceRow">
                        <div className="price">
                          {(
                            (product.IsOnSale && product.SalePrice != null
                              ? product.SalePrice
                              : product.Price) * product.quantity
                          ).toFixed(2)}{" "}
                          LEI
                        </div>
                      </div>
                      <div
                        className="remove"
                        onClick={() => removeFromCart(product.ProductID)}
                      >
                        <CiTrash size={20} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="col-md-4">
            <div className="card border p-3 cardDetails">
              <h4>Cart Totals</h4>
              <div className="d-flex align-items-center mb-3">
                <span className="h5">Subtotal</span>
                <span className="ml-auto">
                  <b>${totalAmount.toFixed(2)}</b>
                </span>
              </div>

            

<div className="voucher-section mb-3">
  <label className="d-block mb-2 h5">Voucher Code</label>
  <div className="d-flex align-items-center gap-2">
    <input
      type="text"
      className="form-control"
      value={voucherCode}
      onChange={(e) => setVoucherCode(e.target.value)}
      placeholder="Enter voucher code"
      style={{ flex: 1 }}
    />
    <Button variant="contained" className="btn voucher" onClick={applyVoucher}>
      Apply
    </Button>
  </div>
</div>


              <div className="d-flex align-items-center">
                <span className="h5">Total</span>
                <span className="ml-auto">
                  <b>${discountedTotal.toFixed(2)}</b>
                </span>
              </div>
              <Button
                className="btn-checkout"
                onClick={() => setOpenModal(true)}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <CheckoutModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        
        totalAmount={discountedTotal}
        cartItems={cart}
        handleCheckoutSuccess={handleCheckoutSuccess}
      />
    </section>
  );
};

export default Cart;
