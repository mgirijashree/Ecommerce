import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  PackageSearch,
  Package,
  Clock,
  Truck,
  PackageCheck,
  XCircle,
  Trash2,
  ShoppingBag,
} from "lucide-react";

const API = "https://ecommerce-7jru.onrender.com/api/orders";

const STATUS_STYLES = {
  Pending: { icon: Clock, classes: "bg-yellow-50 text-yellow-700" },
  Processing: { icon: Package, classes: "bg-blue-50 text-blue-700" },
  Shipped: { icon: Truck, classes: "bg-indigo-50 text-indigo-700" },
  Delivered: { icon: PackageCheck, classes: "bg-green-50 text-green-700" },
};

function getMyOrderIds() {
  try {
    const saved = JSON.parse(localStorage.getItem("myOrders") || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function OrderRow({ entry, order, index }) {
  const status = order?.status || "Pending";
  const style = STATUS_STYLES[status] || STATUS_STYLES.Pending;
  const StatusIcon = style.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
    >
      <Link
        to={`/track-order/${entry.id}`}
        className="flex items-center justify-between gap-4 bg-white rounded-2xl shadow-sm hover:shadow-md p-5 transition"
      >
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <PackageSearch size={20} />
          </div>

          <div>
            <p className="font-semibold text-gray-900">
              Order #{entry.id}
            </p>
            <p className="text-xs text-gray-400">
              Placed on{" "}
              {new Date(entry.date).toLocaleDateString(undefined, {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {order && (
            <span className="text-sm font-medium text-gray-600 hidden sm:inline">
              ₹{order.total}
            </span>
          )}

          <span
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${style.classes}`}
          >
            <StatusIcon size={13} />
            {status}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function TrackOrderSearch() {
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState("");

  const [myOrders, setMyOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState({});
  const [loadingOrders, setLoadingOrders] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const ids = getMyOrderIds();
    setMyOrders(ids);

    if (ids.length === 0) {
      setLoadingOrders(false);
      return;
    }

    Promise.allSettled(
      ids.map((entry) => axios.get(`${API}/${entry.id}/`))
    ).then((results) => {
      const details = {};

      results.forEach((res, i) => {
        if (res.status === "fulfilled") {
          details[ids[i].id] = res.value.data;
        }
      });

      setOrderDetails(details);
      setLoadingOrders(false);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!orderId.trim()) {
      setError("Please enter your Order ID");
      return;
    }

    navigate(`/track-order/${orderId.trim()}`);
  };

  const clearHistory = () => {
    localStorage.removeItem("myOrders");
    setMyOrders([]);
    setOrderDetails({});
  };

  return (
    <div className="max-w-2xl mx-auto my-16 px-6">
      {/* Search box */}
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

      {/* Order history for this browser */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">
            Your Recent Orders
          </h2>

          {myOrders.length > 0 && (
            <button
              onClick={clearHistory}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-500 transition"
            >
              <Trash2 size={13} />
              Clear
            </button>
          )}
        </div>

        {loadingOrders && (
          <div className="space-y-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-sm p-5 h-20 animate-pulse"
              />
            ))}
          </div>
        )}

        <AnimatePresence>
          {!loadingOrders && myOrders.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl shadow-sm p-8 text-center"
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                <XCircle size={26} />
              </div>

              <p className="font-semibold text-gray-800 mb-1">
                No Order Yet
              </p>
              <p className="text-sm text-gray-500 mb-6">
                You haven't placed any orders from this browser yet.
              </p>

              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-amber-700 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-amber-800 transition"
              >
                <ShoppingBag size={16} />
                Continue Shopping
              </Link>
            </motion.div>
          )}

          {!loadingOrders && myOrders.length > 0 && (
            <div className="space-y-3">
              {myOrders.map((entry, i) => (
                <OrderRow
                  key={entry.id}
                  entry={entry}
                  order={orderDetails[entry.id]}
                  index={i}
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default TrackOrderSearch;
