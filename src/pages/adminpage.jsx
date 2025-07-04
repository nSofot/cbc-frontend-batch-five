import { Route, Routes, Link, useLocation } from "react-router-dom";
import AdminProductsPage from "./admin/adminProductPage";
import AddProductPage from "./admin/addProductPage";
import EditProductPage from "./admin/editProductPage";
import AdminOrdersPage from "./admin/adminOrdersPage";
// import ReviewsPage from "./admin/reviewsPage";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../components/loadingSpinner";

export default function AdminPage() {
    const location = useLocation();
    const path = location.pathname;
    const [status, setStatus] = useState("loading");

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			setStatus("unauthenticated");
			window.location.href = "/login";
		} else {
			axios
				.get(import.meta.env.VITE_BACKEND_URL + "/api/user/", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					if (response.data.role !== "Admin") {
						setStatus("unauthorized");
						toast.error("You are not authorized to access this page");
						window.location.href = "/";
					} else {
						setStatus("authenticated");
					}
				})
				.catch((error) => {
					console.error(error);
					setStatus("unauthenticated");
					toast.error("You are not authenticated, please login");
					window.location.href = "/login";
				});
		}        
	}, [status]);
    

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
            {status == "loading"||status == "unauthenticated"?
                <Loading/>:
				<>
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
                                {/* <Route path="/reviews" element={<ReviewsPage />} /> */}
                                <Route path="/add-product" element={<AddProductPage />} />
                                <Route path="/edit-product" element={<EditProductPage />} />
                            </Routes>
                        </div>
                    </div>
                </>
            }
        </div>
    );
}