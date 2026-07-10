import { ShoppingCart, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function Header({
  cartItems = [],
  setIsCartOpen,
  toggleSidebar,
  searchTerm,
  setSearchTerm,
}) {

  const navigate = useNavigate();


  return (
    <header className="flex items-center justify-between bg-white shadow-md px-6 py-4 gap-4">

      {/* Mobile Menu */}
      <button
        className="lg:hidden"
        onClick={toggleSidebar}
      >
        <Menu size={28} />
      </button>

      {/* Logo */}
      <h1 className="text-3xl font-bold whitespace-nowrap">
        Jewelry Store
      </h1>

      {/* Search Input - Visible on all screens */}
      <input
        type="text"
        placeholder="Search products..."
        className="flex-grow max-w-md border border-gray-300 rounded-lg p-2 
             transition-all duration-300 focus:outline-none focus:ring-2 
             focus:ring-green-500 focus:border-transparent"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Cart */}
      <button
        className="relative"
        onClick={() => navigate("/cart")}
      >
        <ShoppingCart size={28} />

        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
          {cartItems.length}
        </span>
      </button>

    </header>
  );
}