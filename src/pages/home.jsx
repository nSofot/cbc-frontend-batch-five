import { Route, Routes } from "react-router-dom"
import Header from "../components/header"
import ProductsPage from "./client/productsPage"
import ProductOverview from "./client/productOverview"

export default function HomePage() {
    return (
        <div className="w-full h-screen flex flex-col item-center">
            <Header />
            <div className="w-full h-[calc(100vh-80px)] flex flex-col items-center">
                <Routes path="/">
                    <Route path="/" element={<h1>Home</h1>}  />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/about" element={<h1>About</h1>} />
                    <Route path="/contact" element={<h1>Contact</h1>} />
                    <Route path="/overview/:Id" element={<ProductOverview />} />
                    <Route path="/*" element={<h1>404 Not Found</h1>} />
                </Routes>
            </div>

        </div>
    )
}