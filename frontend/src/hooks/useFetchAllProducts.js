import { useEffect, useState } from "react";
import axios from "../api/axios.js";

const useFetchAllProducts = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // await new Promise((resolve) => setTimeout(resolve, 3000));
      try {
        const response = await axios.get("/api/products/get-all-products");
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { products, loading };
};

export default useFetchAllProducts;
