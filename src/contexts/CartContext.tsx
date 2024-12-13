import { createContext, ReactNode, useState } from "react";
import { ProductProps } from "../pages/home";
interface CartContentData{
    cart: CartProps[];
    cartAmount: number;
    addItemCart: (newItem: ProductProps)=> void;
    removeItemCart: (product: CartProps)=> void;
    total: string;
}
interface CartProps{
    id: number;
    title: string;
    description: string;
    price: number;
    cover: string;
    amount: number;
    total: number;
}
interface CartProviderProps{
    children: ReactNode;
}
export const CartContext = createContext({} as CartContentData)
function CartProvider({children}: CartProviderProps){

    const [cart, setCart] = useState<CartProps[]>([])
    const [total, setTotal] = useState("")

    function addItemCart(newItem: ProductProps){
        //adiciona no carrinho
        //verificar se ja nao existe no carrinho
        const indexItem = cart.findIndex(item => item.id === newItem.id)
        if(indexItem !== -1){
            //Se entrou aqui, soma +1 na quantidade e calcula o total novamente.
            let cartList = cart;
            cartList[indexItem].amount = cartList[indexItem].amount + 1;
            cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].price;
            setCart(cartList)
            totalResultCart(cartList)
            return;

        }
        //Adicionar na lista caso nao caia no primeiro if
        let data ={
            ...newItem,
            amount: 1,
            total: newItem.price
        }
        setCart(produtos => [...produtos, data])
        totalResultCart([...cart, data])
    }
    function removeItemCart(produto: CartProps){
        const indexItem = cart.findIndex(item => item.id === produto.id)
        if(cart[indexItem]?.amount > 1){
            //Diminui apenas um amount do que eu tenho.
            let cartList = cart;
            cartList[indexItem].amount = cartList[indexItem].amount -1;
            cartList[indexItem].total = cartList[indexItem].total - cartList[indexItem].price;
            setCart(cartList);
            totalResultCart(cartList)
            return;
        }
        //remover caso seja 1 o item ao clicar no -
        //o filter devolve um array tirando aquele que eu cliquei
        const removeItem = cart.filter(item => item.id !== produto.id)
        setCart(removeItem)
        totalResultCart(removeItem)
    }
    function totalResultCart(items: CartProps[]){
        let myCart = items;
        let result = myCart.reduce((acc, obj)=> { return acc + obj.total}, 0)
        const resultFormated = result.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})
        setTotal(resultFormated)
    }

    return(
        <CartContext.Provider value={{cart , cartAmount: cart.length, addItemCart, removeItemCart, total}}>
            {children}
        </CartContext.Provider>
    )
}
export default CartProvider;