import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";

const useFetchAllUsers = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      try {
        const response = await axiosPrivate.get("/api/users/get-all-users");
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { users, loading };
};

export default useFetchAllUsers;
