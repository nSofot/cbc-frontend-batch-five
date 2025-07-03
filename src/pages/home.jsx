import { Route, Routes } from "react-router-dom"
import Header from "../components/header"
import ProductsPage from "./client/productsPage"
import ProductOverview from "./client/productOverview"
import CartPage from "./client/cart"
import CheckOutPage from "./client/checkOut"
import About from "./client/about"
import Contact from "./client/contact"
import Home from "./client/homePage"

export default function HomePage() {
    return (
        <div className="w-full h-screen flex flex-col item-center">
            <Header />
            <div className="w-full h-[calc(100vh-80px)] flex flex-col items-center">
                <Routes path="/">
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact/>} />
                    <Route path="/overview/:Id" element={<ProductOverview />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckOutPage />} />
                    <Route path="/*" element={<h1>404 Not Found</h1>} />
                </Routes>
            </div>

        </div>
    )
}