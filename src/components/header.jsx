import { BsCart3 } from "react-icons/bs";
import { FiBell } from "react-icons/fi";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Header() {
    const navigate = useNavigate();   

    return (
        <header className="w-full h-[80px] shadow-2xl flex">

            {/* Logo */}
            <img 
                onClick={() => {
                navigate("/")
                }} src="\CBC-Logo.png" alt="Logo" 
                className="w-[80px] h-[80px] object-cover absolute top-0 left-0 cursor-pointer" 
            />

            {/* Links */}
            <div className="w-[calc(100%-160px)] h-full flex justify-center items-center">
                <Link to="/" className="text-[20px] font-semibold mx-2">Home</Link>
                <Link to="/products" className="text-[20px] font-semibold mx-2">Products</Link>
                <Link to="/about" className="text-[20px] font-semibold mx-2">About</Link>
                <Link to="/contact" className="text-[20px] font-semibold mx-2">Contact</Link>
            </div>

            {/* Login & Cart */}
            <div className="w-[350px] h-full flex justify-between items-right gap-8 pr-8">

                <div className="flex items-center gap-8">
                    <button className="relative hover:text-blue-400 transition">
                        <FiBell className="w-7 h-7 text-gray-600 cursor-pointer" />
                        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    <div className="flex justify-center items-center gap-2">
                        <FaRegCircleUser className="w-7 h-7 text-gray-600 cursor-pointer" />
                        <div className="text-sm text-gray-600">
                            <p className="text-xs">Welcome</p>
                            <p className="text-xs font-medium">Sign In / Register</p>
                        </div>
                    </div>
                </div>

                <div className="w-[50px] h-full flex justify-center items-center">
                    <div className="w-[80px] flex justify-center items-center">
                        <div>
                            <Link to="/cart" className="font-semibold mx-2 cursor-pointer hover:text-blue-600">
                                <BsCart3 className="w-7 h-7"/> 
                            </Link>
                        </div>
                        <div>
                            <p className="text-[12px] text-white text-center font-semibold rounded-lg mx-2 bg-blue-600">0</p>
                            <p className="text-[12px] font-semibold mx-2">Cart</p>
                        </div>
                    </div>
                </div>
            </div>
            
        </header>
    )
}