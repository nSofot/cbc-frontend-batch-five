import { useEffect, useState } from "react";
import { sampleProducts } from "../../assets/sampleData.js";
import axios from "axios";

export default function AdminProductPage() {
    
    const [products, setProducts] = useState(sampleProducts);

    useEffect(()=>{
        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product").then((response) => {
            console.log(response.data)
            setProducts(response.data)
            })
        },[]
    );

    return (
        <div className="w-full h-screen max-h-full overflow-y-scroll">
            <table className="w-full bg-gray-200 text-center">
                <thead>
                    <tr>
                        <th>Product Id</th>
                        <th>Product Name</th>
                        <th>Product Description</th>
                        <th>Product Price</th>
                        <th>Product Picture</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(
                            (item,index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.productId}</td>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>{item.price}</td>
                                        <td><img src={item.image[0]} className="w-[50px] h-[50px]"/>/</td>

                                    </tr>
                                )  
                            } 
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}




/*
import { useState } from "react" 
import { sampleProducts } from "../../assets/sampleData"


export default function AdminProductPage() {

    const [products, setProducts] = useState([sampleProducts])

    return (
        <div className="w-full h-screen max-h-full overflow-y-scroll">

            <table className="w-full bg-gray-200 text-center">
                <thead>
                    <tr>
                        <th>Product Id</th>
                        <th>Product Name</th>
                        <th>Product Description</th>
                        <th>Product Price</th>
                        <th>Product Picture</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(  
                            (item)=>{
                                return(
                                    <span>{item.productId}</span>
                                )
                            }
                        )                       
                    }
                </tbody>
            </table>

        </div>  
    )
}
    */
