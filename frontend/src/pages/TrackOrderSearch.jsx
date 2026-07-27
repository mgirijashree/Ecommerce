import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PackageSearch } from "lucide-react";

function TrackOrderSearch() {
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!orderId.trim()) {
      setError("Please enter your Order ID");
      return;
    }

    navigate(`/track-order/${orderId.trim()}`);
  };

  return (
    <div className="max-w-md mx-auto my-20 px-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
        <div className="w-14 h-14 mx-auto rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mb-5">
          <PackageSearch size={26} />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Track Your Order
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          Enter your Order ID to see the latest status of your delivery.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="e.g. 1024"
            value={orderId}
            onChange={(e) => {
              setOrderId(e.target.value);
              setError("");
            }}
            className={`w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-amber-500 ${
              error ? "border-red-400" : "border-gray-200"
            }`}
          />

          {error && (
            <p className="text-red-500 text-xs mt-2 text-left">{error}</p>
          )}

          <button
            type="submit"
            className="mt-5 w-full bg-amber-700 text-white py-3 rounded-xl font-semibold hover:bg-amber-800 transition"
          >
            Track Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default TrackOrderSearch;
