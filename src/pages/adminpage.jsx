import { Route, Routes, Link, useLocation, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// Admin Pages
import AdminProductsPage from "./admin/adminProductPage";
import AddProductPage from "./admin/addProductPage";
import EditProductPage from "./admin/editProductPage";
import UsersPage from "./admin/usersPage";
import AdminOrdersPage from "./admin/adminOrdersPage";
import ReviewsPage from "./admin/reviewsPage";
import Loading from "../components/loadingSpinner";
import NotFoundPage from "./notFoundPage";

export default function AdminPage() {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");

  // Auth check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setStatus("unauthenticated");
      window.location.href = "/login";
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/user/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.role?.toLowerCase() !== "admin") {
          setStatus("unauthorized");
          toast.error("You are not authorized to access this page");
          window.location.href = "/";
        } else {
          setStatus("authenticated");
        }
      })
      .catch((err) => {
        console.error(err);
        setStatus("unauthenticated");
        toast.error("You are not authenticated, please login");
        window.location.href = "/login";
      });
  }, []);

  const getClass = (name) =>
    path.includes(`/admin/${name}`)
      ? "text-white bg-purple-600 px-3 py-2 rounded hover:bg-gray-600 transition"
      : "text-purple-600 px-3 py-2 rounded hover:bg-gray-300 transition";

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  if (status === "loading" || status === "unauthenticated") {
    return <Loading />;
  }

  return (
    <div className="w-full h-screen bg-purple-600 flex flex-col font-sans">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[256px] bg-white border-r shadow-md flex flex-col justify-between p-4">
          <div className="flex flex-col space-y-2">
            <h2 className="text-lg font-semibold text-purple-800 mb-4">Admin Panel</h2>
            <Link className={getClass("products")} to="/admin/products">📦 Products</Link>
            <Link className={getClass("users")} to="/admin/users">👤 Users</Link>
            <Link className={getClass("orders")} to="/admin/orders">🧾 Orders</Link>
            <Link className={getClass("reviews")} to="/admin/reviews">⭐ Reviews</Link>
            <Link className={getClass("add-product")} to="/admin/add-product">➕ Add Product</Link>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-6 text-red-600 font-semibold px-3 py-2 rounded hover:bg-red-100 transition text-left"
          >
            🔓 Logout
          </button>
        </aside>

        {/* Page Content */}
        <main className="h-full w-[calc(100%-256px)] border-purple-600 border-4 rounded-xl bg-white overflow-y-auto">
          <Routes>
            <Route path="" element={<Navigate to="products" replace />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="reviews" element={<ReviewsPage />} />
            <Route path="add-product" element={<AddProductPage />} />
            <Route path="edit-product" element={<EditProductPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
