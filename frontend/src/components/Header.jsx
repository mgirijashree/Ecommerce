import { Menu, ShoppingCart, Heart, Search } from "lucide-react";

function Header({ cartItems, onCartClick, openSidebar }) {

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <header className="sticky top-0 z-30 bg-white shadow">

      <div className="flex justify-between items-center px-6 py-4">

        <div className="flex items-center gap-4">

          <button
            onClick={openSidebar}
            className="lg:hidden"
          >
            <Menu size={28} />
          </button>

          <h1 className="text-2xl font-bold">
            Jewelry Store
          </h1>

        </div>

        <div className="flex items-center gap-5">

          <Search className="cursor-pointer" />

          <Heart className="cursor-pointer" />

          <div
            className="relative cursor-pointer"
            onClick={onCartClick}
          >
            <ShoppingCart />

            <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full h-5 w-5 flex justify-center items-center text-xs">

              {totalItems}

            </span>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Header;