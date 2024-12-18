import { BsCartPlus } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { api } from "../../servics/api";

export interface ProductProps {
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
}
export function Home() {
  //usando o contexto criado e pegando dele a função de adicionar um item ao carrinho.
  const { addItemCart } = useContext(CartContext);

  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    async function getProducts() {
      const response = await api.get("/products");
      setProducts(response.data);
    }
    getProducts();
  }, []);

  {/*
 >>> função que chama a função criada no contexto, essa função handleAddCartItem recebe um produto que é do tipo ProductProps, tem um (id,title,description, price e cover)
    e esse produto é recebido através do map da useState products, pode ser meio confuso de entender mas basicamente quando eu faço o map do array products, eu vou ter na tela todos os meus itens e cada item tem um botão de adicionar ao carrinho, então quando eu clico nesse botão eu estou referenciando exatamente aquele produto e esse produto é passado como parâmetro da função handleAddCartItem que dentro dela vai executar a função do contexto addItemCart que recebe como parâmetro o produto clicado. 
 */}
  function handleAddCartItem(produto: ProductProps) {
    addItemCart(produto);
  }

  return (
    <div>
      <main className="w-full max-w-7xl px-4 mx-auto ">
        <h1 className="font-bold text-2xl mb-4 mt-10 text-center">
          Produtos em alta
        </h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5 ">
          {products.map((produto) => (
            <section className="w-full" key={produto.id}>
              <img
                className="w-full rounded-lg max-h-72 mb-2"
                src={produto.cover}
                alt={produto.title}
              />
              <p className="font-medium mt-1 mb-2">{produto.title}</p>
              <div className="flex gap-3 items-center">
                <strong className="text-zinc-700/90">
                  {produto.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </strong>
                <button
                  onClick={() => handleAddCartItem(produto)}
                  className="bg-zinc-900 p-1 rounded"
                >
                  <BsCartPlus size={20} color="#FFf" />
                </button>
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
