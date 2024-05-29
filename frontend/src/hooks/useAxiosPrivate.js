import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import isTokenExpired from "../helpers/isTokenExpired";

const useAxiosPrivate = () => {
  useEffect(() => {
    if (isTokenExpired()) {
      return;
    } else {
      const accessToken = localStorage.getItem("accessToken");

      const requestIntercept = axiosPrivate.interceptors.request.use(
        (config) => {
          if (!config.headers["Authorization"]) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
          }
          return config;
        },
        (error) => Promise.reject(error)
      );

      const responseIntercept = axiosPrivate.interceptors.response.use(
        (response) => response,
        async (error) => {
          Promise.reject(error);
        }
      );

      return () => {
        axiosPrivate.interceptors.request.eject(requestIntercept);
        axiosPrivate.interceptors.response.eject(responseIntercept);
      };
    }
  }, []);

  return axiosPrivate;
};

export default useAxiosPrivate;
