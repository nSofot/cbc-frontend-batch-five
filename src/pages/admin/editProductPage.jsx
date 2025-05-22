import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import axios from "axios";


export default function EditProductPage() {
	const location = useLocation();
	const navigate = useNavigate();


	const [productId, setProductId] = useState();
	const [name, setName] = useState();
	const [altNames, setAltNames] = useState();
	const [description, setDescription] = useState();
	const [image, setImage] = useState([]);
	const [labelledPrice, setLabelledPrice] = useState();
	const [price, setPrice] = useState();
	const [stock, setStock] = useState();

	useEffect(() => {
		if (location.state) {
			setProductId(location.state.productId || "");
			setName(location.state.name || "");
			setAltNames(Array.isArray(location.state.altNames) ? location.state.altNames.join(",") : "");
			setDescription(location.state.description || "");
			setLabelledPrice(location.state.labelledPrice || "");
			setPrice(location.state.price || "");
			setStock(location.state.stock || "");
		}
	}, [location.state]);

	async function updateProduct() {

		const token = localStorage.getItem("token")
		if (token == null) {
			toast.error("Please login first")
			return
		}

		let imageUrls = location.state?.image || [];

		const promisesArray = [];

		for (let i = 0; i < image.length; i++) {
			promisesArray[i] = mediaUpload(image[i]);
		}
		try {
			const isNewImagesSelected = image.length > 0;
			if (isNewImagesSelected) {
				imageUrls = await Promise.all(promisesArray);
			}



			const altNamesArray = altNames.split(",")

			const product = {
				productId: productId,
				name: name,
				altNames: altNamesArray,
				description: description,
				image: imageUrls,
				labelledPrice: labelledPrice,
				price: price,
				stock: stock,
			}

			axios.put(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId, product, {
				headers: {
					"Authorization": "Bearer " + token
				}
			}).then(() => {
				toast.success("Product updated successfully")
				navigate("/admin/products")
			}).catch((e) => {
				toast.error(e.response.data.message)
			})

		} catch (e) {
			console.log(e);
		}
	}
	return (
		<div className="w-full h-full flex flex-col justify-center items-center">
			<h1 className="text-3xl font-bold mb-4">Edit Product</h1>
			<input
				type="text"
				disabled
				placeholder="Product ID"
				className="input input-bordered w-full max-w-xs"
				value={productId}
				onChange={(e) => {
					setProductId(e.target.value);
				}}
			/>
			<input
				type="text"
				placeholder="Name"
				className="input input-bordered w-full max-w-xs"
				value={name}
				onChange={(e) => {
					setName(e.target.value);
				}}
			/>
			<input
				type="text"
				placeholder="Alt Names"
				className="input input-bordered w-full max-w-xs"
				value={altNames}
				onChange={(e) => {
					setAltNames(e.target.value);
				}}
			/>
			<input
				type="text"
				placeholder="Description"
				className="input input-bordered w-full max-w-xs"
				value={description}
				onChange={(e) => {
					setDescription(e.target.value);
				}}
			/>
			<input
				type="file"
				placeholder="Image"
				multiple
				className="input input-bordered w-full max-w-xs"
				onChange={(e) => {
					// setImages(e.target.files);
					setImage(Array.from(e.target.files));
				}}
			/>
			<input
				type="number"
				placeholder="Labelled Price"
				className="input input-bordered w-full max-w-xs"
				value={labelledPrice}
				onChange={(e) => {
					setLabelledPrice(e.target.value);
				}}
			/>
			<input
				type="number"
				placeholder="Price"
				className="input input-bordered w-full max-w-xs"
				value={price}
				onChange={(e) => {
					setPrice(e.target.value);
				}}
			/>
			<input
				type="number"
				placeholder="Stock"
				className="input input-bordered w-full max-w-xs"
				value={stock}
				onChange={(e) => {
					setStock(e.target.value);
				}}
			/>
			<div className="w-full flex justify-center flex-row items-center mt-4">
				<Link
					to="/admin/products"
					className="bg-red-500 text-white font-bold py-2 px-4 rounded mr-4"
				>
					Cancel
				</Link>
				<button
					className="bg-green-500 text-white font-bold py-2 px-4 rounded"
					onClick={updateProduct}
				>
					Update Product
				</button>
			</div>
		</div>
	);
}
