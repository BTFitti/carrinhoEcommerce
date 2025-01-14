import { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { ProductProps } from "../home";
import { api } from "../../servics/api";

export function Products(){
    //para pegar o parâmetro da rota (id)
    const {id} = useParams()

    const [product, setProduct] = useState<ProductProps>();

    useEffect(()=>{
        async function getProduct(){
            const response = await api.get(`/products/${id}`)
            setProduct(response.data);
        }
        getProduct();
    },[]);
    return(
        <div className="w-full max-w-7xl flex bg-slate-500 mx-auto gap-24 flex-col">
            <section className="flex items-center">
            <img
                className="rounded-lg mb-2 max-h-72"
                src={product?.cover}
                alt={product?.title}        
              />
            </section>  
            <h1>{product?.title}</h1>   
            <p>{product?.description}</p>  
            <p>{product?.price}</p>
        </div>
    )
}