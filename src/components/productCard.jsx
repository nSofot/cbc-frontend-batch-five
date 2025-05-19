import "./productCard.css";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
    const {
        name,
        description,
        image,
        price,
        labelledPrice,
        stock,
        isAvailable
    } = product;

    const handleBuyNow = () => {
        // alert(`Proceeding to buy: ${name}`);
        // Replace with actual buy/checkout logic
    };

    return (
        <Link to={"/overview/"+product.productId} className="w-[300px] h-[440px] bg-white shadow-lg rounded-xl overflow-hidden m-2 flex flex-col transition-transform hover:scale-105 duration-300">
            {/* Product Image */}
            <div className="h-[50%] w-full bg-gray-100 flex items-center justify-center">
                <img
                    src={image?.[0] || "/placeholder.png"}
                    alt={name}
                    className="object-contain h-full"
                />
            </div>

            {/* Product Details */}
            <div className="p-4 flex flex-col justify-between flex-grow">
                <h2 className="text-base font-semibold truncate">{name}</h2>
                <p className="text-sm text-gray-600 mb-2 h-[42px] overflow-hidden">
                    {description || "No description available."}
                </p>

                {/* Price Section */}
                <div className="flex items-center space-x-2 mb-1">
                    {labelledPrice > price && (
                        <span className="text-sm text-gray-400 line-through">
                            Rs.{labelledPrice}
                        </span>
                    )}
                    <span className="text-base font-bold text-green-600">
                        Rs.{price}
                    </span>
                </div>

                {/* Stock & Buy Now */}
                <div className="flex items-center justify-between mt-auto">
                    <span className={`text-sm ${isAvailable && stock > 0 ? "text-green-500" : "text-red-500"}`}>
                        {isAvailable && stock > 0 ? `In Stock (${stock})` : "Out of Stock"}
                    </span>

                    <button
                        onClick={handleBuyNow}
                        className="text-sm bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                        disabled={!isAvailable || stock <= 0}
                    >
                        Buy Now
                    </button>
                </div>
            </div>
        </Link>
    );
}
