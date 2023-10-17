import React from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer autoClose={4000} />
    <RouterProvider router={router} />
  </React.StrictMode>
);
