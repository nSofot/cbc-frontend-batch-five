import { useState } from "react";
import toast from "react-hot-toast";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";


export default function CheckOutPage() {

    const navigate = useNavigate();
    const location = useLocation();
    const [cart, setCart] = useState(() => {
        const items = location.state?.cart || [];
        return items.map(item => ({
            ...item,
            description: item.description || item.productInfo?.description || "No description provided"
        }));
    });

    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");

    function getItemsTotal() {
        return cart.reduce((total, item) => total + item.labelledPrice * item.qty, 0);
    }

    function getItemsDiscount() {
        return cart.reduce((total, item) => total + (item.labelledPrice - item.price) * item.qty, 0);
    }

    function getSubTotal() {
        return cart.reduce((total, item) => total + item.price * item.qty, 0);
    }

    function getEstimatedTotal() {
        return cart.reduce((total, item) => {
            const price = parseFloat(item.price) || 0;
            const qty = parseInt(item.qty) || 0;
            return total + price * qty;
        }, 0);
    }

    function removeFromCart(index) {
        setCart(cart.filter((_, i) => i !== index));
    }

    function changeQty(index, qty) {
        const newQty = Math.max(cart[index].qty + qty, 1);
        const newCart = [...cart];
        newCart[index].qty = newQty;
        setCart(newCart);
    }

    async function placeOrder() {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login first");
            return;
        }

        if (!phoneNumber || !address) {
            toast.error("Please enter phone number and address");
            return;
        }
        if (cart.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        const orderInformation = {
            products: [],
            phone: phoneNumber,
            address: address,
        };

        for (let i = 0; i < cart.length; i++) {
            orderInformation.products[i] = {
                productInfo: {
                    productId: cart[i].productId,
                    quantity: cart[i].qty,
                    name: cart[i].name,
                    description: cart[i].description || cart[i].productInfo?.description || "No description provided",
                    price: cart[i].price,
                    image: cart[i].image[0],
                    altName: cart[i].altName
                }
            };
        }

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/order`,
                orderInformation,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );

            toast.success("Order placed successfully!");
            navigate("/products"); // ⬅ If you have an order history page

        } catch (err) {
            toast.error("Error placing order");
        }
    }


    return (
        <div className="bg-gray-200 w-full h-full flex justify-between items-center pl-25 pr-25 pt-4 pb-4">
            {/* Cart Items */}
            <div className="bg-gray-100 w-[65%] h-full flex flex-col items-left rounded-md p-6 overflow-y-scroll">
                {cart.map((item, index) => (
                    <div key={item.productId || index} className="w-[100%] h-[115px] bg-white my-1 rounded-md flex justify-between items-center p-2">
                        <div className="w-[15%] h-full ml-4">
                            <img src={item.image[0]} className="w-[100px] h-[100px] object-cover rounded-md" />
                        </div>

                        <div className="w-[65%] h-full flex flex-col justify-top items-start">
                            <div className="w-full h-full flex flex-col justify-top items-start">
                                <div>
                                    <h1 className="text-1xl text-secondary font-semibold">{item.name}</h1>
                                    <h1 className="text-sm text-gray-600 font-normal">{item.productId}</h1>
                                </div>
                                <div className="w-full flex justify-between items-bottom">
                                    {item.labelledPrice > item.price ? (
                                        <div>
                                            <span className="text-lg font-semibold text-secondary">Rs.{item.price.toFixed(2)}</span>
                                            <span className="text-md mx-2 text-gray-500 line-through">Rs.{item.labelledPrice.toFixed(2)}</span>
                                        </div>
                                    ) : (
                                        <span className="text-lg font-semibold text-accent">Rs.{item.price.toFixed(2)}</span>
                                    )}
                                    <span className="text-sm mx-1 text-gray-600 font-semibold">Rs.{(item.price * item.qty).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="w-[100px] h-[100px] flex flex-col justify-top items-end space-y-4">
                            <button className="text-2xl cursor-pointer hover:bg-red-600 hover:text-white rounded-full"
                                onClick={() => removeFromCart(index)}><BiTrash />
                            </button>
                            <div className="w-[100px] h-[30px] flex flex-row justify-center items-center border-1 border-gray-200 rounded-xl p-2">
                                <button className="text-1xl mx-1 rounded-xl hover:bg-blue-400 p-2 text-gray-600 font-semibold cursor-pointer aspect-square"
                                    onClick={() => changeQty(index, -1)}><BiMinus />
                                </button>
                                <h1 className="text-1xl mx-1 text-secondary font-semibold h-full flex items-center">{item.qty}</h1>
                                <button className="text-1xl mx-1 rounded-xl hover:bg-blue-400 p-2 text-gray-600 font-semibold cursor-pointer aspect-square"
                                    onClick={() => changeQty(index, 1)}><BiPlus />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Summary */}
            <div className="bg-gray-100 w-[33%] h-full flex flex-col rounded-md p-8">
                <h1 className="text-2xl font-semibold text-gray-900">Summary</h1>
                <div className="w-full flex justify-between pt-8">
                    <p className="text-sm font-normal text-gray-400">Total Items:</p>
                    <p className="text-sm font-normal text-gray-900">{cart.length}</p>
                </div>
                <div className="w-full flex justify-between">
                    <p className="text-sm font-normal text-gray-400">Items Total:</p>
                    <p className="text-sm font-normal text-gray-400 line-through">
                        Rs.{getItemsTotal().toFixed(2)}
                    </p>
                </div>
                <div className="w-full flex justify-between">
                    <p className="text-sm font-semibold text-gray-400">Items Discount:</p>
                    <p className="text-sm font-nrmal text-red-600">
                        - Rs.{getItemsDiscount().toFixed(2)}
                    </p>
                </div>
                <div className="w-full flex justify-between">
                    <p className="text-sm font-semibold text-gray-900">Sub Total:</p>
                    <p className="text-sm font-semibold text-gray-900">
                        Rs.{getSubTotal().toFixed(2)}
                    </p>
                </div>
                <div className="w-full flex justify-between pt-2">
                    <p className="text-sm font-semibold text-gray-900">Shipping:</p>
                    <p className="text-sm font-semibold text-gray-900">
                        Rs.00.00
                    </p>
                </div>
                <div className="w-full flex justify-between pt-4">
                    <p className="text-lg font-semibold text-gray-900">Estimated Total:</p>
                    <p className="text-lg font-semibold text-gray-900">
                        Rs.{getEstimatedTotal().toFixed(2)}
                    </p>
                </div>

                <input
                    className="w-full text-sm rounded-md border-2 border-gray-200 py-2 px-4 mt-8"
                    type="text"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <input
                    className="w-full text-sm rounded-md border-2 border-gray-200 py-2 px-4 mt-4"
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                <button
                    className="bg-green-600 hover:bg-green-700 cursor-pointer text-white font-semibold py-2 px-4 rounded-md mt-8 active:bg-green-800"
                    disabled={cart.length === 0}
                    onClick={placeOrder}
                >
                    Place Order
                </button>

                <p className="text-sm font-semibold text-gray-600 mt-4">
                    * Shipping and taxes are calculated at checkout.
                </p>
            </div>
        </div>
    );
}