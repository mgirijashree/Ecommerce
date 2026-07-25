function ProductCard({ product, onAddToCart }) {

    return (
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">

            <img
                src={`https://ecommerce-7jru.onrender.com${product.image}`}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg"
            />

            <h2 className="text-xl font-semibold mt-3">
                {product.name}
            </h2>

            <p className="text-sm text-gray-500">
                {product.category_name}
            </p>

            <p className="text-gray-600 mt-2">
                {product.description}
            </p>

            <p className="text-lg font-bold mt-3">
                ₹ {product.price}
            </p>

            <p className="text-sm">
                Stock: {product.stock}
            </p>

            <button
                onClick={() => onAddToCart(product)}
                className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800"
            >
                Add To Cart
            </button>

        </div>
    );
}

export default ProductCard;