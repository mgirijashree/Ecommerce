import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TrackOrderSearch() {

    const [orderId, setOrderId] = useState("");

    const navigate = useNavigate();

    const handleSubmit = () => {

        if (!orderId.trim()) {
            alert("Enter your Order ID");
            return;
        }

        navigate(`/track-order/${orderId}`);
    };

    return (
        <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-xl shadow">

            <h1 className="text-3xl font-bold text-center mb-6">
                Track Your Order
            </h1>

            <input
                type="number"
                placeholder="Enter Order ID"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full border rounded-lg p-3"
            />

            <button
                onClick={handleSubmit}
                className="mt-5 w-full bg-yellow-600 text-white py-3 rounded-lg"
            >
                Track Order
            </button>

        </div>
    );
}

export default TrackOrderSearch;