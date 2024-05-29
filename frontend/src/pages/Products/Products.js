import React from "react";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import { Link } from "react-router-dom";
import useFetchAllProducts from "../../hooks/useFetchAllProducts";
import LoadSpinner from "../../components/LoadSpinner";
function Products() {
  const spinner = LoadSpinner();
  const { products, loading } = useFetchAllProducts();

  if (loading) {
    return spinner;
  }
  console.log(products);
  return (
    <div>
      <div className="hero">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <div className="intro-excerpt text-center">
                <h1>Products</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="product-section d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            {products.map((p) => {
              return (
                <div
                  key={p.id}
                  className="col-lg-3 col-md-4 col-sm-6 mb-4 d-flex justify-content-center"
                >
                  <div className="product-item shadow-lg p-3 rounded">
                    <Link
                      to={`/products/${p.id}`}
                      state={{
                        product: {
                          name: "Spring Honey",
                          price: "$16.0",
                          imgURL: p.imageURL,
                          description:
                            "Amazing product, very healthy, original 100%",
                        },
                      }}
                    >
                      <img
                        alt=""
                        src={
                          p.imageURL
                            ? "http://localhost:5220" + p.imageURL
                            : "path/to/placeholder/image.jpg"
                        }
                        className="img-fluid product-thumbnail rounded"
                      />
                      <h3 className="product-title text-center">{p.name}</h3>
                      <strong className="product-price">{p.price}</strong>
                      <span className="icon-cross">
                        <OpenInNewOutlinedIcon />
                      </span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
