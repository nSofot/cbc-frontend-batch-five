import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../../components/productCard";


export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // useEffect(
    //     () => {
    //     if(isLoading){
    //         axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products")
    //             .then((response) => {
    //                 setProducts(response.data);
    //                 setIsLoading(false);
    //             }
    //         )
    //     }
    // }, [isLoading]);

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
            .then((response) => {
                setProducts(response.data);
            })
            .catch((err) => {
                console.error("Failed to fetch products:", err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <p className="text-gray-500">Loading products...</p>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-wrap justify-center items-center">
            {
                products.map((product)=>{
                    return(
                        <ProductCard key={product.productId} product={product} />
                    )
                })
            }
        </div>
    )
}