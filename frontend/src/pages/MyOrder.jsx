import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function TrackOrder() {

    const { id } = useParams();

    const [order, setOrder] = useState(null);

    useEffect(() => {

        axios.get(
            `http://127.0.0.1:8000/api/orders/${id}/`
        )
            .then(res => setOrder(res.data));

    }, [id]);

    const steps = [
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
    ];

    const currentStep = steps.indexOf(order.status);

    if (!order) return <h2>Loading...</h2>;

    return (

        <div className="max-w-3xl mx-auto mt-10">

            <h1 className="text-3xl font-bold">
                Order Tracking
            </h1>

            <div className="mt-6 border rounded-xl p-6">

                <h2>Order #{order.id}</h2>

                <p>Name : {order.customer}</p>

                <p>Payment : {order.payment}</p>

                <p>Total : ₹{order.total}</p>

                <p className="mt-4">
                    Status :
                    <span
                        className={`ml-3 px-3 py-1 rounded-full text-sm font-semibold ${order.status === "Pending"
                            ? "bg-yellow-200 text-yellow-800"
                            : order.status === "Processing"
                                ? "bg-blue-200 text-blue-800"
                                : order.status === "Shipped"
                                    ? "bg-purple-200 text-purple-800"
                                    : "bg-green-200 text-green-800"
                            }`}
                    >
                        {order.status}
                    </span>
                </p>

            </div>

            <div className="mt-8">

                <h2 className="text-xl font-semibold mb-6">
                    Delivery Progress
                </h2>

                <div className="flex justify-between items-center">

                    {steps.map((step, index) => (

                        <div
                            key={step}
                            className="flex-1 text-center"
                        >

                            <div
                                className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center font-bold
                    ${index <= currentStep
                                        ? "bg-green-600 text-white"
                                        : "bg-gray-300 text-gray-600"
                                    }`}
                            >
                                {index + 1}
                            </div>

                            <p className="mt-2 text-sm">
                                {step}
                            </p>

                        </div>

                    ))}

                </div>

            </div>



            <div className="mt-10">

                <h2 className="text-2xl font-bold mb-6">
                    Ordered Products
                </h2>

                {
                    order.items?.map((item, index) => (

                        <div
                            key={index}
                            className="flex items-center gap-5 border rounded-xl p-4 mb-4 shadow bg-white"
                        >

                            <img
                                src={item.image}
                                alt={item.product}
                                className="w-24 h-24 rounded-lg object-cover"
                            />

                            <div className="flex-1">

                                <h3 className="font-semibold text-lg">
                                    {item.product}
                                </h3>

                                <p>Quantity: {item.quantity}</p>

                                <p>Price: ₹{item.price}</p>

                                <p className="font-bold">
                                    Total: ₹{item.price * item.quantity}
                                </p>

                            </div>

                        </div>

                    ))
                }

            </div>

            <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-6 mt-8">

                <h2 className="text-xl font-bold mb-4">
                    Order Summary
                </h2>

                <div className="flex justify-between mb-2">
                    <span>Order ID</span>
                    <strong>#{order.id}</strong>
                </div>

                <div className="flex justify-between mb-2">
                    <span>Payment</span>
                    <strong>{order.payment}</strong>
                </div>

                <div className="flex justify-between mb-2">
                    <span>Status</span>
                    <strong>{order.status}</strong>
                </div>

                <div className="flex justify-between text-xl font-bold border-t pt-4 mt-4">
                    <span>Grand Total</span>
                    <span>₹{order.total}</span>
                </div>

            </div>
        </div>

    );

}

export default TrackOrder;