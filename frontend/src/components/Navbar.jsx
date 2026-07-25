import { Link } from "react-router-dom";
import { Menu, Search, ShoppingCart, Heart, User } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const { cart } = useCart();

  return (
    <>
      {/* Top Announcement */}
      <div className="bg-amber-700 text-white text-center py-2 text-sm">
        ✨ Welcome to Happy Accessories | Free Shipping on Orders Above ₹999
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="text-3xl font-bold text-amber-700">
            Happy Accessories
          </Link>

          {/* Desktop Menu */}
          <div className="flex items-center gap-6 text-gray-700 font-medium">
            <Link to="/" className="hover:text-yellow-700">
              Home
            </Link>

            <Link to="/shop" className="hover:text-yellow-700">
              Shop
            </Link>

            <Link to="/about" className="hover:text-yellow-700">
              About
            </Link>

            <Link to="/contact" className="hover:text-yellow-700">
              Contact
            </Link>

            <Link to="/track-order" className="hover:text-yellow-700">
              Track Order
            </Link>
          </div>

          {/* Search */}
          <div className="hidden lg:flex items-center border rounded-full px-3 py-2 w-72">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search jewellery..."
              className="ml-2 outline-none w-full"
            />
          </div>

          {/* Icons */}
          <div className="relative cursor-pointer">
            <Link to="/cart">
              <ShoppingCart />
            </Link>

            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cart.length}
              </span>
            )}
          </div>

          {/* Mobile Menu */}
          <button
            className="lg:hidden"
            onClick={() => setOpen(!open)}
          >
            <Menu size={28} />
          </button>

        </div>
      </header>

      {/* Mobile Sidebar */}
      {open && (
        <div className="fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 p-6">

          <button
            className="text-2xl mb-6"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>

          <div className="flex flex-col gap-5 text-lg">

            <Link to="/" onClick={() => setOpen(false)}>Home</Link>

            <Link to="/shop" onClick={() => setOpen(false)}>Shop</Link>

            <Link to="/about" onClick={() => setOpen(false)}>About</Link>

            <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>

            <hr />

            <Link to="/cart" onClick={() => setOpen(false)}>
              Cart
            </Link>

          </div>
        </div>
      )}
    </>
  );
}