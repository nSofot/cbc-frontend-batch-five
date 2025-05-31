import { Route, Routes, Link } from "react-router-dom";

import AdminProductsPage from "./admin/productPage";
import AddProductPage from "./admin/addProductPage";
import EditProductPage from "./admin/editProductPage";

export default function AdminPage() {
    return (
        <div className="w-full h-screen bg-gray-100 flex flex-col font-sans">
            {/* Top Bar */}
            <div className="h-20 w-full bg-white shadow-md flex items-center px-6">
                <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            </div>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-64 bg-white border-r shadow-md flex flex-col p-4 space-y-2">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Navigation</h2>
                    <Link 
                        to="/admin/products" 
                        className="text-gray-700 px-3 py-2 rounded hover:bg-gray-100 transition"
                    >
                        📦 Products
                    </Link>
                    <Link 
                        to="/admin/users" 
                        className="text-gray-700 px-3 py-2 rounded hover:bg-gray-100 transition"
                    >
                        👤 Users
                    </Link>
                    <Link 
                        to="/admin/orders" 
                        className="text-gray-700 px-3 py-2 rounded hover:bg-gray-100 transition"
                    >
                        🧾 Orders
                    </Link>
                    <Link 
                        to="/admin/reviews" 
                        className="text-gray-700 px-3 py-2 rounded hover:bg-gray-100 transition"
                    >
                        ⭐ Reviews
                    </Link>
                    <Link 
                        to="/admin/add-product" 
                        className="mt-4 text-white bg-blue-600 px-3 py-2 rounded hover:bg-blue-700 transition"
                    >
                        ➕ Add Product
                    </Link>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-auto p-6 bg-gray-50">
                    <Routes>
                        <Route path="/products" element={<AdminProductsPage />} />
                        <Route path="/users" element={<h1 className="text-xl font-semibold">Users</h1>} />
                        <Route path="/orders" element={<h1 className="text-xl font-semibold">Orders</h1>} />
                        <Route path="/reviews" element={<h1 className="text-xl font-semibold">Reviews</h1>} />
                        <Route path="/add-product" element={<AddProductPage />} />
                        <Route path="/edit-product" element={<EditProductPage />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}