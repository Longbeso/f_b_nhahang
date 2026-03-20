import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRoutes from "./layouts/AppRoutes.tsx";
import { BrowserRouter } from "react-router";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    {" "}
    <StrictMode>
      <AppRoutes />
    </StrictMode>
  </BrowserRouter>,
);
