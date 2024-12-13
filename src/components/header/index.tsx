import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
export function Header() {
  const {cartAmount} = useContext(CartContext)
  return (
    <header className="w-full bg-slate-300 px-1 ">
      <nav className="w-full max-w-7xl h-20 flex items-center justify-between px-5 mx-auto">
        <Link to={"/"} className="text-3xl font-bold">
          Dev Shop
        </Link>
        <Link to={"/cart"} className="relative">
          <FiShoppingCart size={30} color="#121212" />
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
