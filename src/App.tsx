import { Home } from "./pages/home";
import { Cart } from "./pages/cart";
import { Products } from "./pages/products";
import { Layout } from "./components/Layout";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <Layout/>,
    children:[
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/cart",
        element: <Cart/>
      },
      {
        path:"/products/:id",
        element: <Products/>
      }
    ]
  }
])
export {router};