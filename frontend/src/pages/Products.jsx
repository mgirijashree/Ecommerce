import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import Cart from "../components/Cart";
import CartSuccessModal from "../components/CartSuccessModal";
import { useNavigate } from "react-router-dom";
import Recommendations from "../components/Recommendations";

export default function Products({
    cartItems,
    onAddToCart,
    isCartOpen,
    setIsCartOpen,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    searchTerm, 
    setSearchTerm,
}) {
    const navigate = useNavigate();
    const [showCartModal, setShowCartModal] = useState(false);
    
    // Original data from API
    const [products, setProducts] = useState([]);
    // State to hold results after filtering
    const [filteredProducts, setFilteredProducts] = useState([]);
    
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch Categories
    useEffect(() => {
        api.get("categories/")
            .then((response) => setCategories(response.data.categories || response.data))
            .catch((error) => console.log(error));
    }, []);

    // Fetch Products
    useEffect(() => {
        setLoading(true);
        let url = selectedCategory ? `products/?category=${selectedCategory}` : "products/";
        
        api.get(url)
            .then((response) => {
                const data = response.data.products || response.data;
                setProducts(data);
                setFilteredProducts(data); // Initialize filtered list
                setLoading(false);
            })
            .catch((error) => {
                setError("Unable to load products.");
                setLoading(false);
            });
    }, [selectedCategory]);

    // Debounced Search Logic (Requirements 4, 5, 8, 9, 10)
    useEffect(() => {
        const handler = setTimeout(() => {
            const lowerTerm = searchTerm.toLowerCase();
            
            const results = products.filter((product) => {
                const nameMatch = product.name?.toLowerCase().includes(lowerTerm);
                const descMatch = product.description?.toLowerCase().includes(lowerTerm);
                return nameMatch || descMatch;
            });
            
            setFilteredProducts(results);
        }, 500); // 500ms debounce delay

        return () => clearTimeout(handler); // Clear timeout on re-render
    }, [searchTerm, products]);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <h1 className="text-4xl font-bold mb-6">Our Jewelry Collection</h1>

                <input
                    type="text"
                    placeholder="Search Products..."
                    className="w-full border rounded-lg p-3 mb-6"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <CategoryFilter
                    categories={categories}
                    selected={selectedCategory}
                    setSelected={setSelectedCategory}
                />

                {loading && <div className="text-center text-xl mt-10">Loading Products...</div>}
                {error && <div className="text-red-600 text-center mt-5">{error}</div>}

                {!loading && (
                    <>
                        {/* Requirement 7: No Results Message */}
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8">
                                {filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onAddToCart={(product) => {
                                            onAddToCart(product);
                                            setShowCartModal(true);
                                        }}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10 text-xl text-gray-600">
                                No products found.
                            </div>
                        )}

                        <CartSuccessModal
                            show={showCartModal}
                            onClose={() => setShowCartModal(false)}
                            onGoToCart={() => {
                                setShowCartModal(false);
                                navigate("/cart");
                            }}
                        />

                        {filteredProducts.length > 0 && products.slice(0, 4).length > 0 && (
                            <div className="mt-12">
                                <Recommendations products={products.slice(0, 4)} />
                            </div>
                        )}
                    </>
                )}

                {isCartOpen && (
                    <Cart
                        cartItems={cartItems}
                        increaseQuantity={increaseQuantity}
                        decreaseQuantity={decreaseQuantity}
                        removeItem={removeItem}
                        onCheckout={() => alert("Proceed to Checkout")}
                    />
                )}
            </div>
        </div>
    );
}