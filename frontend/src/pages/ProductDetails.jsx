import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import CartSuccessModal from "../components/CartSuccessModal";

export default function ProductDetails() {
  const { id } = useParams();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    api.get(`products/${id}/`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) {
    return (
      <div className="text-center py-20 text-2xl">
        Loading product...
      </div>
    );
  }

  const image =
    product.image?.startsWith("http")
      ? product.image
      : `http://127.0.0.1:8000${product.image}`;

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">

      <div className="grid lg:grid-cols-2 gap-12">

        {/* Product Image */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

          <img
            src={image}
            alt={product.name}
            className="w-full h-[600px] object-cover hover:scale-105 transition duration-500"
          />

        </div>

        {/* Product Details */}
        <div>

          <p className="text-amber-700 font-semibold uppercase">
            {product.category?.name}
          </p>

          <h1 className="text-5xl font-bold mt-3">
            {product.name}
          </h1>

          <p className="text-3xl text-amber-700 font-bold mt-6">
            ₹{product.price}
          </p>

          <p className="text-gray-600 mt-8 leading-8">
            {product.description}
          </p>

          <div className="mt-8">

            <span className="font-semibold">
              Availability :
            </span>

            {product.stock > 0 ? (
              <span className="text-green-600 ml-2">
                In Stock ({product.stock})
              </span>
            ) : (
              <span className="text-red-600 ml-2">
                Out of Stock
              </span>
            )}

          </div>

          {/* Quantity */}
          <div className="mt-8">

            <label className="font-semibold">
              Quantity
            </label>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border rounded-xl w-24 p-3 block mt-2"
            />

          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-10">

            <button

              onClick={() => {
                addToCart(product);
                setShowModal(true);
              }}

              className="
                  bg-amber-700
                  text-white
                  px-8
                  py-3
                  rounded-xl
                  hover:bg-amber-800
                  transition
                  "

            >

              Add To Cart

            </button>

            <Link
              to="/shop"
              className="border border-amber-700 text-amber-700 px-10 py-4 rounded-xl hover:bg-amber-50 transition"
            >
              Back
            </Link>

          </div>

        </div>

      </div>

      {
        showModal && (

          <CartSuccessModal

            product={product}

            close={() => setShowModal(false)}

          />

        )
      }

    </div>


  );

}