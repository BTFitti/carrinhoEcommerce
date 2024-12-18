import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

//importando o useContext para consumir contextos criados
import { useContext } from "react";

//importando o contexto para usar as propriedades necessárias
import { CartContext } from "../../contexts/CartContext";

export function Header() {
  //criando o uso do contexto que vamos consumir e pegando o cartAmount apenas para usar
  const { cartAmount } = useContext(CartContext);

  return (
    <header className="w-full bg-slate-300 px-1 ">
      <nav className="w-full max-w-7xl h-20 flex items-center justify-between px-5 mx-auto">
        <Link to={"/"} className="text-3xl font-bold">
          Dev Shop
        </Link>
        <Link to={"/cart"} className="relative">
          <FiShoppingCart size={30} color="#121212" />
          
          {/* Fazendo uma renderização condicional de que se o cartAmount for maior que 0, ele mostra a bolinha dos itens no carrinho mostrando a quantidade que tem no carrinho através do cartAmount */}
          {cartAmount > 0 && (
            <span className="absolute -right-3 -top-5 bg-sky-500 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold text-white">
              {cartAmount}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}
