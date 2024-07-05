/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate.js";

const useFetchUserCartItems = (id) => {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 300));
      try {
        const response = await axiosPrivate.get(
          `/api/cart/get-cart-items-by-user-id`
        );
        setCartItems(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { cartItems, loading, setCartItems };
};

export default useFetchUserCartItems;
