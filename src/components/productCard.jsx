import "./productCard.css";

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

    return (
        <div className="w-[300px] h-[400px] bg-white shadow-lg rounded-xl overflow-hidden m-2 flex flex-col transition-transform hover:scale-105 duration-300">
            {/* Product Image */}
            <div className="h-1/2 w-full overflow-hidden bg-gray-100 flex items-center justify-center">
                <img
                    src={image?.[0] || "/placeholder.png"}
                    alt={name}
                    className="object-contain h-full"
                />
            </div>

            {/* Product Details */}
            <div className="p-4 flex flex-col justify-between flex-grow">
                <h2 className="text-lg font-semibold truncate">{name}</h2>
                <p className="text-sm text-gray-600 mb-2 h-[48px] overflow-hidden">
                    {description || "No description available."}
                </p>

                {/* Price Section */}
                <div className="flex items-center space-x-2 mb-2">
                    {labelledPrice > price && (
                        <span className="text-sm text-gray-400 line-through">
                            Rs.{labelledPrice}
                        </span>
                    )}
                    <span className="text-lg font-bold text-green-600">
                        Rs.{price}
                    </span>
                </div>

                {/* Stock Status */}
                <div className={`text-sm ${isAvailable && stock > 0 ? "text-green-500" : "text-red-500"}`}>
                    {isAvailable && stock > 0 ? `In Stock (${stock})` : "Out of Stock"}
                </div>
            </div>
        </div>
    );
}
