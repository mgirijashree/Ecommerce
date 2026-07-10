import { Link } from "react-router-dom";
import { X } from "lucide-react"; 

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <aside
      className={`bg-white w-60 h-screen fixed lg:static top-0 left-0 shadow transition-all duration-300 z-50 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      <div className="flex items-center justify-between p-6">
        <div className="text-3xl font-bold">Bazaar</div>
        
        {/* Close button: visible only on mobile/tablet (lg:hidden) */}
        <button 
          onClick={toggleSidebar} 
          className="lg:hidden p-2 hover:bg-gray-100 rounded-full"
        >
          <X size={24} />
        </button>
      </div>

      <nav className="flex flex-col" onClick={toggleSidebar}>
        <Link className="p-4 hover:bg-gray-100" to="/">Home</Link>
        <Link className="p-4 hover:bg-gray-100" to="/products">Shop</Link>
        <Link className="p-4 hover:bg-gray-100" to="/login">Login</Link>
        <Link className="p-4 hover:bg-gray-100" to="/register">Register</Link>
      </nav>
    </aside>
  );
}