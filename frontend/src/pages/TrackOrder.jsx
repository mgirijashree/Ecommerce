import { useState, useEffect } from "react";

function TrackOrder({ userEmail }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch orders from your Django backend API
    const url = userEmail 
      ? `http://127.0.0.1:8000/api/orders/?email=${userEmail}`
      : `http://127.0.0.1:8000/api/orders/`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  }, [userEmail]);

  if (loading) {
    return <p className="text-gray-500">Loading your orders...</p>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Your Order History</h2>
      
      {orders.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
          <p className="text-gray-500">No active orders found.</p>
        </div>
      ) : (
        orders.map((order) => (
          <div 
            key={order.id} 
            className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div>
              <h3 className="font-bold text-gray-800">Order #{order.id}</h3>
              <p className="text-sm text-gray-500">
                Date: {new Date(order.order_date).toLocaleDateString()}
              </p>
              <p className="text-sm font-semibold text-gray-700 mt-1">
                Total: ${order.grand_total}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Dynamic Status Badge */}
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {order.status}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TrackOrder;