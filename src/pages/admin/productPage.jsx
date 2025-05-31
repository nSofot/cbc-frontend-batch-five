import { useEffect, useState } from "react";
// import { sampleProducts } from "../../assets/sampleData";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
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
			});
	}, [location]);



	function deleteProduct(productId) {
		const token = localStorage.getItem("token");
		if (token == null) {
			toast.error("Please login first");
			return;
		}
		axios
			.delete(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId, {
				headers: {
					Authorization: "Bearer " + token,
				},
			})
			.then(() => {
				toast.success("Product deleted successfully");
				setIsLoading(true);
			})
			.catch((e) => {
				toast.error(e.response.data.message);
			});
	}


	return (
		<div className="w-full h-full flex flex-col p-3">

            <div className='w-full'>
                <div className='w-full h-12 flex justify-between items-center pl-3 pr-3'>
                    <div className='w-40% h-full flex flex-col items-start'>
                        <h1 className='text-lg text-#343a40 font-semibold'>Products</h1>
                        <p className='text-xs'>Manage products</p>
                    </div>

                    <Link
                        to="/admin/add-product"
                        className="text-sm cursor-pointer bg-green-600 shadow-xl text-white py-1 px-4 rounded-md text-center flex justify-center items-center hover:bg-green-700">
                        +  Add new product
                    </Link> 
                </div>
            </div>			


			<div className="w-full h-screen max-h-full bg-white rounded-md shadow-md max-h-full overflow-y-scroll p-3 mt-2">
				{isLoading ? <LoadingSpinner /> :
					<table className="w-full text-sm text-left p-3">
						<thead className="h-7 w-full text-white text-sm font-normal bg-green-600 ml-3">
							<tr>
								<th>Image</th>
								<th>Product ID</th>
								<th>Name</th>
								<th>Labelled Price</th>
								<th>Price</th>
								<th>Stock</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200">
							{products.map((item, index) => {
								return (
									<tr key={index} className="h-15 hover:bg-green-100 cursor-pointer">
										<td>
											<img src={item.image[0]} className="w-[50px] h-[50px] rounded-md" />
										</td>
										<td>{item.productId}</td>
										<td>{item.name}</td>
										<td>{item.labelledPrice}</td>
										<td>{item.price}</td>
										<td>{item.stock}</td>
										<td>
											<div className="flex justify-center items-center w-full">
												<FaTrash
													className="text-[20px] text-red-500 mx-2 cursor-pointer"
													onClick={() => {
														deleteProduct(item.productId);
													}}
												/>
												<FaEdit
													onClick={() => {
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
														});

													}}
													className="text-[20px] text-blue-500 mx-2 cursor-pointer"
												/>
											</div>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>				
				}
			</div>
		</div>

	);
}
