import { createContext, ReactNode, useState } from "react";
interface CartContentData{
    cart: CartProps[];
    cartAmount: number;
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

    return(
        <CartContext.Provider value={{cart , cartAmount: cart.length}}>
            {children}
        </CartContext.Provider>
    )
}
export default CartProvider;