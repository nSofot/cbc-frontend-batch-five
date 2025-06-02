// AdminOrdersPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../../components/loadingSpinner";
import toast from "react-hot-toast";
import Modal from "react-modal";

Modal.setAppElement("#root");

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
				headers: { Authorization: "Bearer " + token },
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

	function formatCurrency(value) {
		return `Rs ${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
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
								<th className="px-4 py-2 text-right">Total</th>
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
									<td className="px-4 py-2 text-right">{formatCurrency(order.total)}</td>
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
				className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-20 overflow-y-auto max-h-[80vh]"
			>
				{activeOrder && (
					<div>
						<h2 className="text-xl font-bold text-gray-800 mb-4">
							Order #{activeOrder.orderId}
						</h2>
						<p className="text-gray-600 mb-2">Date: {formatDate(activeOrder.createdAt)}</p>
						<p className="text-gray-600 mb-2">Customer: {activeOrder.name}</p>
						<p className="text-gray-600 mb-2">Email: {activeOrder.email}</p>
						<p className="text-gray-600 mb-2">Phone: {activeOrder.phone}</p>
						<p className="text-gray-600 mb-2">Address: {activeOrder.address}</p>
						<p className="text-gray-600 mb-4 font-medium">
							Total: {formatCurrency(activeOrder.total)} (Labelled: {formatCurrency(activeOrder.labelledTotal)})
						</p>
						<h3 className="text-lg font-semibold text-purple-700 mb-3">Products</h3>
						<div className="space-y-4">
							{activeOrder.products.map((item, i) => (
								<div key={i} className="flex items-start gap-4 border p-3 rounded-md">
									<img
										src={item.productInfo.images[0]}
										alt={item.productInfo.name}
										className="w-24 h-24 object-cover rounded"
									/>
									<div>
										<h4 className="font-semibold text-gray-800">
											{item.productInfo.name}
										</h4>
										<p className="text-gray-600 text-sm italic">
											{item.productInfo.altNames.join(", ")}
										</p>
										<p className="text-gray-700 mt-1 text-sm">
											Qty: {item.quantity} | Price: {formatCurrency(item.productInfo.price)} | Labelled: {formatCurrency(item.productInfo.labelledPrice)}
										</p>
										<p className="text-gray-500 mt-1 text-xs">
											{item.productInfo.description}
										</p>
									</div>
								</div>
							))}
							<button
								className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
								onClick={() => setIsModalOpen(false)}
							>
								Close
							</button>
							<button
								className="ml-6 mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
								onClick={() => window.print()}
							>
								Print
							</button>
						</div>
					</div>
				)}
			</Modal>
		</div>
	);
}