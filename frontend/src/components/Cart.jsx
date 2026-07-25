import React from "react";

function Cart({
  cartItems,
  isCartOpen,
  onClose,
  onCheckout,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  if (!isCartOpen) return null;

  const grandTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">

      <div className="bg-white w-full sm:w-[420px] h-screen shadow-xl overflow-y-auto">

        {/* Header */}

        <div className="flex justify-between items-center p-5 border-b">

          <h2 className="text-2xl font-bold">
            Shopping Cart
          </h2>

          <button
            onClick={onClose}
            className="text-2xl font-bold"
          >
            ×
          </button>

        </div>

        {/* Empty Cart */}

        {cartItems.length === 0 ? (

          <div className="text-center mt-20">

            <h2 className="text-2xl font-semibold">
              Your Cart is Empty
            </h2>

          </div>

        ) : (

          <>

            {/* Items */}

            <div className="p-4 space-y-4">

              {cartItems.map((item) => (

                <div
                  key={item.id}
                  className="flex gap-4 border rounded-lg p-3"
                >

                  <img
                    src={`http://127.0.0.1:8000${item.image}`}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />

                  <div className="flex-1">

                    <h3 className="font-semibold text-lg">
                      {item.name}
                    </h3>

                    <p className="text-gray-500">
                      ₹ {item.price}
                    </p>

                    <div className="flex items-center gap-3 mt-3">

                      <button
                        onClick={() => onDecrease(item.id)}
                        className="bg-gray-200 px-3 py-1 rounded"
                      >
                        -
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => onIncrease(item.id)}
                        className="bg-gray-200 px-3 py-1 rounded"
                      >
                        +
                      </button>

                    </div>

                  </div>

                  <button
                    onClick={() => onRemove(item.id)}
                    className="text-red-600 font-bold"
                  >
                    Remove
                  </button>

                </div>

              ))}

            </div>

            {/* Total */}

            <div className="border-t p-5">

              <div className="flex justify-between text-xl font-bold">

                <span>Total</span>

                <span>₹ {grandTotal.toFixed(2)}</span>

              </div>

              <button
                onClick={onCheckout}
                className="mt-5 w-full bg-black text-white py-3 rounded hover:bg-amber-700"
              >
                Proceed To Checkout
              </button>

            </div>

          </>

        )}

      </div>

    </div>
  );
}

export default Cart;