import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./App";

//importando o Provider para passar para todas as rotas.
//Agora tudo vai ter acesso ao que a gente deixar exportar pelo CartProvider
import CartProvider from "./contexts/CartContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>
);
