import React from "react";

export default function Recommendations({ products }) {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-6">
        Recommended Products
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow"
          >
            <img
              src={`http://127.0.0.1:8000${product.image}`}
              alt={product.name}
              className="w-full h-40 object-cover rounded"
            />

            <h3 className="mt-3 font-semibold">
              {product.name}
            </h3>

            <p className="text-pink-600 font-bold">
              ₹{product.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}