import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ProductGallery from "../components/ProductGallery";
import Cart from "../components/Cart";

function Home(props) {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (

    <div className="bg-gray-100 min-h-screen">

      <Sidebar
        isOpen={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />

      <div className="lg:ml-64">

        <Header
          cartItems={props.cartItems}
          onCartClick={() => props.setIsCartOpen(true)}
          openSidebar={() => setSidebarOpen(true)}
        />

        <main className="p-4 md:p-6 lg:p-8">

          <ProductGallery
            onAddToCart={props.onAddToCart}
          />

        </main>

      </div>

      <Cart
        cartItems={props.cartItems}
        isCartOpen={props.isCartOpen}
        onClose={() => props.setIsCartOpen(false)}
        onCheckout={props.onCheckout}
        onIncrease={props.onIncrease}
        onDecrease={props.onDecrease}
        onRemove={props.onRemove}
      />

    </div>

  );
}

export default Home;