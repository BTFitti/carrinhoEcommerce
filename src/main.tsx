import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./App";

//importando o Provider para passar para todas as rotas.
//Agora tudo vai ter acesso ao que a gente deixar exportar pelo CartProvider
import CartProvider from "./contexts/CartContext";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              boxShadow: "0px 0px 10px 0px green",
              padding: "16px",
              color: "#121212",
            },
          },
        }}
        containerStyle={{
          top: 15,
          left: 15,
          bottom: 15,
          right: 15,
        }}
      />
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>
);
