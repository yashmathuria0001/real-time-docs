import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Navbar from "./shared/Navbar";

// Define application routes
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
  },
  { path: "login", element: <Login /> },
  { path: "register", element: <Signup /> },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
