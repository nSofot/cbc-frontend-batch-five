// AdminOrdersPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../../components/loadingSpinner";
import toast from "react-hot-toast";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Required for accessibility

export default function AdminOrdersPage() {
	const [orders, setOrders] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [activeOrder, setActiveOrder] = useState(null);

	useEffect(() => {
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
	}, []);

	function formatDate(dateString) {
		return new Date(dateString).toLocaleDateString();
	}

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
								<th className="px-4 py-2 text-right">Total (Rs)</th>
								<th className="px-4 py-2">Status</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-100">
							{orders.map((order, index) => (
								<tr
									key={index}
									onClick={() => {
										setActiveOrder(order);
										setIsModalOpen(true);
									}}
									className="hover:bg-purple-100 transition duration-150 cursor-pointer"
								>
									<td className="px-4 py-2 font-medium">{order.orderId}</td>
									<td className="px-4 py-2">{formatDate(order.createdAt)}</td>
									<td className="px-4 py-2">{order.name}</td>
									<td className="px-4 py-2">{order.email}</td>
									<td className="px-4 py-2">{order.phone}</td>
									<td className="px-4 py-2">{order.address}</td>
									<td className="px-4 py-2 text-right">{order.total.toFixed(2)}</td>
									<td className="px-4 py-2">
										<span
											className={`px-2 py-1 text-xs rounded-full font-medium ${
												order.status.toLowerCase() === "delivered"
													? "bg-green-100 text-green-700"
												: order.status.toLowerCase() === "pending"
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

			<Modal
				isOpen={isModalOpen}
				onRequestClose={() => setIsModalOpen(false)}
				contentLabel="Order Details"
				className="bg-white border-2 border-purple-600 p-6 rounded-md w-full max-w-2xl mx-auto mt-12 shadow-lg"
				overlayClassName="fixed inset-0 bg-{#00000080} flex items-center justify-center"
			>
				{activeOrder && (
					<div className="space-y-4">
						<h2 className="text-lg font-bold">Order Details - {activeOrder.orderId}</h2>
						<div>
							<p><strong>Name:</strong> {activeOrder.name}</p>
							<p><strong>Email:</strong> {activeOrder.email}</p>
							<p><strong>Phone:</strong> {activeOrder.phone}</p>
							<p><strong>Address:</strong> {activeOrder.address}</p>
							<p><strong>Status:</strong> {activeOrder.status}</p>
						</div>
						<div>
							<h3 className="font-semibold mb-2">Products:</h3>
							<ul className="list-disc pl-5">
								{activeOrder.products.map((item, i) => (
									<li key={i}>
										{item.productInfo.name} × {item.quantity} — Rs. {item.productInfo.price.toFixed(2)}
									</li>
								))}
							</ul>
						</div>
						<div>
							<p><strong>Total:</strong> Rs. {activeOrder.total.toFixed(2)}</p>
							<p><strong>Labelled Total:</strong> Rs. {activeOrder.labelledTotal.toFixed(2)}</p>
						</div>
						<button
							onClick={() => setIsModalOpen(false)}
							className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
						>
							Close
						</button>
						<button
							onClick={() => window.print()}
							className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
						>
							Print
						</button>
					</div>
				)}
			</Modal>
		</div>
	);
}
