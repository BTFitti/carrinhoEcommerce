//importando o createContext do react para criar o contexto e o ReactNode para a tipagem do children.
import { createContext, ReactNode, useState } from "react";

//dentro do CartContext temos uma propriedade chamada cart que é uma lista que vai ter todas as propriedades do carrinho
interface CartContextData {
  //recebe um carrinho que vai ser uma lista dos itens que tem dentro
  cart: CartProps[];
  //criando outra propriedade que vamos exportar que é a quantidade de itens no carrinho.
  //O valor do cartAmount é o tamanho do array de objetos cart
  cartAmount: number;
}

//tipagem do carrinho
interface CartProps {
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
  //amount é a quantidade de itens que tem no carrinho
  amount: number;
  //total é o valor total dos itens do carrinho
  total: number;
}

//tipagem do provider que vai receber um children que é do tipo react node, ou seja, é qualque coisa que possa ser renderizada em react
interface CartProviderProps{
    children: ReactNode;
}

//tipando o CartContext que vai seguir o CartContextData, ele vai respeitar essa tipagem que vai ter uma propriedade chamada cart que é uma lista que vai ter ids, titles, prices etc...
export const CartContext = createContext({} as CartContextData);

//criando o provider e ele recebe como propriedade um children
function CartProvider({children}: CartProviderProps) {

  //criando a useState do carrinho que é uma lista que pode ser utilizada por qualquer pagina.
  const [cart, setCart] = useState<CartProps[]>([]);

  return (
    //Dentro do value vai ser oque podemos exportar, oque podemos exportar vai estar sempre dentro do CartContextData, que é a nossa tipagem do contexto.
    //No caso nos podemos exportar apenas o cart, mas se eu tento exportar esse cart ele dá erro dizendo que essa variavel ainda nao existe.
    //Então pra isso eu crio uma useState que é pra armazenar a lista do carrinho
    <CartContext.Provider value={{ cart, cartAmount: cart.length }}>
        {/* Aqui dentro vai renderizar o children, que são as rotas que vão receber as informações do contexto*/}
        {children}
    </CartContext.Provider>
  );
}

export default CartProvider;