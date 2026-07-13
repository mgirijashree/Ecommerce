import { ShoppingCart, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header({
  cartItems = [],
  toggleSidebar,
  searchTerm,
  setSearchTerm,
}) {

  const navigate = useNavigate();

  return (
    <header
      className="
        w-full
        bg-white
        shadow-md
        px-3
        sm:px-6
        py-3
        flex
        items-center
        gap-3
      "
    >

      {/* Mobile Menu */}
      <button
        className="lg:hidden shrink-0"
        onClick={toggleSidebar}
      >
        <Menu size={26} />
      </button>


      {/* Logo */}
      <h1
        className="
          text-xl
          sm:text-2xl
          lg:text-3xl
          font-bold
          whitespace-nowrap
        "
      >
        Jewelry Store
      </h1>


      {/* Global Search */}
      <div className="flex-1">

        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            navigate("/products");
          }}
          className="
            w-full
            border
            rounded-lg
            px-3
            py-2
            text-sm
            sm:text-base
          "
        />

      </div>


      {/* Login Button */}
      <button
        onClick={() => navigate("/login")}
        className="
          hidden
          sm:block
          bg-blue-600
          text-white
          px-4
          py-2
          rounded-lg
          hover:bg-blue-700
          transition
        "
      >
        Login
      </button>


      {/* Mobile Login */}
      <button
        onClick={() => navigate("/login")}
        className="
          sm:hidden
          text-blue-600
          font-semibold
        "
      >
        Login
      </button>


      {/* Cart */}
      <button
        className="
          relative
          shrink-0
        "
        onClick={() => navigate("/cart")}
      >

        <ShoppingCart size={26} />

        <span
          className="
            absolute
            -top-2
            -right-2
            bg-red-500
            text-white
            rounded-full
            w-5
            h-5
            text-xs
            flex
            items-center
            justify-center
          "
        >
          {cartItems.length}
        </span>

      </button>


    </header>
  );
}