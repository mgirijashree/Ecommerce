import { Link } from "react-router-dom";

export default function ProductCard({ product }) {

    const image =
        product.image?.startsWith("http")
            ? product.image
            : `https://ecommerce-7jru.onrender.com${product.image}`;

    return (

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition">

            <img
                src={image}
                alt={product.name}
                className="w-full h-64 object-cover"
            />

            <div className="p-5">

                <h3 className="font-bold text-xl">
                    {product.name}
                </h3>

                <p className="text-amber-700 font-bold mt-2">
                    ₹{product.price}
                </p>

                <Link
                    to={`/product/${product.id}`}
                    className="block mt-4 bg-amber-700 text-white text-center py-3 rounded-xl hover:bg-amber-800"
                >
                    View Product
                </Link>

            </div>

        </div>

    );
}