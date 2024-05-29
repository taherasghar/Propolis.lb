import React, { useState, useEffect } from "react";
import axios from "axios";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ReorderRoundedIcon from "@mui/icons-material/ReorderRounded";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import useFetchUserCartItems from "../../hooks/useFetchUserCartItems";
import LoadSpinner from "../../components/LoadSpinner";
import isTokenExpired from "../../helpers/isTokenExpired";
import useDeleteCartItem from "../../hooks/useDeleteCartItem";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const DELIVERY_CHARGE = 3.0;

function Cart() {
  const { cartItems, loading, setCartItems } = useFetchUserCartItems();
  const axiosPrivate = useAxiosPrivate();
  const { setId, deleteLoading } = useDeleteCartItem();

  const [subtotal, setSubtotal] = useState(0);
  const [orderDetails, setOrderDetails] = useState({
    customerName: "",
    contactNumber: "",
    city: "",
    deliveryAddress: "",
    orderNotes: "",
  });

  useEffect(() => {
    const calculatedSubtotal = cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    setSubtotal(calculatedSubtotal);
  }, [cartItems]);

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    try {
      const response = await axiosPrivate.put(
        `/api/cart/update-cart-item-quantity`,
        {
          cartItemId: itemId,
          newQuantity,
        }
      );
      if (response.status === 200) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          )
        );
      }
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
    }
  };

  const handleIncrement = (item) => {
    if (item.quantity < 12) {
      handleUpdateQuantity(item.id, item.quantity + 1);
    }
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      handleUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleInputChange = (e) => {
    console.log(orderDetails);
    const { name, value } = e.target;
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmitOrder = async () => {
    const orderData = {
      customerName: orderDetails.customerName,
      contactNumber: orderDetails.contactNumber,
      city: orderDetails.city,
      deliveryAddress: orderDetails.deliveryAddress,
      orderNotes: orderDetails.orderNotes,
    };
    console.log(orderData);
    try {
      const response = await axiosPrivate.post(
        "/api/order/submit-order",
        orderData
      );
      console.log("Order submitted successfully!");
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  return loading ? (
    <LoadSpinner />
  ) : (
    <div>
      <section className="h-custom shadow-lg p-3 mb-5">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card">
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-lg-7">
                      <a href="/products" style={{ textDecoration: "none" }}>
                        <button className="btn btn-outline-secondary btn-lg">
                          <ArrowBackIosNewRoundedIcon />
                          {cartItems.length
                            ? "Continue shopping"
                            : "Start Shopping"}
                        </button>
                      </a>

                      <hr />
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          <p className="mb-1">Shopping cart</p>
                        </div>
                      </div>

                      {!isTokenExpired() &&
                        cartItems.map((item) => (
                          <div
                            className="card mb-3 bg-warning bg-gradient"
                            key={item.id}
                          >
                            <div className="card-body">
                              <div className="d-flex flex-wrap justify-content-between align-items-center">
                                <div className="d-flex align-items-center mb-3 mb-md-0 col-5">
                                  <img
                                    src={`http://localhost:5220${item.product.imageURL}`}
                                    className="img-fluid rounded-3"
                                    alt="Shopping item"
                                    style={{ width: "65px" }}
                                  />
                                  <div className="ms-2">
                                    <h6 className="mb-1">
                                      {item.product.name}
                                    </h6>
                                  </div>
                                </div>
                                <div className="d-flex align-items-center mb-3 mb-md-0 col-3">
                                  <div
                                    className="input-group input-group-sm"
                                    style={{ maxWidth: "120px" }}
                                  >
                                    <button
                                      className="btn btn-outline-secondary p-1"
                                      data-mdb-ripple-color="dark"
                                      onClick={() => handleDecrement(item)}
                                      disabled={item.quantity <= 1}
                                    >
                                      <RemoveOutlinedIcon fontSize="small" />
                                    </button>
                                    <input
                                      type="text"
                                      style={{ width: "40px" }}
                                      className="form-control text-center"
                                      value={item.quantity}
                                      aria-label="Quantity"
                                      readOnly
                                    />
                                    <button
                                      className="btn btn-outline-secondary p-1"
                                      data-mdb-ripple-color="dark"
                                      onClick={() => handleIncrement(item)}
                                      disabled={item.quantity >= 12}
                                    >
                                      <AddOutlinedIcon fontSize="small" />
                                    </button>
                                  </div>
                                </div>
                                <div
                                  className="d-flex align-items-center justify-content-end col-1"
                                  style={{ minWidth: "70px" }}
                                >
                                  <h6 className="mb-0">
                                    ${item.product.price}
                                  </h6>
                                </div>
                                <div className="d-flex align-items-center justify-content-end col-1">
                                  <button
                                    className="btn text-danger p-1"
                                    onClick={() => {
                                      setId(item.id);
                                      setCartItems((prevItems) =>
                                        prevItems.filter(
                                          (current) => current.id !== item.id
                                        )
                                      );
                                    }}
                                  >
                                    <ClearRoundedIcon fontSize="small" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>

                    <div className="col-lg-5">
                      <div className="card bg-gradient text-dark rounded-3 bg-gradient">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="mb-0">Order details</h5>
                            <ReorderRoundedIcon />
                          </div>
                          <Box
                            component="form"
                            sx={{
                              "& .MuiTextField-root": { m: 1 },
                            }}
                            autoComplete="on"
                          >
                            <TextField
                              id="outlined-basic"
                              name="customerName"
                              required
                              label="Customer Name"
                              variant="outlined"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <AccountCircle />
                                  </InputAdornment>
                                ),
                              }}
                              fullWidth
                              defaultValue={orderDetails.customerName}
                              onChange={handleInputChange}
                            />
                            <div className="row mt-2">
                              <div className="col-6">
                                <TextField
                                  id="outlined-basic"
                                  name="contactNumber"
                                  className="col-6"
                                  fullWidth
                                  required
                                  label="Phone Number"
                                  variant="outlined"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        +961
                                      </InputAdornment>
                                    ),
                                    inputProps: {
                                      maxLength: 8,
                                    },
                                  }}
                                  defaultValue={orderDetails.contactNumber}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="col-6">
                                <TextField
                                  name="city"
                                  className="col-6"
                                  fullWidth
                                  required
                                  id="outlined-required"
                                  label="City"
                                  defaultValue={orderDetails.city}
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>
                            <TextField
                              id="outlined-multiline-flexible"
                              name="deliveryAddress"
                              label="Delivery Address"
                              required
                              multiline
                              variant="outlined"
                              rows={2}
                              fullWidth
                              defaultValue={orderDetails.deliveryAddress}
                              onChange={handleInputChange}
                            />

                            <TextField
                              id="outlined-multiline-flexible"
                              name="orderNotes"
                              label="Order Notes"
                              multiline
                              variant="outlined"
                              rows={4}
                              fullWidth
                              defaultValue={orderDetails.orderNotes}
                              onChange={handleInputChange}
                            />
                          </Box>
                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Payment method</p>
                            <p className="mb-2">Cash on delivery</p>
                          </div>
                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Subtotal</p>
                            <p className="mb-2">${subtotal.toFixed(2)}</p>
                          </div>
                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Delivery</p>
                            <p className="mb-2">
                              ${DELIVERY_CHARGE.toFixed(2)}
                            </p>
                          </div>
                          <div className="d-flex justify-content-between mb-4">
                            <p className="mb-2">Total</p>
                            <p className="mb-2">
                              ${(subtotal + DELIVERY_CHARGE).toFixed(2)}
                            </p>
                          </div>
                          <button
                            type="button"
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-primary btn-block btn-lg"
                            onClick={handleSubmitOrder}
                            disabled={
                              !orderDetails.city ||
                              !orderDetails.customerName ||
                              !orderDetails.deliveryAddress ||
                              !orderDetails.contactNumber ||
                              cartItems.length === 0
                            }
                          >
                            <div className="d-flex justify-content-between">
                              <span>
                                ${(subtotal + DELIVERY_CHARGE).toFixed(2)}
                              </span>
                              <span>
                                &nbsp; Submit Now
                                <i className="fas fa-long-arrow-alt-right ms-2"></i>
                              </span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Cart;
