import { Route, Routes, Link, useLocation } from "react-router-dom";

import AdminProductsPage from "./admin/productPage";
import AddProductPage from "./admin/addProductPage";
import EditProductPage from "./admin/editProductPage";
import AdminOrdersPage from "./admin/adminOrdersPage";

export default function AdminPage() {
    const location = useLocation();
    const path = location.pathname;

    function getClass(name){
        if(path.includes(name)){
            return "text-white bg-purple-600 px-3 py-2 rounded hover:bg-gray-600 transition";
        }
        else{
            return "text-purple-600 px-3 py-2 rounded hover:bg-gray-300 transition";
        }
    }

    return (
        <div className="w-full h-screen bg-purple-600 flex flex-col font-sans">

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-[256px] bg-white border-r shadow-md flex flex-col p-4 space-y-2">
                    <h2 className="text-lg font-semibold text-purple-800 mb-4">Admin Panel</h2>

                    <Link 
                        className={getClass("products")}
                        to="/admin/products"
                        >
                        📦 Products
                    </Link>

                    <Link 
                        className={getClass("users")}
                        to="/admin/users" 
                        >
                        👤 Users
                    </Link>
                    <Link 
                        className={getClass("orders")}
                        to="/admin/orders" 
                    >
                        🧾 Orders
                    </Link>
                    <Link 
                        className={getClass("reviews")}
                        to="/admin/reviews"  
                    >
                        ⭐ Reviews
                    </Link>
                    <Link 
                        className={getClass("add-product")}
                        to="/admin/add-product" 
                    >
                        ➕ Add Product
                    </Link>
                </div>

                {/* Content Area */}
                <div className="h-full w-[calc(100%-256px)] border-purple-600 border-4 rounded-xl bg-white">
                    <Routes>
                        <Route path="/products" element={<AdminProductsPage />} />
                        <Route path="/users" element={<h1 className="text-xl font-semibold">Users</h1>} />
                        <Route path="/orders" element={<AdminOrdersPage />} />
                        <Route path="/reviews" element={<h1 className="text-xl font-semibold">Reviews</h1>} />
                        <Route path="/add-product" element={<AddProductPage />} />
                        <Route path="/edit-product" element={<EditProductPage />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}