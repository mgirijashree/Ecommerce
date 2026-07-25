import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function ProductGallery({ onAddToCart }) {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    fetch("https://ecommerce-7jru.onrender.com/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data));

  }, []);

  return (

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

      {products.map((product) => (

        <ProductCard

          key={product.id}

          product={product}

        />

      ))}

    </div>

  );

}

export default ProductGallery;