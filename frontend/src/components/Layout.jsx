import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({
  cartItems,
  setIsCartOpen,
  toggleSidebar,
  isSidebarOpen,
  searchTerm,
  setSearchTerm
}) {

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />


      {/* Main Content */}
      <div className="
          flex-1
          flex
          flex-col
          min-w-0
      ">

        <Header
          cartItems={cartItems}
          setIsCartOpen={setIsCartOpen}
          toggleSidebar={toggleSidebar}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />


        <main className="
            flex-1
            p-3
            sm:p-5
            lg:p-6
            overflow-x-hidden
        ">
          <Outlet />
        </main>

      </div>

    </div>
  );
}