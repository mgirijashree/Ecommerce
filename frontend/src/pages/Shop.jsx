import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownUp } from "lucide-react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
      <div className="w-full h-64 bg-gray-200" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-10 bg-gray-200 rounded-xl mt-4" />
      </div>
    </div>
  );
}

const gridContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const SORT_OPTIONS = [
  { value: "default", label: "Sort By: Featured" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "name_asc", label: "Name: A to Z" },
  { value: "name_desc", label: "Name: Z to A" },
  { value: "newest", label: "Newest First" },
];

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categoryList, setCategoryList] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(
    searchParams.get("category") || "All"
  );
  const [sort, setSort] = useState(searchParams.get("sort") || "default");

  // Fetch products once on mount.
  useEffect(() => {
    setLoading(true);
    setError("");

    api
      .get("products/")
      .then((res) => {
        setProducts(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.log("API Error:", err);
        setError("Couldn't load products right now. Please try again.");
        setLoading(false);
      });
  }, []);

  // Fetch the real category list from the backend, so the filter dropdown
  // (and the homepage category cards) always match actual product data.
  useEffect(() => {
    api
      .get("categories/")
      .then((res) => setCategoryList(Array.isArray(res.data) ? res.data : []))
      .catch((err) => console.log("Category fetch error:", err));
  }, []);

  // Keep local state in sync if the URL changes (e.g. a category card on
  // the homepage, or the AI Assistant, navigates here with new params).
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setCategory(searchParams.get("category") || "All");
    setSort(searchParams.get("sort") || "default");
  }, [searchParams]);

  // Prefer the dedicated categories endpoint; fall back to deriving names
  // from the loaded products if that request hasn't resolved yet/failed.
  const categories = useMemo(() => {
    if (categoryList.length > 0) {
      return ["All", ...categoryList.map((c) => c.name)];
    }

    const names = products.map((p) => p.category?.name).filter(Boolean);

    return ["All", ...Array.from(new Set(names)).sort()];
  }, [categoryList, products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (category !== "All") {
      result = result.filter((item) => item.category?.name === category);
    }

    if (search.trim() !== "") {
      const q = search.trim().toLowerCase();
      result = result.filter((item) =>
        (item.name || "").toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case "price_asc":
        result.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "price_desc":
        result.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case "name_asc":
        result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        break;
      case "name_desc":
        result.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
        break;
      case "newest":
        result.sort((a, b) => (b.id || 0) - (a.id || 0));
        break;
      default:
        break;
    }

    return result;
  }, [products, category, search, sort]);

  const updateParam = (key, value, fallback) => {
    const next = new URLSearchParams(searchParams);

    if (value && value !== fallback) next.set(key, value);
    else next.delete(key);

    setSearchParams(next, { replace: true });
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    updateParam("search", value, "");
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    updateParam("category", value, "All");
  };

  const handleSortChange = (value) => {
    setSort(value);
    updateParam("sort", value, "default");
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <motion.h1
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-bold text-center mb-10"
      >
        Shop Jewellery
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid md:grid-cols-3 gap-5 mb-6"
      >
        <input
          type="text"
          placeholder="Search jewellery..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="border rounded-xl p-4 transition focus:ring-2 focus:ring-amber-500 outline-none"
        />

        <select
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="border rounded-xl p-4 transition focus:ring-2 focus:ring-amber-500 outline-none"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <div className="relative">
          <ArrowDownUp
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <select
            value={sort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full border rounded-xl p-4 pl-10 transition focus:ring-2 focus:ring-amber-500 outline-none appearance-none"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {!loading && !error && (
        <p className="text-sm text-gray-500 mb-8">
          Showing {filteredProducts.length} of {products.length} products
          {category !== "All" && <> in "{category}"</>}
          {search && <> matching "{search}"</>}
        </p>
      )}

      {loading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {!loading && error && (
        <p className="text-center text-red-500 py-16">{error}</p>
      )}

      <AnimatePresence mode="wait">
        {!loading && !error && filteredProducts.length === 0 && (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-gray-500 py-16"
          >
            No products found. Try a different search term or category.
          </motion.p>
        )}

        {!loading && !error && filteredProducts.length > 0 && (
          <motion.div
            key={`${search}-${category}-${sort}`}
            variants={gridContainer}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
