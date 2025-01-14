import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductProps } from "../home";
import { api } from "../../servics/api";
import { BsCartPlus } from "react-icons/bs";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import toast from "react-hot-toast";

export function Products() {
  //para pegar o parâmetro da rota (id)
  const { id } = useParams();
  const { addItemCart } = useContext(CartContext);

  const [product, setProduct] = useState<ProductProps>()

  useEffect(() => {
    async function getProduct() {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
    }
    getProduct();
  }, [id]);

  function handleAddCartItem(product: ProductProps) {
    toast.success("Produto adicionado ao carrinho!");
    addItemCart(product);
  }

  return (
    <div className="w-full max-w-7xl px-4 mx-auto my-16  ">
      <section className="w-full">
        <div className="flex flex-col lg:flex-row">
          <img
            className="rounded-lg flex-1 w-full lg:w-0 lg:mb-0 mb-3 object-cover mr-6"
            src={product?.cover}
            alt={product?.title}
          />
          <div className="flex-1">
            <p className="font-bold text-2xl mb-6">{product?.title}</p>
            <p className="my-6 text-xl font-light">{product?.description}</p>
            <strong className="text-zinc-700/90 text-xl">
              {product?.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </strong>
            <button
              onClick={() => handleAddCartItem(product)}
              className="bg-zinc-900 p-1 rounded ml-3"
            >
              <BsCartPlus size={20} color="#FFF" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
