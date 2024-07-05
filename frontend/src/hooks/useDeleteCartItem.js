/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate.js";

const useFetchUserCartItems = () => {
  const [deleteLoading, setLoading] = useState(true);
  const [id, setId] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        return;
      }
      setLoading(true);
      // await new Promise((resolve) => setTimeout(resolve, 3000));
      try {
        await axiosPrivate.delete(`/api/cart/remove-item-from-cart/${id}`);
        setId(null);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { deleteLoading, setId };
};

export default useFetchUserCartItems;
