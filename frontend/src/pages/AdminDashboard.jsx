import { useEffect, useState } from "react";
import axios from "axios";


function AdminDashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [orders, setOrders] = useState([]);


    useEffect(() => {

        loadDashboard();
        loadOrders();

    }, []);



    const loadDashboard = async () => {

        try {

            const response = await axios.get(
                "https://ecommerce-7jru.onrender.com/api/admin/dashboard/"
            );

            setDashboard(response.data);

        }
        catch (error) {

            console.log(error);

        }

    };



    const loadOrders = async () => {

        try {

            const response = await axios.get(
                "https://ecommerce-7jru.onrender.com/api/admin/orders/"
            );

            setOrders(response.data);

        }
        catch (error) {

            console.log(error);

        }

    };



    if (!dashboard) {

        return (
            <h2 className="text-center mt-10">
                Loading Dashboard...
            </h2>
        );

    }

    const changeStatus = async (id, status) => {

        try {

            await axios.put(
                `https://ecommerce-7jru.onrender.com/api/admin/orders/${id}/`,
                {
                    status: status
                }
            );

            loadOrders();
            loadDashboard();

        }
        catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="min-h-screen bg-gray-100 p-8">


            <h1 className="
            text-3xl 
            font-bold 
            text-yellow-700 
            mb-8
            ">
                Admin Order Dashboard
            </h1>



            {/* Statistics */}

            <div className="
            grid 
            md:grid-cols-4 
            gap-6
            mb-10
            ">


                <div className="bg-white shadow rounded-xl p-6">
                    <h3 className="text-gray-500">
                        Total Orders
                    </h3>

                    <p className="text-3xl font-bold">
                        {dashboard.total_orders}
                    </p>
                </div>



                <div className="bg-white shadow rounded-xl p-6">

                    <h3 className="text-gray-500">
                        Total Sales
                    </h3>

                    <p className="text-3xl font-bold text-green-600">
                        ₹ {dashboard.total_sales}
                    </p>

                </div>



                <div className="bg-white shadow rounded-xl p-6">

                    <h3 className="text-gray-500">
                        Pending
                    </h3>

                    <p className="text-3xl font-bold text-orange-500">
                        {dashboard.pending_orders}
                    </p>

                </div>



                <div className="bg-white shadow rounded-xl p-6">

                    <h3 className="text-gray-500">
                        Delivered
                    </h3>

                    <p className="text-3xl font-bold text-blue-600">
                        {dashboard.delivered_orders}
                    </p>

                </div>


            </div>





            {/* Orders Table */}

            <div className="
            bg-white
            rounded-xl
            shadow
            overflow-hidden
            ">


                <table className="
                w-full
                ">


                    <thead className="bg-yellow-600 text-white">

                        <tr>

                            <th className="p-3">
                                ID
                            </th>

                            <th>
                                Customer
                            </th>

                            <th>
                                Phone
                            </th>

                            <th>
                                Amount
                            </th>

                            <th>
                                Payment
                            </th>

                            <th>
                                Status
                            </th>

                        </tr>

                    </thead>



                    <tbody>


                        {
                            orders.map(order => (

                                <tr
                                    key={order.id}
                                    className="border-b text-center"
                                >

                                    <td className="p-3">
                                        #{order.id}
                                    </td>


                                    <td>
                                        {order.full_name}
                                    </td>


                                    <td>
                                        {order.phone}
                                    </td>


                                    <td>
                                        ₹ {order.grand_total}
                                    </td>


                                    <td>

                                        {
                                            order.payment_method === "COD"
                                                ?
                                                "Cash"
                                                :
                                                "Online"
                                        }

                                    </td>


                                    <td>

                                        <select
                                            value={order.status}
                                            onChange={(e) => changeStatus(order.id, e.target.value)}
                                            className="border rounded px-2 py-1"
                                        >

                                            <option value="Pending">
                                                Pending
                                            </option>

                                            <option value="Processing">
                                                Processing
                                            </option>

                                            <option value="Shipped">
                                                Shipped
                                            </option>

                                            <option value="Delivered">
                                                Delivered
                                            </option>

                                        </select>

                                    </td>


                                </tr>


                            ))
                        }


                    </tbody>


                </table>


            </div>


        </div>


    )

}


export default AdminDashboard;