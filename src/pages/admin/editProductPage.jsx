import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import axios from "axios";

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

			const product = {
				productId,
				name,
				altNames: altNames.split(","),
				description,
				image: imageUrls,
				labelledPrice,
				price,
				stock,
			};

			await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`, product, {
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
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-100 to-gray-200 p-6">
			<div className="bg-white w-full max-w-2xl p-8 rounded-2xl shadow-2xl">
				<h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Edit Product</h2>

				<div className="grid grid-cols-1 gap-5">
					{/* Product ID (readonly) */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Product ID</label>
						<input
							type="text"
							className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
							value={productId}
							disabled
						/>
					</div>

					{/* Product Name */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
						<input
							type="text"
							className="input input-bordered w-full"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>

					{/* Alt Names */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Alt Names (comma-separated)</label>
						<input
							type="text"
							className="input input-bordered w-full"
							value={altNames}
							onChange={(e) => setAltNames(e.target.value)}
						/>
					</div>

					{/* Description */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
						<textarea
							className="textarea textarea-bordered w-full"
							rows="3"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>

					{/* Pricing */}
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">Labelled Price</label>
							<input
								type="number"
								className="input input-bordered w-full"
								value={labelledPrice}
								onChange={(e) => setLabelledPrice(e.target.value)}
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
							<input
								type="number"
								className="input input-bordered w-full"
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							/>
						</div>
					</div>

					{/* Stock */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
						<input
							type="number"
							className="input input-bordered w-full"
							value={stock}
							onChange={(e) => setStock(e.target.value)}
						/>
					</div>

					{/* Image Upload */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">New Images (optional)</label>
						<input
							type="file"
							className="file-input file-input-bordered w-full"
							multiple
							onChange={(e) => setImage(Array.from(e.target.files))}
						/>
					</div>

					{/* Action Buttons */}
					<div className="flex justify-between mt-6">
						<Link
							to="/admin/products"
							className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
						>
							Cancel
						</Link>
						<button
							onClick={updateProduct}
							className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
						>
							Update Product
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}




// import { useState, useEffect } from "react";
// import toast from "react-hot-toast";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import mediaUpload from "../../utils/mediaUpload";
// import axios from "axios";


// export default function EditProductPage() {
// 	const location = useLocation();
// 	const navigate = useNavigate();


// 	const [productId, setProductId] = useState();
// 	const [name, setName] = useState();
// 	const [altNames, setAltNames] = useState();
// 	const [description, setDescription] = useState();
// 	const [image, setImage] = useState([]);
// 	const [labelledPrice, setLabelledPrice] = useState();
// 	const [price, setPrice] = useState();
// 	const [stock, setStock] = useState();

// 	useEffect(() => {
// 		if (location.state) {
// 			setProductId(location.state.productId || "");
// 			setName(location.state.name || "");
// 			setAltNames(Array.isArray(location.state.altNames) ? location.state.altNames.join(",") : "");
// 			setDescription(location.state.description || "");
// 			setLabelledPrice(location.state.labelledPrice || "");
// 			setPrice(location.state.price || "");
// 			setStock(location.state.stock || "");
// 		}
// 	}, [location.state]);

// 	async function updateProduct() {

// 		const token = localStorage.getItem("token")
// 		if (token == null) {
// 			toast.error("Please login first")
// 			return
// 		}

// 		let imageUrls = location.state?.image || [];

// 		const promisesArray = [];

// 		for (let i = 0; i < image.length; i++) {
// 			promisesArray[i] = mediaUpload(image[i]);
// 		}
// 		try {
// 			const isNewImagesSelected = image.length > 0;
// 			if (isNewImagesSelected) {
// 				imageUrls = await Promise.all(promisesArray);
// 			}



// 			const altNamesArray = altNames.split(",")

// 			const product = {
// 				productId: productId,
// 				name: name,
// 				altNames: altNamesArray,
// 				description: description,
// 				image: imageUrls,
// 				labelledPrice: labelledPrice,
// 				price: price,
// 				stock: stock,
// 			}

// 			axios.put(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId, product, {
// 				headers: {
// 					"Authorization": "Bearer " + token
// 				}
// 			}).then(() => {
// 				toast.success("Product updated successfully")
// 				navigate("/admin/products")
// 			}).catch((e) => {
// 				toast.error(e.response.data.message)
// 			})

// 		} catch (e) {
// 			console.log(e);
// 		}
// 	}
// 	return (
// 		<div className="w-full h-full flex flex-col justify-center items-center">
// 			<h1 className="text-3xl font-bold mb-4">Edit Product</h1>
// 			<input
// 				type="text"
// 				disabled
// 				placeholder="Product ID"
// 				className="input input-bordered w-full max-w-xs"
// 				value={productId}
// 				onChange={(e) => {
// 					setProductId(e.target.value);
// 				}}
// 			/>
// 			<input
// 				type="text"
// 				placeholder="Name"
// 				className="input input-bordered w-full max-w-xs"
// 				value={name}
// 				onChange={(e) => {
// 					setName(e.target.value);
// 				}}
// 			/>
// 			<input
// 				type="text"
// 				placeholder="Alt Names"
// 				className="input input-bordered w-full max-w-xs"
// 				value={altNames}
// 				onChange={(e) => {
// 					setAltNames(e.target.value);
// 				}}
// 			/>
// 			<input
// 				type="text"
// 				placeholder="Description"
// 				className="input input-bordered w-full max-w-xs"
// 				value={description}
// 				onChange={(e) => {
// 					setDescription(e.target.value);
// 				}}
// 			/>
// 			<input
// 				type="file"
// 				placeholder="Image"
// 				multiple
// 				className="input input-bordered w-full max-w-xs"
// 				onChange={(e) => {
// 					// setImages(e.target.files);
// 					setImage(Array.from(e.target.files));
// 				}}
// 			/>
// 			<input
// 				type="number"
// 				placeholder="Labelled Price"
// 				className="input input-bordered w-full max-w-xs"
// 				value={labelledPrice}
// 				onChange={(e) => {
// 					setLabelledPrice(e.target.value);
// 				}}
// 			/>
// 			<input
// 				type="number"
// 				placeholder="Price"
// 				className="input input-bordered w-full max-w-xs"
// 				value={price}
// 				onChange={(e) => {
// 					setPrice(e.target.value);
// 				}}
// 			/>
// 			<input
// 				type="number"
// 				placeholder="Stock"
// 				className="input input-bordered w-full max-w-xs"
// 				value={stock}
// 				onChange={(e) => {
// 					setStock(e.target.value);
// 				}}
// 			/>
// 			<div className="w-full flex justify-center flex-row items-center mt-4">
// 				<Link
// 					to="/admin/products"
// 					className="bg-red-500 text-white font-bold py-2 px-4 rounded mr-4"
// 				>
// 					Cancel
// 				</Link>
// 				<button
// 					className="bg-green-500 text-white font-bold py-2 px-4 rounded"
// 					onClick={updateProduct}
// 				>
// 					Update Product
// 				</button>
// 			</div>
// 		</div>
// 	);
// }
