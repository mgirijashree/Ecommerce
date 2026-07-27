import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  PackageSearch,
  PackageCheck,
  Truck,
  Clock,
  XCircle,
  ShoppingBag,
} from "lucide-react";

const API = "https://ecommerce-7jru.onrender.com/api/orders";

const STATUS_STEPS = ["Pending", "Processing", "Shipped", "Delivered"];

function StatusTimeline({ status }) {
  const currentIndex = STATUS_STEPS.indexOf(status);

  return (
    <div className="flex items-center w-full mt-6">
      {STATUS_STEPS.map((step, i) => {
        const done = i <= currentIndex;

        return (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${
                  done
                    ? "bg-amber-700 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {i + 1}
              </div>
              <p
                className={`text-xs mt-2 text-center w-20 ${
                  done ? "text-amber-700 font-semibold" : "text-gray-400"
                }`}
              >
                {step}
              </p>
            </div>

            {i !== STATUS_STEPS.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 rounded ${
                  i < currentIndex ? "bg-amber-700" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function TrackOrder() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setNotFound(true);
      return;
    }

    setLoading(true);
    setNotFound(false);

    axios
      .get(`${API}/${id}/`)
      .then((res) => {
        setOrder(res.data);
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto py-24 px-6 text-center text-gray-500">
        <PackageSearch className="mx-auto mb-4 animate-pulse" size={40} />
        Looking up your order...
      </div>
    );
  }

  if (notFound || !order) {
    return (
      <div className="max-w-xl mx-auto py-24 px-6 text-center">
        <div className="bg-white rounded-2xl shadow-lg p-10">
          <div className="w-16 h-16 mx-auto rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mb-6">
            <XCircle size={32} />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No Order Yet
          </h2>

          <p className="text-gray-500 mb-8">
            We couldn't find any order with ID{" "}
            <span className="font-semibold text-gray-700">#{id}</span>.
            Looks like you haven't placed an order yet — let's fix that!
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-amber-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-amber-800 transition"
            >
              <ShoppingBag size={18} />
              Continue Shopping
            </Link>
            <Link
              to="/track-order"
              className="border border-amber-700 text-amber-700 px-6 py-3 rounded-xl font-semibold hover:bg-amber-50 transition"
            >
              Try Another Order ID
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const StatusIcon =
    order.status === "Delivered"
      ? PackageCheck
      : order.status === "Shipped"
      ? Truck
      : Clock;

  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Order #{order.id}
            </h1>
            <p className="text-sm text-gray-500">
              Placed on {new Date(order.date).toLocaleDateString()}
            </p>
          </div>

          <span className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full font-semibold text-sm">
            <StatusIcon size={16} />
            {order.status}
          </span>
        </div>

        <StatusTimeline status={order.status} />

        <div className="grid sm:grid-cols-3 gap-6 mt-10 pt-8 border-t border-gray-100">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">
              Customer
            </p>
            <p className="font-medium text-gray-800">{order.customer}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">
              Payment Method
            </p>
            <p className="font-medium text-gray-800">{order.payment}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">
              Order Total
            </p>
            <p className="font-medium text-gray-800">₹{order.total}</p>
          </div>
        </div>

        {order.items?.length > 0 && (
          <div className="mt-8 pt-8 border-t border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">Items</h3>

            <div className="space-y-4">
              {order.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-[#faf8f4] rounded-xl p-3"
                >
                  <img
                    src={item.image}
                    alt={item.product}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">
                      {item.product}
                    </p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity} × ₹{item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <Link
            to="/shop"
            className="text-amber-700 font-semibold hover:underline"
          >
            Continue Shopping →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TrackOrder;
