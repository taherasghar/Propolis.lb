/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate.js";

const useFetchAllOrders = (id) => {
  const [loading, setLoading] = useState(true);
  const [allOrders, setAllOrders] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 300));
      try {
        const response = await axiosPrivate.get(`/api/order/get-all-orders`);
        setAllOrders(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { allOrders, loading };
};

export default useFetchAllOrders;
