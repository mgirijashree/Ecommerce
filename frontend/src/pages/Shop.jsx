import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    api.get("products/")
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    let result = products;

    if (category !== "All") {
      result = result.filter(
        (item) =>
          item.category &&
          item.category.name === category
      );
    }

    if (search !== "") {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [search, category, products]);

  const categories = [
    "All",
    "Rings",
    "Earrings",
    "Bracelets",
    "Bangles",
    "Necklaces",
    "Hoops",
  ];

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">

      <h1 className="text-5xl font-bold text-center mb-10">
        Shop Jewellery
      </h1>

      <div className="grid md:grid-cols-2 gap-5 mb-10">

        <input
          type="text"
          placeholder="Search jewellery..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-xl p-4"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-xl p-4"
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

    </div>
  );
}