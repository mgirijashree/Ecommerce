import { useState } from "react";
import Home from "./pages/Home";
import CheckoutForm from "./components/CheckoutForm";
import ChatBot from "./components/ChatBot";

function App() {

  const [cartItems, setCartItems] = useState([]);
const [isCartOpen, setIsCartOpen] = useState(false);
const [showCheckout, setShowCheckout] = useState(false);


  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {

      const existingItem = prevItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { ...product, quantity: 1 }];
    });
  };


  // Increase Quantity
const increaseQuantity = (id) => {
  setCartItems((prevItems) =>
    prevItems.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
};

// Decrease Quantity
const decreaseQuantity = (id) => {
  setCartItems((prevItems) =>
    prevItems
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};

// Remove Item
const removeItem = (id) => {
  setCartItems((prevItems) =>
    prevItems.filter((item) => item.id !== id)
  );
};









  const grandTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async (formData) => {

    const newOrder = {
      customer: formData,
      items: cartItems,
      grandTotal: grandTotal,
    };

    console.log(newOrder);

    alert("Order Placed Successfully!");

    setCartItems([]);

    setShowCheckout(false);
  };

  return (
    <>
      <Home
        cartItems={cartItems}
        onAddToCart={handleAddToCart}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        onCheckout={() => setShowCheckout(true)}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        onRemove={removeItem}
      />

      {showCheckout && (
        <CheckoutForm
          onPlaceOrder={handlePlaceOrder}
        />
      )}
      <ChatBot/>
    </>
  );
}

export default App;