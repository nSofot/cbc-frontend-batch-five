import { Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import AdminProductPage from "./admin/adminProductPage";

export default function AdminPage() {
    return (
        <div className="w-full h-screen flex">
            <div className="h-full w-[300px] flex flex-col">   
                <Link to="/admin/products">Products</Link>
                <Link to="/admin/users">Users</Link>
                <Link to="/admin/orders">Orders</Link>
                <Link to="/admin/reviews">Reviews</Link>
            </div>
            <div className="h-full w-[calc(100%-300px)]">   
                <Routes path="/*"> 
                    <Route path="/products" element={<AdminProductPage/>} />
                    <Route path="/users" element={<h1>Users</h1>} />
                    <Route path="/orders" element={<h1>Orders</h1>} />
                    <Route path="/reviews" element={<h1>Reviews</h1>} />
                    <Route path="/*" element={<h1>404 Not Found</h1>} />
                </Routes> 
            </div>
        </div>
    )
}