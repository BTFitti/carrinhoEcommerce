import { createContext, ReactNode, useState } from "react";
import { ProductProps } from "../pages/home";
interface CartContentData{
    cart: CartProps[];
    cartAmount: number;
    addItemCart: (newItem: ProductProps)=> void;
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
            return;

        }
        //Adicionar na lista caso nao caia no primeiro if
        let data ={
            ...newItem,
            amount: 1,
            total: newItem.price
        }
        setCart(produtos => [...produtos, data])
    }

    return(
        <CartContext.Provider value={{cart , cartAmount: cart.length, addItemCart}}>
            {children}
        </CartContext.Provider>
    )
}
export default CartProvider;