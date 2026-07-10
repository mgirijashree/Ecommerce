import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./components/Cart";
import Checkout from "./pages/Checkout";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Cart Handlers
  const handleAddToCart = (product) => {
    const existing = cartItems.find(item => item.id === product.id);
    if (existing) {
      setCartItems(cartItems.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const increaseQuantity = (id) => setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  const decreaseQuantity = (id) => setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item).filter(item => item.quantity > 0));
  const removeItem = (id) => setCartItems(cartItems.filter(item => item.id !== id));

  return (
    <Routes>
      <Route element={
        <Layout
          cartItems={cartItems}
          setIsCartOpen={setIsCartOpen}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      }>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={
          <Products
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
            isCartOpen={isCartOpen}
            setIsCartOpen={setIsCartOpen}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            removeItem={removeItem}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        } />
        <Route path="/cart" element={
          <Cart
            cartItems={cartItems}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            removeItem={removeItem}
            onCheckout={() => alert("Proceed to Checkout")}
          />
        } />
        <Route path="/checkout" element={<Checkout cartItems={cartItems} />} />
      </Route>
    </Routes>
  );
}

export default App;