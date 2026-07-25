import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    api.get("products/")
      .then((res) => {

        setProducts(res.data);

      })
      .catch((err) => {

        console.log(err);

      });

  }, []);

  return (

    <section className="max-w-7xl mx-auto py-20 px-6">

      <h2 className="text-4xl font-bold text-center mb-12">

        Featured Jewellery

      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

        {products.map(product => (

          <ProductCard
            key={product.id}
            product={product}
          />

        ))}

      </div>

    </section>

  );
}