import { Link } from "react-router-dom";
import { X } from "lucide-react";

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="
            fixed
            inset-0
            bg-black/40
            z-40
            lg:hidden
          "
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed
          top-0
          left-0
          z-50
          h-screen
          w-64
          bg-white
          shadow-lg
          transition-transform
          duration-300
          
          ${isOpen 
            ? "translate-x-0" 
            : "-translate-x-full"
          }

          lg:static
          lg:translate-x-0
          lg:h-screen
        `}
      >

        {/* Header */}
        <div className="
          flex
          items-center
          justify-between
          p-5
          border-b
        ">

          <div className="
            text-2xl
            sm:text-3xl
            font-bold
          ">
            Bazaar
          </div>


          <button
            onClick={toggleSidebar}
            className="
              lg:hidden
              p-2
              rounded-full
              hover:bg-gray-100
            "
          >
            <X size={22}/>
          </button>

        </div>


        {/* Navigation */}
        <nav className="flex flex-col mt-4">

          <Link
            onClick={() => isOpen && toggleSidebar()}
            className="
              px-5
              py-3
              hover:bg-gray-100
              transition
            "
            to="/"
          >
            Home
          </Link>


          <Link
            onClick={() => isOpen && toggleSidebar()}
            className="
              px-5
              py-3
              hover:bg-gray-100
              transition
            "
            to="/products"
          >
            Shop
          </Link>


          <Link
            onClick={() => isOpen && toggleSidebar()}
            className="
              px-5
              py-3
              hover:bg-gray-100
              transition
            "
            to="/login"
          >
            Login
          </Link>


          <Link
            onClick={() => isOpen && toggleSidebar()}
            className="
              px-5
              py-3
              hover:bg-gray-100
              transition
            "
            to="/register"
          >
            Register
          </Link>

        </nav>

      </aside>
    </>
  );
}