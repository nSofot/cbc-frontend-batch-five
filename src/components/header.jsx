import { BsCart3 } from "react-icons/bs";
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
            <div className="w-[200px] h-full flex justify-center items-center">
                <div className="w-[50px] h-full flex justify-center items-center">
                    <div className="w-[80px] flex justify-center items-center">
                        <div>
                            <Link to="/cart" className="text-[25px] font-semibold mx-2 cursor-pointer hover:text-blue-600">
                                <BsCart3 /> 
                            </Link>
                        </div>
                        <div>
                            <p className="text-[12px] text-white text-center font-semibold rounded-lg mx-2 bg-blue-600">10</p>
                            <p className="text-[12px] font-semibold mx-2">Cart</p>
                        </div>
                    </div>
                </div>
            </div>
            
        </header>
    )
}