import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../../components/loadingSpinner";
import toast from "react-hot-toast";

export default function AdminOrdersPage() {
	const [orders, setOrders] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (isLoading) {
			const token = localStorage.getItem("token");
			if (!token) {
				toast.error("Please login first");
				return;
			}

			axios
				.get(import.meta.env.VITE_BACKEND_URL + "/api/order", {
					headers: {
						Authorization: "Bearer " + token,
					},
				})
				.then((res) => {
					setOrders(res.data);
					setIsLoading(false);
				})
				.catch((error) => {
					toast.error(
						"Failed to load orders: " +
							(error.response?.data?.message || "Unknown error")
					);
					setIsLoading(false);
				});
		}
	}, [isLoading]);

	return (
		<div className="w-full h-full overflow-y-auto p-4">
			<h1 className="text-xl font-semibold text-gray-800 mb-4">🧾 Orders</h1>

			{isLoading ? (
				<LoadingSpinner />
			) : (
				<div className="overflow-x-auto bg-white rounded-lg shadow">
					<table className="min-w-full text-sm text-left border border-gray-200">
						<thead className="bg-purple-600 text-white text-sm">
							<tr>
								<th className="px-4 py-2">Order ID</th>
								<th className="px-4 py-2">Date</th>
								<th className="px-4 py-2">Name</th>
								<th className="px-4 py-2">Email</th>
								<th className="px-4 py-2">Phone</th>
								<th className="px-4 py-2">Address</th>
								<th className="px-4 py-2">Total (₹)</th>
								<th className="px-4 py-2">Status</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-100">
							{orders.map((order, index) => (
								<tr
									key={index}
									className="hover:bg-purple-100 transition duration-150"
								>
									<td className="px-4 py-2 font-medium">{order.orderId}</td>
									<td className="px-4 py-2">
										{new Date(order.createdAt).toLocaleDateString()}
									</td>
									<td className="px-4 py-2">{order.name}</td>
									<td className="px-4 py-2">{order.email}</td>
									<td className="px-4 py-2">{order.phone}</td>
									<td className="px-4 py-2">{order.address}</td>
									<td className="px-4 py-2">{order.total.toFixed(2)}</td>
									<td className="px-4 py-2">
										<span
											className={`px-2 py-1 text-xs rounded-full font-medium ${
												order.status === "Delivered"
													? "bg-green-100 text-green-700"
													: order.status === "Pending"
													? "bg-yellow-100 text-yellow-700"
													: "bg-gray-100 text-gray-700"
											}`}
										>
											{order.status}
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
