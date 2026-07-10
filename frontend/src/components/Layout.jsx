import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({ cartItems, setIsCartOpen, toggleSidebar, isSidebarOpen, searchTerm, setSearchTerm }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <Header 
            cartItems={cartItems} 
            setIsCartOpen={setIsCartOpen} 
            toggleSidebar={toggleSidebar} 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
        />
        <main className="p-6"><Outlet /></main>
      </div>
    </div>
  );
}