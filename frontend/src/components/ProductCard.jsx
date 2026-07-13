export default function ProductCard({ product, onAddToCart }) {

  const imageUrl = product.image
    ? `http://127.0.0.1:8000${product.image}`
    : "/no-image.png";

  return (
    <div className="
      bg-white
      rounded-xl
      shadow-md
      overflow-hidden
      border
      border-gray-200
      transition
      duration-300
      hover:shadow-xl
      hover:-translate-y-1
    ">

      <img
        src={imageUrl}
        alt={product.name}
        className="
          w-full
          h-48
          sm:h-56
          md:h-64
          object-cover
        "
      />

      <div className="p-4">

        <h2 className="
          text-lg
          sm:text-xl
          font-semibold
          text-gray-800
        ">
          {product.name}
        </h2>

        <p className="
          text-green-600
          font-bold
          mt-2
        ">
          ₹{product.price}
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
          "
        >
          Add To Cart
        </button>

      </div>

    </div>
  );
}