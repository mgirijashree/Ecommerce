export default function ProductCard({ product, onAddToCart }) {
  return (
    // Added transition-all, duration-300, and hover effects to the container
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 
                    transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">

      {/* Container for image to handle overflow and scale effect */}
      <div className="overflow-hidden">
        <img
          src={`https://ecommerce-7jru.onrender.com/media/${product.image}`}
          alt={product.name}
        />
      </div>

      <div className="p-4">
        <h2 className="font-bold text-xl mb-1">{product.name}</h2>
        <p className="text-gray-500 text-sm mb-2 uppercase tracking-wide">
          {product.category}
        </p>
        <p>{product.description}</p>
        <p className="text-2xl font-semibold text-gray-900">
          ₹ {product.price}
        </p>

        {/* Added transition and active scale effect to the button */}
        <button
          onClick={() => onAddToCart(product)}
          className="bg-black text-white w-full mt-4 py-2 rounded-lg font-medium
                     transition-all duration-200 hover:bg-gray-800 active:scale-95"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}