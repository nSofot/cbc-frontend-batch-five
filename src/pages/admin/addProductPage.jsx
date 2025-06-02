import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import axios from "axios";

export default function AddProductPage() {
  const navigate = useNavigate();

  // Form states
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [altNames, setAltNames] = useState([]);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [labelledPrice, setLabelledPrice] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  // Form submission
  const handleAddProduct = async () => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Please log in first.");

    if (!productId || !name || !description || !labelledPrice || !price || !stock) {
      return toast.error("Please fill in all fields.");
    }

    if (images.length === 0) {
      return toast.error("Please select at least one product image.");
    }

    try {
      // Upload images
      const imageUrls = await Promise.all(
        Array.from(images).map((img) => mediaUpload(img))
      );

      // Prepare product object
      const newProduct = {
        productId,
        name,
        altName: altNames,
        description,
        image: imageUrls,
        labelledPrice: Number(labelledPrice),
        price: Number(price),
        stock: Number(stock),
      };

      // Send to backend
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/`,
        newProduct,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Product added successfully!");
      navigate("/admin/products");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white w-full max-w-2xl p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Add New Product
        </h1>

        <div className="space-y-5">
          {/* Product ID */}
          <InputField
            label="Product ID"
            value={productId}
            onChange={setProductId}
          />

          {/* Name */}
          <InputField
            label="Product Name"
            value={name}
            onChange={setName}
          />

          {/* Alternate Names */}
          <InputField
            label="Alternate Names (comma-separated)"
            value={altNames.join(",")}
            onChange={(val) => setAltNames(val.split(",").map((name) => name.trim()))}
          />

          {/* Description */}
          <TextAreaField
            label="Description"
            value={description}
            onChange={setDescription}
          />

          {/* Pricing */}
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Labelled Price"
              type="number"
              value={labelledPrice}
              onChange={setLabelledPrice}
            />
            <InputField
              label="Selling Price"
              type="number"
              value={price}
              onChange={setPrice}
            />
          </div>

          {/* Stock */}
          <InputField
            label="Stock Quantity"
            type="number"
            value={stock}
            onChange={setStock}
          />

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Images
            </label>
            <input
              type="file"
              multiple
              className="file-input file-input-bordered w-full"
              onChange={(e) => setImages(e.target.files)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-8">
            <Link
              to="/admin/products"
              className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Cancel
            </Link>
            <button
              onClick={handleAddProduct}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Input Field Component
function InputField({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        className="input input-bordered w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

// Reusable TextArea Field Component
function TextAreaField({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        rows="3"
        className="textarea textarea-bordered w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
