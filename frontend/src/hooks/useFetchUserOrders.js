import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate.js";

const useFetchUserOrders = (id) => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // await new Promise((resolve) => setTimeout(resolve, 3000));
      try {
        const response = await axiosPrivate.get(
          `/api/order/get-orders-by-user-id`
        );
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { orders, loading };
};

export default useFetchUserOrders;
