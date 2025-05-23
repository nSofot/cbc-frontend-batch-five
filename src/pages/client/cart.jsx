import { useState } from "react";
import { getCart } from "../../utils/cart";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";


export default function CartPage() {
    const [cart, setCart] = useState(getCart());
    return (
        <div className="w-full h-full flex flex-col items-center pt-4">
            {
                cart.map(
                    (item)=>{
                        return(
                            <div key={item.productId} className="w-[600px] h-[100px] my-4 rounded-tl-3xl rounded-bl-3xl flex relative justify-center items-center">
                                <img src={item.image[0]} className="w-[80px] h-[80px] object-cover rounded-tl-3xl rounded-bl-3xl" />
                                <div className="w-[250px] h-full flex flex-col justify-center items-start pl-4">
                                    <h1 className="text-1xl text-secondary font-semibold">{item.name}</h1>
                                    <h1 className="text-md text-gray-600 font-semibold">{item.productId}</h1>
                                    {
                                        item.labelledPrice > item.price ?
                                        <div>
                                            <spam className = "text-md mx-1 text-gray-500 line-through">{item.labelledPrice.toFixed(2)}</spam>
                                            <spam className = "text-md mx-1 text-secondary">{item.price.toFixed(2)}</spam>
                                        </div>
                                        :
                                        <spam className = "text-md mx-1 font-bold text-accent">{item.price.toFixed(2)}</spam>
                                    }
                                </div>
                                <div className="max-w-[100px] h-full flex flex-row justify-center items-center">
                                    <button className="text-4xl mx-1 rounded-xl hover:bg-secondary p-2 text-secondary font-semibold cursor-pointer aspect-square"><BiMinus/></button>
                                    <h1 className="text-xl mx-1 text-secondary font-semibold h-full flex items-center">{item.qty}</h1>
                                    <button className="text-4xl mx-1 rounded-xl hover:bg-secondary p-2 text-secondary font-semibold cursor-pointer aspect-square"><BiPlus/></button>
                                </div>
                                {/* Total*/}
                                <div className="w-[200px] h-full flex flex-col justify-center items-end pr-4">
                                    <spam className = "text-2xl font-semibold text-secondary">{(item.price*item.qty).toFixed(2)}</spam>
                                </div>
                                <button className="absolute text-red-600 cusor-pointer hover:bg-red-600 hover:text-white rounded-full p-2 right-[-35px]">
                                    <BiTrash/>
                                </button>
                            </div>
                        )
                    }
                )
            }
        </div>
    )
}