import { Menu, ShoppingBag, LogOut, User } from "lucide-react";

function Header({ openSidebar, user, onLogout, cartCount, setActivePage }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-white border-b shadow-sm lg:ml-64">
      {/* Mobile Menu Trigger */}
      <button
        onClick={openSidebar}
        className="p-2 text-gray-700 rounded-lg lg:hidden hover:bg-yellow-100"
        aria-label="Open Sidebar"
      >
        <Menu size={24} />
      </button>

      {/* Title */}
      <div className="flex items-center gap-4">
        <span className="text-lg font-semibold text-gray-800">Jewelry Store</span>
      </div>

      {/* Right side: User Profile, Cart, and Logout */}
      <div className="flex items-center gap-4">
        {/* Cart Icon Shortcut */}
        <button 
          onClick={() => setActivePage("cart")}
          className="relative p-2 text-gray-700 rounded-full hover:bg-yellow-100"
          title="Go to Cart"
        >
          <ShoppingBag size={22} />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 w-4 h-4 text-xs text-white bg-yellow-600 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>

        {/* Logged-in User Display */}
        <div className="hidden sm:flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
          <div className="w-7 h-7 bg-yellow-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
            {user?.name ? user.name.charAt(0).toUpperCase() : <User size={14} />}
          </div>
          <span className="text-sm font-medium text-gray-700">
            {user?.name || "Guest User"}
          </span>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Logout"
        >
          <LogOut size={18} />
          <span className="hidden md:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}

export default Header;