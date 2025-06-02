import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import mediaUpload from "../../utils/mediaUpload";

export default function EditProductPage() {
	const location = useLocation();
	const navigate = useNavigate();

	const [productId, setProductId] = useState("");
	const [name, setName] = useState("");
	const [altNames, setAltNames] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState([]);
	const [labelledPrice, setLabelledPrice] = useState("");
	const [price, setPrice] = useState("");
	const [stock, setStock] = useState("");

	useEffect(() => {
		if (location.state) {
			const data = location.state;
			setProductId(data.productId || "");
			setName(data.name || "");
			setAltNames(Array.isArray(data.altNames) ? data.altNames.join(",") : "");
			setDescription(data.description || "");
			setLabelledPrice(data.labelledPrice || "");
			setPrice(data.price || "");
			setStock(data.stock || "");
		}
	}, [location.state]);

	async function updateProduct() {
		const token = localStorage.getItem("token");
		if (!token) {
			toast.error("Please login first");
			return;
		}

		let imageUrls = location.state?.image || [];
		try {
			if (image.length > 0) {
				const uploadPromises = Array.from(image).map((img) => mediaUpload(img));
				imageUrls = await Promise.all(uploadPromises);
			}

			const updatedProduct = {
				productId,
				name,
				altNames: altNames.split(",").map((n) => n.trim()),
				description,
				image: imageUrls,
				labelledPrice,
				price,
				stock,
			};

			await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`, updatedProduct, {
				headers: { Authorization: "Bearer " + token },
			});

			toast.success("Product updated successfully");
			navigate("/admin/products");
		} catch (error) {
			console.error(error);
			toast.error(error?.response?.data?.message || "Update failed");
		}
	}

	return (
		<div className="w-full h-full p-4 flex flex-col">
			<div className="flex justify-between items-center mb-4">
				<div>
					<h1 className="text-xl font-semibold text-gray-800">✏️ Edit Product</h1>
					<p className="text-sm text-gray-500">Update existing product information</p>
				</div>
				<Link
					to="/admin/products"
					className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow"
				>
					Cancel
				</Link>
			</div>

			<div className="bg-white shadow rounded-md p-6 max-w-3xl mx-auto w-full">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{/* Product ID (Read-only) */}
					<div className="col-span-full">
						<label className="block text-sm font-medium text-gray-700 mb-1">Product ID</label>
						<input
							type="text"
							disabled
							value={productId}
							className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
						/>
					</div>

					{/* Name */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="input input-bordered w-full"
						/>
					</div>

					{/* Alt Names */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Alt Names (comma-separated)
						</label>
						<input
							type="text"
							value={altNames}
							onChange={(e) => setAltNames(e.target.value)}
							className="input input-bordered w-full"
						/>
					</div>

					{/* Labelled Price */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Labelled Price</label>
						<input
							type="number"
							value={labelledPrice}
							onChange={(e) => setLabelledPrice(e.target.value)}
							className="input input-bordered w-full"
						/>
					</div>

					{/* Selling Price */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Selling Price</label>
						<input
							type="number"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							className="input input-bordered w-full"
						/>
					</div>

					{/* Stock */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
						<input
							type="number"
							value={stock}
							onChange={(e) => setStock(e.target.value)}
							className="input input-bordered w-full"
						/>
					</div>

					{/* Description */}
					<div className="col-span-full">
						<label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
						<textarea
							rows="4"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className="textarea textarea-bordered w-full"
						/>
					</div>

					{/* Image Upload */}
					<div className="col-span-full">
						<label className="block text-sm font-medium text-gray-700 mb-1">New Images (optional)</label>
						<input
							type="file"
							multiple
							onChange={(e) => setImage(Array.from(e.target.files))}
							className="file-input file-input-bordered w-full"
						/>
					</div>
				</div>

				{/* Update Button */}
				<div className="flex justify-end mt-6">
					<button
						onClick={updateProduct}
						className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow font-semibold transition"
					>
						Update Product
					</button>
				</div>
			</div>
		</div>
	);
}
