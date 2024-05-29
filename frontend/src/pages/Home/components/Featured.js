import React, { useEffect } from "react";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import spring_honey from "../../../images/Honey_Spring-removebg-preview.png";
import bee_pollen from "../../../images/Bee_Pollen_1KG_jar-removebg-preview.png";
import honey_with_nuts from "../../../images/Spring_Honey_with_Nuts-removebg-preview.png";
import { Link } from "react-router-dom";

function Featured() {
  const scrollToFeatued = () => {
    const featuredElement = document.getElementById("featured");
    if (featuredElement) {
      featuredElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    localStorage.getItem("scrollToFeatured") && scrollToFeatued();
    localStorage.removeItem("scrollToFeatured");
  }, []);
  return (
    <div>
      <div className="product-section" id="featured">
        <div className="row">
          <div className=" col-md-12 col-lg-3 mb-5 mb-lg-0 d-flex flex-column align-items-center justify-content-center p-3 mb-5 rounded bg-warning">
            <h2 className="mb-4 section-title ">Featured Products</h2>
            <ul className="list-unstyled my-4 d-flex flex-column align-items-center ">
              <li>
                Pure honey straight from our hives, full of natural goodness and
                taste.
              </li>
            </ul>
            <a href="/products" className="btn btn-outline-dark">
              Explore More Products
            </a>
          </div>

          <div className="col-10 col-md-4 col-lg-3 mb-5 mb-md-0 shadow-lg p-3 mb-5 rounded">
            <Link
              className="product-item"
              to={`/products/1`}
              state={{
                product: {
                  name: "Bee Pollen 1KG",
                  price: "$18.5",
                  imgURL: bee_pollen,
                  description: "Amazing product, very healthy, original 100%",
                },
              }}
            >
              <img
                src={bee_pollen}
                className="img-fluid product-thumbnail"
                alt=""
              />
              <h3 className="product-title">Bee Pollen 1 KG</h3>
              <strong className="product-price">$18.5</strong>

              <span className="icon-cross">
                <OpenInNewOutlinedIcon />
              </span>
            </Link>
          </div>

          <div className="col-10 col-md-4 col-lg-3 mb-md-0 shadow-lg p-3 rounded">
            <Link
              className="product-item"
              to={`/products/2`}
              state={{
                product: {
                  name: "Spring Honey 1KG",
                  price: "$16.0",
                  imgURL: spring_honey,
                  description: "Amazing product, very healthy, original 100%",
                },
              }}
            >
              <img
                src={spring_honey}
                className="img-fluid product-thumbnail"
                alt=""
              />
              <h3 className="product-title">Spring Honey 1 KG</h3>
              <strong className="product-price">$16.0</strong>

              <span className="icon-cross">
                <OpenInNewOutlinedIcon />
              </span>
            </Link>
          </div>

          <div className="col-10 col-md-4 col-lg-3 mb-5 mb-md-0 shadow-lg p-3 mb-5 rounded">
            <Link
              className="product-item"
              to={`/products/3`}
              state={{
                product: {
                  name: "Bee Pollen",
                  price: "$12.0",
                  imgURL: honey_with_nuts,
                  description: "Amazing product, very healthy, original 100%",
                },
              }}
            >
              <img
                src={honey_with_nuts}
                className="img-fluid product-thumbnail"
                alt=""
              />
              <h3 className="product-title">Honey With Nuts 0.5 KG</h3>
              <strong className="product-price">$12.0</strong>

              <span className="icon-cross">
                <OpenInNewOutlinedIcon />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Featured;
