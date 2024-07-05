import React, { useEffect } from "react";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
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
              to={`/products/458bd4ce-dd5b-45b9-bca9-4a97bd9c9a10`}
            >
              <img
                src="http://localhost:5220/Images/8bd3aa0a-2066-4413-83b4-27985b0fe803_Propolis 50 Tablets.png"
                className="img-fluid product-thumbnail"
                alt=""
              />
              <h3 className="product-title">Propolis 50 Tablets</h3>
              <strong className="product-price">$18.0</strong>

              <span className="icon-cross">
                <OpenInNewOutlinedIcon />
              </span>
            </Link>
          </div>

          <div className="col-10 col-md-4 col-lg-3 mb-md-0 shadow-lg p-3 rounded">
            <Link
              className="product-item"
              to={`/products/03d6e3fb-996c-4f14-8a5a-5b74e3129f6c`}
            >
              <img
                src="http://localhost:5220/Images/0b13245b-4633-4550-84ec-57cefa61cef1_Bee Pollen 1KG.png"
                className="img-fluid product-thumbnail"
                alt=""
              />
              <h3 className="product-title">Bee Pollen 1 KG</h3>
              <strong className="product-price">$17.0</strong>

              <span className="icon-cross">
                <OpenInNewOutlinedIcon />
              </span>
            </Link>
          </div>

          <div className="col-10 col-md-4 col-lg-3 mb-5 mb-md-0 shadow-lg p-3 mb-5 rounded">
            <Link
              className="product-item"
              to={`/products/6e00b26f-dd17-4055-a728-8831d70fb83a`}
            >
              <img
                src="http://localhost:5220/Images/738e80a9-7e1f-4b7c-99c8-50660f66e575_Vitex Honey.png"
                className="img-fluid product-thumbnail"
                alt=""
              />
              <h3 className="product-title">Vitex Honey 0.5 KG</h3>
              <strong className="product-price">$33.0</strong>

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
