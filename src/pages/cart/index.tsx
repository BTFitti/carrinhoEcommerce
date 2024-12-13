import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { Link } from "react-router-dom";
export function Cart() {
  const { cart } = useContext(CartContext);
  return (
    <div className="w-full max-w-7xl mx-auto ">
      <h1 className="font-medium text-2xl text-center my-4">Meu carrinho</h1>
      {cart.length === 0 && (
        <div className="flex flex-col items-center justify-center">
          <p className="font-medium">Seu carrinho está vazio!</p>
          <Link to={"/"} className="text-white font-bold my-3 px-3 py-1 rounded-xl bg-blue-600">
            Acessar produtos
          </Link>
        </div>
      )}
      {cart.map((item) => (
        <section key={item.id} className="flex items-center justify-between border-b-2 border-gray-300 pb-3">
          <img
            className="w-28"
            src={item.cover}
            alt={item.title}
          />
          <strong>{item.price.toLocaleString("pt-BR",{
            style: "currency",
            currency: "BRL"
          })}
          </strong>
          <div className="flex items-center justify-center gap-3">
            <button className="bg-slate-600 rounded text-white font-medium px-2.5">
              -
            </button>
            {item.amount}
            <button className="bg-slate-600 rounded text-white font-medium px-2">
              +
            </button>
          </div>
          <strong className="float-right">Subtotal: {item.total.toLocaleString("pt-BR",{
            style: "currency",
            currency: "BRL"
          })}
          </strong>
        </section>
      ))}
      {cart.length !== 0 && <p className="font-bold my-4">Total: R$1.000</p>}
    </div>
  );
}
