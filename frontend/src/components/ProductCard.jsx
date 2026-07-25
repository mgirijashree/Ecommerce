function ProductCard({ product, onAddToCart }) {

  return (

    <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition">

      <img
        src={`http://127.0.0.1:8000${product.image}`}
        alt={product.name}
        className="w-full h-64 md:h-72 object-cover"
      />

      <div className="p-4">

        <h2 className="text-xl font-bold">
          {product.name}
        </h2>

        <p className="text-gray-500 mt-2">
          {product.description}
        </p>

        <h3 className="text-amber-700 text-xl font-bold mt-3">
          ₹ {product.price}
        </h3>

        <button
          onClick={() => onAddToCart(product)}
          className="mt-5 w-full bg-black text-white py-2 rounded-lg hover:bg-amber-700"
        >
          Add To Cart
        </button>

      </div>

    </div>

  );

}

export default ProductCard;