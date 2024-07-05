import React, { useState } from "react";
import "./viewproduct.css";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { Button } from "@mui/material";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { useParams, useNavigate } from "react-router-dom";
import useFetchSingleProduct from "../../hooks/useFetchSingleProduct";
import LoadSpinner from "../../components/LoadSpinner";
import Error from "../Error/Error";
import isTokenExpired from "../../helpers/isTokenExpired";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
function ViewProduct() {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const params = useParams();
  const { product, loading } = useFetchSingleProduct(params.id);
  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  async function handleAddToCart() {
    if (isTokenExpired()) {
      return navigate("/login");
    }
    try {
      const response = await axiosPrivate.post("/api/cart/add-item-to-cart", {
        productId: params.id,
        quantity,
      });
      console.log("Added successfully\n" + response.data);
      navigate("/cart");
    } catch (error) {
      console.log(error.response);
    }
  }

  return loading ? (
    <LoadSpinner />
  ) : !product?.name ? (
    <Error />
  ) : (
    <div>
      <section className="py-5 ">
        <div className="container">
          <div className="row gx-5">
            <aside className="col-lg-6">
              <div className=" rounded-4 mb-3 d-flex justify-content-center ">
                <a
                  data-fslightbox="mygalley"
                  className="rounded-4"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-type="image"
                  href={"http://localhost:5220" + product?.imageURL}
                >
                  <img
                    style={{
                      maxWidth: "300px",
                      margin: "auto",
                    }}
                    className="rounded-4 fit"
                    src={"http://localhost:5220" + product?.imageURL}
                    alt="Product"
                  />
                </a>
              </div>
            </aside>
            <main className="col-lg-6">
              <div className="ps-lg-3">
                <h4 className="title text-dark">
                  {product?.name} <br />
                </h4>

                <div className="mb-3">
                  <span className="h5">{`Price: $${product?.price}`}</span>
                </div>

                <p>{`Description: ${product?.description}`}</p>

                <hr />

                <div className="row mb-4">
                  <div className="col-md-4 col-6 mb-3">
                    <label className="mb-2 d-block">Quantity</label>
                    <div
                      className="input-group mb-3"
                      style={{ width: "170px" }}
                    >
                      <button
                        className="btn btn-light border border-secondary px-3"
                        onClick={handleDecrement}
                        data-mdb-ripple-color="dark"
                        disabled={quantity <= 1 ? true : false}
                      >
                        <RemoveOutlinedIcon />
                      </button>
                      <input
                        type="text"
                        className="form-control text-center border border-secondary"
                        placeholder={quantity}
                        aria-label="Example text with button addon"
                        aria-describedby="button-addon1"
                        disabled
                      />
                      <button
                        className="btn btn-light border border-secondary px-3"
                        onClick={handleIncrement}
                        data-mdb-ripple-color="dark"
                        disabled={quantity >= 12 ? true : false}
                      >
                        <AddOutlinedIcon />
                      </button>
                    </div>
                  </div>
                </div>

                <Button
                  className="shadow-0 mx-2"
                  color="inherit"
                  variant="contained"
                  onClick={handleAddToCart}
                  endIcon={<ShoppingCartRoundedIcon color="warning" />}
                >
                  Add to cart
                </Button>
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ViewProduct;
