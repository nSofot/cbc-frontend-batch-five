import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/loadingSpinner";

export default function AdminProductsPage() {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
		setIsLoading(true);

		axios
			.get(import.meta.env.VITE_BACKEND_URL + "/api/products")
			.then((res) => {
				setProducts(res.data);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error(error);
				toast.error("Failed to load products");
				setIsLoading(false);
			});
	}, [location]);

	function deleteProduct(productId) {
		const token = localStorage.getItem("token");
		if (!token) {
			toast.error("Please login first");
			return;
		}

		axios
			.delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(() => {
				toast.success("Product deleted successfully");
				setIsLoading(true); // trigger reload
			})
			.catch((e) => {
				toast.error(e.response?.data?.message || "Error deleting product");
			});
	}

	return (
		<div className="w-full h-full flex flex-col p-4 font-[var(--font-main)]">
			{/* Header Section */}
			<div className="flex items-center justify-between mb-4">
				<div>
					<h1 className="text-2xl font-semibold text-gray-800">📦 Products</h1>
					<p className="text-sm text-gray-500">Manage your product listings</p>
				</div>
				<Link
					to="/admin/add-product"
					className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg shadow transition duration-200"
				>
					+ Add New Product
				</Link>
			</div>

			{/* Table Section */}
			<div className="bg-white rounded-lg shadow overflow-x-auto">
				{isLoading ? (
					<div className="p-10 flex justify-center">
						<LoadingSpinner />
					</div>
				) : (
					<table className="min-w-full text-sm text-left">
						<thead className="bg-purple-600 text-white">
							<tr>
								<th className="px-4 py-2">Image</th>
								<th className="px-4 py-2">Product ID</th>
								<th className="px-4 py-2">Name</th>
								<th className="px-4 py-2">Labelled Price</th>
								<th className="px-4 py-2">Price</th>
								<th className="px-4 py-2">Stock</th>
								<th className="px-4 py-2 text-center">Actions</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200">
							{products.map((item, index) => (
								<tr
									key={index}
									className="hover:bg-purple-50 transition duration-150"
								>
									<td className="px-4 py-3">
										<img
											src={item.image[0]}
											alt={item.name}
											className="w-12 h-12 rounded-md object-cover border"
										/>
									</td>
									<td className="px-4 py-3">{item.productId}</td>
									<td className="px-4 py-3">{item.name}</td>
									<td className="px-4 py-3">₹{item.labelledPrice}</td>
									<td className="px-4 py-3">₹{item.price}</td>
									<td className="px-4 py-3">{item.stock}</td>
									<td className="px-4 py-3 text-center">
										<div className="flex justify-center space-x-3">
											<button
												onClick={() => deleteProduct(item.productId)}
												className="text-red-600 hover:text-red-800"
												title="Delete Product"
											>
												<FaTrash size={18} />
											</button>
											<button
												onClick={() =>
													navigate("/admin/edit-product", {
														state: {
															productId: item.productId,
															name: item.name,
															altNames: item.altName,
															description: item.description,
															image: item.image,
															labelledPrice: item.labelledPrice,
															price: item.price,
															stock: item.stock,
														},
													})
												}
												className="text-blue-600 hover:text-blue-800"
												title="Edit Product"
											>
												<FaEdit size={18} />
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
}
