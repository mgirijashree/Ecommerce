import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Orders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {

        axios
            .get("https://ecommerce-7jru.onrender.com/api/orders/")
            .then((res) => setOrders(res.data));

    }, []);

    return (

        <div className="max-w-6xl mx-auto mt-10">

            <h1 className="text-3xl font-bold mb-8">
                My Orders
            </h1>

            {orders.map((order) => (

                <div
                    key={order.id}
                    className="border rounded-xl p-6 shadow mb-5"
                >

                    <h2 className="font-bold text-xl">
                        Order #{order.id}
                    </h2>

                    <p>Name : {order.customer}</p>

                    <p>Total : ₹{order.total}</p>

                    <p>Payment : {order.payment}</p>

                    <p>Status : {order.status}</p>

                    <Link
                        to={`/track-order/${order.id}`}
                        className="inline-block mt-4 bg-yellow-600 text-white px-5 py-2 rounded"
                    >
                        Track Order
                    </Link>

                </div>

            ))}

        </div>

    );

}

export default Orders;