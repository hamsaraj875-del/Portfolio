import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./routes/App.jsx";
import Admin from "./routes/Admin.jsx"
import "./App.css";
import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/admin", element: <Admin />},
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
