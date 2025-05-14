import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../../components/productCard";


export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(
        () => {
        if(isLoading){
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product")
                .then((response) => {
                    setProducts(response.data);
                    setIsLoading(false);
                }
            )
        }
    }, [isLoading]);

    return (
        <div className="w-full h-full flex flex-wrap justify-center items-center">
            {
                products.map((product)=>{
                    return(
                        <ProductCard key={product.prroductId} product={product} />
                    )
                })
            }
        </div>
    )
}