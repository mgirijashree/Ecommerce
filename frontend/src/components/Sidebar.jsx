import { useState, useEffect } from "react";
import { X, ShoppingBag, Truck, Home, Tag } from "lucide-react";

function Sidebar({ isOpen, closeSidebar, selectedCategory, onSelectCategory, activePage, setActivePage }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://ecommerce-7jru.onrender.com/api/categories/")
      .then((response) => response.json())
      .then((data) => {
        setCategories([{ id: "", name: "All Products", slug: "" }, ...data]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0
          h-screen w-64
          bg-white
          shadow-xl
          z-50
          transform transition-transform duration-300 flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Brand Header */}
        <div className="flex justify-between items-center p-5 border-b">
          <h1 className="text-2xl font-bold text-yellow-700">
            Jewelry
          </h1>
          <button className="lg:hidden" onClick={closeSidebar}>
            <X size={28} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col mt-2 flex-1 overflow-y-auto">
          {/* General Views */}
          <button
            onClick={() => { setActivePage("shop"); if (closeSidebar) closeSidebar(); }}
            className={`flex items-center gap-3 px-6 py-4 text-left transition-colors ${
              activePage === "shop" ? "bg-yellow-100 font-semibold text-yellow-900 border-l-4 border-yellow-700" : "hover:bg-yellow-50 text-gray-700"
            }`}
          >
            <Home size={20} /> Shop
          </button>

          <button
            onClick={() => { setActivePage("cart"); if (closeSidebar) closeSidebar(); }}
            className={`flex items-center gap-3 px-6 py-4 text-left transition-colors ${
              activePage === "cart" ? "bg-yellow-100 font-semibold text-yellow-900 border-l-4 border-yellow-700" : "hover:bg-yellow-50 text-gray-700"
            }`}
          >
            <ShoppingBag size={20} /> Cart Page
          </button>

          <button
            onClick={() => { setActivePage("track-orders"); if (closeSidebar) closeSidebar(); }}
            className={`flex items-center gap-3 px-6 py-4 text-left transition-colors ${
              activePage === "track-orders" ? "bg-yellow-100 font-semibold text-yellow-900 border-l-4 border-yellow-700" : "hover:bg-yellow-50 text-gray-700"
            }`}
          >
            <Truck size={20} /> Track Orders
          </button>

          <hr className="my-2 border-gray-200" />
          <p className="px-6 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Categories</p>

          {/* Dynamic Categories */}
          {loading ? (
            <p className="px-6 py-2 text-gray-400 text-sm">Loading categories...</p>
          ) : (
            categories.map((category) => {
              const isActive = activePage === "shop" && selectedCategory === category.slug;
              
              return (
                <button
                  key={category.id || "all"}
                  onClick={() => {
                    setActivePage("shop");
                    onSelectCategory(category.slug);
                    if (closeSidebar) closeSidebar();
                  }}
                  className={`flex items-center gap-3 px-6 py-3 text-left text-sm transition-colors ${
                    isActive
                      ? "bg-yellow-200 font-semibold text-yellow-900 border-l-4 border-yellow-700"
                      : "hover:bg-yellow-50 text-gray-600"
                  }`}
                >
                  <Tag size={16} /> {category.name}
                </button>
              );
            })
          )}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;