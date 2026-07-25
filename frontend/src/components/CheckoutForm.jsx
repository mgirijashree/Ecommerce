import { useState } from "react";

function CheckoutForm({ onPlaceOrder }) {

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPlaceOrder(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white  w-[95%] max-w-lg rounded-lg p-6">

        <h2 className="text-2xl font-bold mb-6">
          Checkout
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="border w-full p-3 rounded mb-4"
            required
          />

          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="border w-full p-3 rounded mb-4"
            rows="4"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border w-full p-3 rounded mb-6"
            required
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded hover:bg-amber-700"
          >
            Place Order
          </button>

        </form>

      </div>

    </div>
  );
}

export default CheckoutForm;