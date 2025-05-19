import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export default function ProductOverview() {
    const params = useParams();
    const productId = params.Id
    const [status, setStatus] = useState("loading")//loading, success, error
    const [product, setProduct] = useState(null)

    useEffect(
        () => {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId).then(
                (res) => {
                    console.log(res.data);
                    setProduct(res.data);
                    setStatus("success");
                }
            ).catch(
                (error) => {
                    console.log(error);
                    setStatus("error");
                    toast.error("Error fetching product details")
                }
            )
        }
    , []);

    return (
        <div className="font-main">
            <h1>ProductOverview {JSON.stringify(product)} </h1>
        </div>
    );
}

//FBFBFB primary
//393E46 secondary
//C5BAFF accent