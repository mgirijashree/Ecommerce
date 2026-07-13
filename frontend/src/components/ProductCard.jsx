export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 
                    transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">

      {/* Responsive Image Container */}
      <div className="w-full h-64 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      <div className="p-4">
        <h2 className="font-bold text-xl mb-1">
          {product.name}
        </h2>

        <p className="text-gray-500 text-sm mb-2 uppercase tracking-wide">
          {product.category_name}
        </p>

        <p className="text-gray-700 line-clamp-2">
          {product.description}
        </p>

        <p className="text-2xl font-semibold text-gray-900 mt-2">
          ₹ {product.price}
        </p>

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