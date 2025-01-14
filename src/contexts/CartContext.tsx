//importando o createContext do react para criar o contexto e o ReactNode para a tipagem do children.
import { createContext, ReactNode, useState } from "react";

import { ProductProps } from "../pages/home"; 

//dentro do CartContext temos uma propriedade chamada cart que é uma lista que vai ter todas as propriedades do carrinho
interface CartContextData {
  //recebe um carrinho que vai ser uma lista dos itens que tem dentro
  cart: CartProps[];
  //criando outra propriedade que vamos exportar que é a quantidade de itens no carrinho.
  //O valor do cartAmount é o tamanho do array de objetos cart
  cartAmount: number;
  addItemCart: (newItem: ProductProps)=> void;
  removeItemCart: (product: CartProps) => void;
  total: string;
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

//tipagem do provider que vai receber um children que é do tipo react node, ou seja, é qualque coisa que possa ser renderizada em react.
//Garante que o CartProvider envolva outros componentes.
interface CartProviderProps{
    children: ReactNode;
}

//tipando o CartContext que vai seguir o CartContextData, ele vai respeitar essa tipagem que vai ter uma propriedade chamada cart que é uma lista que vai ter ids, titles, prices etc...
export const CartContext = createContext({} as CartContextData);

//criando o provider e ele recebe como propriedade um children
function CartProvider({children}: CartProviderProps) {
//criando a useState do carrinho que é uma lista que pode ser utilizada por qualquer pagina.
const [cart, setCart] = useState<CartProps[]>([]);
const [total, setTotal] = useState("");

  //função que vai adicionar um item a useState do carrinho.
  //ela recebe um item (produto) que é do tipo ProductProps.
  //newItem é o parâmetro que a função recebe, representa o novo item que eu quero adicionar ao carrinho, e é do tipo 
  function addItemCart(newItem: ProductProps){

    //Verificar se ja existe ele no carrinho
    const indexItem = cart.findIndex(item => item.id === newItem.id)//se existir um item que já está no carrinho, o indexItem recebe na variável a posição desse item, caso contrario, recebe -1
    //oque acontece nessa linha é uma verficação que passa pelo array da useState cart e verifica se o id do item que já estiver no carrinho, corresponde ao + 
    //id do item que foi clicado para adicionar ao carrinho.
    //caso o item não exista no carrinho, o indexItem recebe o valor -1 então com base nisso fazemos uma verificação.

    if(indexItem !== -1){
      //Se o item for diferente de -1, quer dizer que o findIndex encontrou o item que eu estou tentando adicionar, na lista atual do carrinho.
      //E se entrou nesse if, adicionamos +1 na quantidade e calculamos o total do carrinho.

      let cartList = cart;//essa variável cartList é uma referência ao array cart

      //como fiz uma referencia ao array cart, eu posso acessar qualquer propriedade dele. Seja o amount, total, price.
      //agora eu to pegando o valor da variavel indexItem (que é um número) e estou trocando o valor da propriedade do item no carrinho que é o número da posição do indexItem.
      //Uma explicação mais simples é que o indexItem corresponde a posição do item da minha lista, se eu cliquei no item com id 3, o indexItem recebe o valor 3.
      cartList[indexItem].amount = cartList[indexItem].amount + 1;
      cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].price;//aqui fazendo a conta do total em que o total vai passar a valer a quantidade do item vezes o preço

      setCart(cartList)//aqui eu passo a nova lista para a useState cart, basicamente estou atualizando o carrinho com as novas informações
      totalResultCart(cartList)
      return;//return para parar a execução do resto da função, para não executar as outras funções abaixo.
    }

    //Adicionar o item na lista, caso o primeiro if seja falso.
    let dados = {
      ...newItem,//esse ...newItem é para o objeto pegar todas as propriedades existentes do newItem que é do tipo ProductProps e adicionamos outras duas: amount e total.
      amount: 1,
      total: newItem.price
    }
    setCart(products => [...products, dados ])//aqui atualizamos o estado do carrinho, pegando todos os produtos já existentes (products) e adicionando o novo item (dados)
    totalResultCart([...cart,dados])
  }
  function removeItemCart(product: CartProps){
    
    const indexItem = cart.findIndex(item => item.id === product.id)
    if(cart[indexItem]?.amount > 1){
      //Diminuir apenas 1 amount do que já tem.
      let cartList = cart;
      cartList[indexItem].amount = cartList[indexItem].amount -1;
      cartList[indexItem].total = cartList[indexItem].total - cartList[indexItem].price;
      setCart(cartList);
      totalResultCart(cartList);
      return;
    }
    //o filter aqui vai passar por todos os itens do carrinho e oque for diferente ele vai deixar dentro da variável removeItem e oque for igual ele vai remover.
    const removeItem = cart.filter(item => item.id !== product.id)//o filter devolve o array tirando aquele que você clicou.
    setCart(removeItem);
    totalResultCart(removeItem)
    
  }
  function totalResultCart(items: CartProps[]){
    let myCart = items;
    let result = myCart.reduce((acc, obj)=>{return acc + obj.total}, 0)
    const resultFormated = result.toLocaleString("pt-BR",{style: "currency", currency: "BRL"})
    setTotal(resultFormated)
  }

  

  return (
    //Dentro do value vai ser oque podemos exportar, oque podemos exportar vai estar sempre dentro do CartContextData, que é a nossa tipagem do contexto.
    //No caso nos podemos exportar apenas o cart, mas se eu tento exportar esse cart ele dá erro dizendo que essa variavel ainda nao existe.
    //Então pra isso eu crio uma useState que é pra armazenar a lista do carrinho
    <CartContext.Provider value={{ cart, cartAmount: cart.length, addItemCart, removeItemCart, total }}>
        {/* Aqui dentro vai renderizar o children, que são as rotas que vão receber as informações do contexto*/}
        {children}
    </CartContext.Provider>
  );
}

export default CartProvider;