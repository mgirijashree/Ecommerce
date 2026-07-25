import { X } from "lucide-react";

function Sidebar({ isOpen, closeSidebar }) {
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
          transform transition-transform duration-300

          ${isOpen ? "translate-x-0" : "-translate-x-full"}

          lg:translate-x-0
        `}
      >
        <div className="flex justify-between items-center p-5 border-b">

          <h1 className="text-2xl font-bold text-yellow-700">
            Jewelry
          </h1>

          <button
            className="lg:hidden"
            onClick={closeSidebar}
          >
            <X size={28} />
          </button>

        </div>

        <nav className="flex flex-col">

          <a href="#" className="px-6 py-4 hover:bg-yellow-100">
            Home
          </a>

          <a href="#" className="px-6 py-4 hover:bg-yellow-100">
            Rings
          </a>

          <a href="#" className="px-6 py-4 hover:bg-yellow-100">
            Earrings
          </a>

          <a href="#" className="px-6 py-4 hover:bg-yellow-100">
            Necklace
          </a>

          <a href="#" className="px-6 py-4 hover:bg-yellow-100">
            Watches
          </a>

        </nav>
      </aside>
    </>
  );
}

export default Sidebar;