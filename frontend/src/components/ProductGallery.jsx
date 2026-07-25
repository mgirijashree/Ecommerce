import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";


function ProductGallery({ onAddToCart }) {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        axios
        .get("https://ecommerce-7jru.onrender.com/products/")
        .then((response) => {

            setProducts(response.data.products);

        })
        .catch((error) => {

            console.log(error);

        });

    }, []);


    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {products.map((product) => (

                <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                />

            ))}

        </div>

    );
}

export default ProductGallery;