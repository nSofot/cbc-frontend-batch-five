import { useState } from "react";
import { getCart } from "../../utils/cart";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";


export default function CartPage() {
    const [cart, setCart] = useState(getCart());
    const totalDiscount = cart.reduce((total, item) => {
        return total + (item.labelledPrice - item.price) * item.qty;
    }, 0);

    return (
        <div className="bg-gray-200 w-full h-full flex justify-between items-center pl-20 pr-20 pt-4 pb-4">

            {/* Cart Items */}
            <div className="bg-gray-100 w-[64%] h-full flex flex-col items-left rounded-md p-6 overflow-y-scroll">
                {
                    cart.map(
                        (item)=>{
                            return(
                                
                                <div key={item.productId} className="w-[100%] h-[115px] bg-white my-1 rounded-md flex justify-between items-center p-2">
                                    {/* Product Image */}
                                    <div className="w-[15%] h-full">
                                        <img src={item.image[0]} className="w-[100px] h-[100px] object-cover rounded-md" />
                                    </div>
                                    
                                    {/* Product Details */}
                                    <div className="w-[65%] h-full flex flex-col justify-top items-start">
                                        <div className="w-full h-full flex flex-col justify-top items-start">
                                            <div>
                                                <h1 className="text-1xl text-secondary font-semibold">{item.name}</h1>
                                                <h1 className="text-sm text-gray-600 font-normal">{item.productId}</h1>

                                            </div>
                                            <div className="w-full flex justify-between items-bottom">
                                                {
                                                    item.labelledPrice > item.price ?
                                                    <div>
                                                        <spam className = "text-lg font-semibold mx-1 text-secondary">Rs.{item.price.toFixed(2)}</spam>
                                                        <spam className = "text-md mx-1 text-gray-500 line-through">Rs.{item.labelledPrice.toFixed(2)}</spam>
                                                    </div>
                                                    :
                                                    <spam className = "text-lg mx-1 font-semibold text-accent">Rs.{item.price.toFixed(2)}</spam>
                                                }
                                                <spam className = "text-sm mx-1 text-gray-600 font-semibold">Rs.{(item.price * item.qty).toFixed(2)}</spam>
                                            </div>
                                        </div> 
                                    </div>

                                    {/* Actions */}
                                    <div className="w-[100px] h-[100px] flex flex-col justify-top items-end space-y-4">
                                        {/* <button className="text-red-600 cusor-pointer hover:bg-red-600 hover:text-white rounded-full p-2 right-[-35px]"></button> */}
                                        <button className="text-2xl cusor-pointer hover:bg-red-600 hover:text-white rounded-full">
                                            <BiTrash/>
                                        </button>
                                        <div className="w-[100px] h-[30px] flex flex-row justify-center items-center border-1 border-gray-200 rounded-xl p-2">
                                            <button className="text-1xl mx-1 rounded-xl hover:bg-blue-400 p-2 text-gray-600 font-semibold cursor-pointer aspect-square"><BiMinus/></button>
                                            <h1 className="text-1xl mx-1 text-secondary font-semibold h-full flex items-center">{item.qty}</h1>
                                            <button className="text-1xl mx-1 rounded-xl hover:bg-blue-400 p-2 text-gray-600 font-semibold cursor-pointer aspect-square"><BiPlus/></button>
                                        </div>

                                    </div>
                                </div>
                            )
                        }
                    )
                }
            </div>

            {/* Summary */}

            <div className="bg-gray-100 w-[34%] h-full flex flex-col rounded-md p-8">
                <h1 className="text-2xl font-semibold text-gray-900">Summary</h1>
                <div className="w-full flex justify-between pt-8">
                    <p className="text-sm font-normal text-gray-400">Total Items:</p>
                    <p className="text-sm font-normal text-gray-900"> {cart.length}</p>
                </div>
                <div className="w-full flex justify-between">
                    <p className="text-sm font-normal text-gray-400">Items Total:</p>
                    <p className="text-sm font-normal text-gray-400 line-through">Rs.{cart.reduce((total, item) => total + item.labelledPrice * item.qty, 0).toFixed(2)}</p>
                </div>   
                <div className="w-full flex justify-between">
                    <p className="text-sm font-semibold text-gray-400">Items Discount:</p> 
                    <p className="text-sm font-nrmal text-red-600">- Rs.{totalDiscount.toFixed(2)} </p>
                </div>  
                <div className="w-full flex justify-between">
                    <p className="text-sm font-semibold text-gray-900">Sub Total:</p> 
                    <p className="text-sm font-semibold text-gray-900">Rs.{cart.reduce((total, item) => total + item.price * item.qty, 0).toFixed(2)}</p>
                </div> 
                <div className="w-full flex justify-between pt-2">
                    <p className="text-sm font-semibold text-gray-900">Shipping:</p> 
                    <p className="text-sm font-semibold text-gray-900">Rs.00.00</p>
                </div>    
                <div className="w-full flex justify-between pt-4">
                    <p className="text-lg font-semibold text-gray-900">Estimated Total:</p> 
                    <p className="text-lg font-semibold text-gray-900">Rs.{cart.reduce((total, item) => total + item.price * item.qty, 0).toFixed(2)}</p>
                </div>    
                         
                <button className="bg-red-600 hover:bg-red-700 cursor-pointer text-white font-semibold py-2 px-4 rounded-md mt-8">Checkout</button>
            </div>  
        </div>
    )
}