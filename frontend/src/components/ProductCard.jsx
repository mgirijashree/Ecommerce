export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="
      bg-white 
      rounded-xl 
      shadow-md 
      overflow-hidden
      border
      border-gray-200
      transition-all
      duration-300
      hover:shadow-2xl
      hover:-translate-y-2
    ">

      <img
        src={`http://127.0.0.1:8000${product.image}`}
        alt={product.name}
        className="
          w-full
          h-56
          object-cover
        "
      />

      <div className="p-5">

        <h3 className="
          text-xl
          font-bold
          text-gray-800
        ">
          {product.name}
        </h3>

        <p className="
          text-green-600
          font-bold
          text-lg
          mt-2
        ">
          ₹ {product.price}
        </p>


        <button
          onClick={() => onAddToCart(product)}
          className="
            mt-4
            w-full
            bg-blue-600
            text-white
            py-2
            rounded-lg
            hover:bg-blue-700
            transition
          "
        >
          Add to Cart
        </button>

      </div>

    </div>
  );
}