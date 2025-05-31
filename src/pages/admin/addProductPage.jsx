import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import axios from "axios";

export default function AddProductPage() {
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [altName, setAltName] = useState([]);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);
  const [labelledPrice, setLabelledPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  const navigate = useNavigate();

  async function AddProducts() {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first");
      return;
    }

    if (image.length <= 0) {
      toast.error("Please select at least one image");
      return;
    }

    try {
      const imageUrls = await Promise.all(
        Array.from(image).map((img) => mediaUpload(img))
      );

      const product = {
        productId,
        name,
        altName,
        description,
        image: imageUrls,
        labelledPrice,
        price,
        stock,
      };

      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/products/",
        product,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      toast.success("Product Added Successfully");
      navigate("/admin/products");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-100 to-gray-200 p-4">
      <div className="bg-white w-full max-w-2xl p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Add New Product
        </h2>

        <div className="grid grid-cols-1 gap-6">
          {/* Product Info Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product ID
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alternate Names (comma-separated)
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={altName.join(",")}
              onChange={(e) => setAltName(e.target.value.split(","))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="textarea textarea-bordered w-full"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Pricing Section */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Labelled Price
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                value={labelledPrice}
                onChange={(e) => setLabelledPrice(Number(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Selling Price
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stock Quantity
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Images
            </label>
            <input
              type="file"
              multiple
              className="file-input file-input-bordered w-full"
              onChange={(e) => setImage(e.target.files)}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-6">
            <Link
              to="/admin/products"
              className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Cancel
            </Link>
            <button
              onClick={AddProducts}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}




// import { useState } from "react";
// import toast from "react-hot-toast";
// import { Link, useNavigate } from "react-router-dom";
// import mediaUpload from "../../utils/mediaUpload";
// import axios from "axios";

// export default function AddProductPage() {

//     const [productId, setProductId] = useState("");
//     const [name, setName] = useState("");
//     const [altName, setAltName] = useState([]);
//     const [description, setDescription] = useState("");
//     const [image, setImage] = useState([]);
//     const [labelledPrice, setLabelledPrice] = useState(0);
//     const [price, setPrice] = useState(0);
//     const [stock, setStock] = useState(0);

//     const navigate = useNavigate()

//     async function AddProducts(e){

//         const token = localStorage.getItem("token")

//         if(token === null){
//             toast.error("Please login first")
//             return
//         }

//         if(image.length <= 0){
//             toast.error("Please select at least one image")
//             return
//         }

//         const promisesArray = []

//         for (let i = 0; i < image.length; i++) {
//             promisesArray[i] = mediaUpload(image[i])
//         }
//         try{

//             const imageUrls = await Promise.all(promisesArray)
//             const altNames = altName

//             const product={
//                 productId: productId,
//                 name: name,
//                 altName: altNames,
//                 description: description,
//                 image: imageUrls,
//                 labelledPrice: labelledPrice,
//                 price: price,
//                 stock: stock
//             }

//             axios.post(import.meta.env.VITE_BACKEND_URL + "/api/products/", product, {
//                 headers: {
//                     Authorization: "Bearer "+token
//                 }
//             }).then((response) => {
//                 toast.success("Product Added Successfully")
//                 navigate("/admin/products")
//             }).catch((error) => {
//                 toast.error(error.response.data.message)
//             })

//         }catch(e){
//             console.log(e)
//         }
            
//     }


//     return (
//         <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
//             <h1>Add Product</h1>
//             <input type="text" placeholder="Product ID" className="input input-bordered w-full max-w-xs" value={productId} onChange={(e) => setProductId(e.target.value)} />
//             <input type="text" placeholder="Product Name" className="input input-bordered w-full max-w-xs" value={name} onChange={(e) => setName(e.target.value)} />
//             <input type="text" placeholder="Product Alt Name (comma separated)" className="input input-bordered w-full max-w-xs" value={altName.join(",")} onChange={(e) => setAltName(e.target.value.split(","))} />
//             <input type="text" placeholder="Product Description" className="input input-bordered w-full max-w-xs" value={description} onChange={(e) => setDescription(e.target.value)} />
//             <input type="number" placeholder="Labelled Price" className="input input-bordered w-full max-w-xs" value={labelledPrice} onChange={(e) => setLabelledPrice(Number(e.target.value))} />
//             <input type="number" placeholder="Price" className="input input-bordered w-full max-w-xs" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
//             <input type="number" placeholder="Stock" className="input input-bordered w-full max-w-xs" value={stock} onChange={(e) => setStock(Number(e.target.value))} />
//             <input type="file" multiple className="file-input file-input-bordered w-full max-w-xs" onChange={(e) => setImage((e.target.files))} />

//             <div className="w-full flex justify-center items-center mt-4 gap-4">
//                 <Link to="/admin/products" className="bg-red-500 text-white font-bold py-2 px-4 rounded">Cancel</Link>
//                 <button className="bg-green-500 text-white font-bold py-2 px-4 rounded" onClick={AddProducts}>Add Product</button>
//             </div> 
//         </div>

//     );
// }