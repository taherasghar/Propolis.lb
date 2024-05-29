import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login.js";
import Register from "./pages/Register/Register.js";
import Home from "./pages/Home/Home.js";
import Products from "./pages/Products/Products.js";
import Error from "./pages/Error/Error.js";
import Layout from "./components/Layout.js";
import ViewProduct from "./pages/ViewProduct/ViewProduct.js";
import Cart from "./pages/Cart/Cart.js";
import OrdersHistory from "./pages/OrdersHistory/OrdersHistory.js";
import RequireAuth from "./components/RequireAuth.js";
import AdminLayout from "./pages/Admin/Dashboard/AdminLayout.js";
import ManageOrders from "./pages/Admin/Orders/ManageOrders.js";
import Dashboard from "./pages/Admin/Dashboard/Dashboard.js";
import ManageCustomers from "./pages/Admin/Customers/ManageCustomers.js";
import ManageProducts from "./pages/Admin/Products/ManageProducts.js";
import ContactUs from "./pages/ContactUs/ContactUs.js";
import AuthIsForbidden from "./components/AuthIsForbidden.js";

const router = createBrowserRouter([
  {
    errorElement: <Error />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/products",
            element: <Products />,
          },
          {
            path: "/products/:id",
            element: <ViewProduct />,
          },
          {
            path: "/cart",
            element: <Cart />,
          },
          {
            path: "/contactus",
            element: <ContactUs />,
          },

          {
            element: <RequireAuth allowedRoles={["Admin", "User"]} />,
            children: [
              {
                path: "/orders-history",
                element: <OrdersHistory />,
              },
            ],
          },
        ],
      },
      {
        element: <RequireAuth allowedRoles={["Admin"]} />,
        children: [
          {
            path: "/dashboard",
            element: <AdminLayout />,
            children: [
              {
                index: true,
                element: <Dashboard />,
              },
              {
                path: "/dashboard/orders",
                element: <ManageOrders />,
              },
              {
                path: "/dashboard/products",
                element: <ManageProducts />,
              },
              {
                path: "/dashboard/customers",
                element: <ManageCustomers />,
              },
            ],
          },
        ],
      },
      {
        element: <AuthIsForbidden />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
        ],
      },
    ],
  },
]);

export default router;
