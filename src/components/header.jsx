import { Link, useNavigate, useLocation } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";

export default function Header() {
  const [sideDrawerOpened, setSideDrawerOpened] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const cart = localStorage.getItem("cart");
  const isLoggedIn = Boolean(token);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  // Close drawer whenever the route changes
  useEffect(() => setSideDrawerOpened(false), [location.pathname]);

  return (
    <header className="w-full h-[80px] shadow-2xl flex justify-center relative">
      {/* Hamburger (mobile) */}
      <GiHamburgerMenu
        className="h-full text-3xl md:hidden absolute left-2 cursor-pointer"
        onClick={() => setSideDrawerOpened(true)}
      />

      {/* Logo */}
      <img
        src="/CBC-Logo.png"
        alt="Logo"
        className="w-[80px] h-[80px] object-cover cursor-pointer"
        onClick={() => navigate("/")}
      />

      {/* Links (desktop) */}
      <nav className="flex-1 hidden md:flex justify-center items-center">
        <Link to="/"         className="text-[20px] font-bold mx-2">Home</Link>
        <Link to="/products" className="text-[20px] font-bold mx-2">Products</Link>
        <Link to="/about"    className="text-[20px] font-bold mx-2">About</Link>
        <Link to="/contact"  className="text-[20px] font-bold mx-2">Contact</Link>
      </nav>

      {/* Right‑hand controls (desktop) */}
      <div className="w-[200px] hidden md:flex justify-center items-center">
        <FaRegUser className="cursor-pointer text-[25px] mr-2" />
        {isLoggedIn ? (
          <button onClick={handleLogout} className="cursor-pointer text-md font-bold mr-6">
            Logout
          </button>
        ) : (
          <Link to="/login" className="cursor-pointer text-[20px] font-bold mr-6">Login</Link>
        )}
       
        <Link to="/cart" className="text-[20px] font-bold">
          <BsCart3 className="text-[25px]" />
        </Link>
         <span className="text-sm text-white bg-white"> {cart ? JSON.parse(cart).length : "text-sm text-white bg-red-600 w-[20px] h-[20px] rounded-full flex items-center justify-center"}</span>
      </div> 

      {/* Mobile side‑drawer */}
      <div
        className={`fixed inset-0 bg-black/60 flex md:hidden transition-opacity
                    ${sideDrawerOpened ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setSideDrawerOpened(false)}
      >
        <aside
          className={`w-[350px] bg-white h-full shadow-xl transform transition-transform
                      ${sideDrawerOpened ? 'translate-x-0' : '-translate-x-full'}`}
          onClick={e => e.stopPropagation()}
        >
          <div className="w-full h-[80px] shadow-2xl flex items-center relative">
            <GiHamburgerMenu
              className="text-3xl absolute left-2 cursor-pointer"
              onClick={() => setSideDrawerOpened(false)}
            />
            <img
              src="/CBC-Logo.png"
              alt="Logo"
              className="w-[80px] h-[80px] object-cover cursor-pointer mx-auto"
              onClick={() => navigate("/")}
            />
          </div>

          <nav className="flex flex-col items-center gap-2 mt-4">
            <Link to="/"         className="text-[20px] font-bold my-2">Home</Link>
            <Link to="/products" className="text-[20px] font-bold my-2">Products</Link>
            <Link to="/about"    className="text-[20px] font-bold my-2">About</Link>
            <Link to="/contact"  className="text-[20px] font-bold my-2">Contact</Link>
            <Link to="/cart"     className="text-[20px] font-bold my-2">
              <BsCart3 />
            </Link>
            {isLoggedIn ? (
              <button onClick={handleLogout} className="text-[20px] font-bold my-2">Logout</button>
            ) : (
              <Link to="/login" className="text-[20px] font-bold my-2">Login</Link>
            )}
          </nav>
        </aside>
      </div>
    </header>
  );
}
