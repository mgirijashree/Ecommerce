import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";


function Checkout() {
    const navigate = useNavigate();
    const [cart, setCart] = useState(
        JSON.parse(
            localStorage.getItem("cart")
        ) || []
    );
    const [showSuccess, setShowSuccess] = useState(false);
    const [form, setForm] = useState({
        full_name: "",
        email: "",
        phone: "",
        address: ""
    });
    const [errors, setErrors] = useState({});

    const [paymentMethod, setPaymentMethod] = useState("COD");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: ""
            });
        }
    };

    const total = cart.reduce(
        (sum, item) =>
            sum +
            (Number(item.price) * item.quantity),
        0
    );

    const formatPrice = (amount) => {
        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR"
            }
        ).format(amount);
    };


    const [orderId, setOrderId] = useState(null);


    const validateForm = () => {
        let newErrors = {};

        // Name validation
        if (!form.full_name.trim()) {
            newErrors.full_name = "Name is required";
        }
        else if (!/^[A-Za-z ]+$/.test(form.full_name)) {
            newErrors.full_name = "Name should contain only letters";
        }
        else if (form.full_name.length < 3) {
            newErrors.full_name = "Name must contain minimum 3 characters";
        }

        // Email validation
        if (!form.email.trim()) {
            newErrors.email = "Email is required";
        }
        else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
        ) {
            newErrors.email = "Enter valid email address";
        }

        // Phone validation
        if (!form.phone.trim()) {
            newErrors.phone = "Phone number is required";
        }
        else if (!/^[6-9]\d{9}$/.test(form.phone)) {
            newErrors.phone = "Enter valid 10 digit mobile number";
        }

        // Address validation
        if (!form.address.trim()) {
            newErrors.address = "Address is required";
        }
        else if (form.address.length < 10) {
            newErrors.address = "Address must contain minimum 10 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const placeOrder = async () => {


        if (!validateForm()) {
            return;
        }


        // Cash On Delivery
        if (paymentMethod === "COD") {


            saveOrder({

                payment_mode: "Cash on Delivery",

                payment_id: null


            });


            return;

        }



        // Razorpay Payment

        try {


            const paymentResponse = await axios.post(

                "https://ecommerce-7jru.onrender.com/api/payment/create/",

                {
                    amount: total
                }

            );



            const options = {


                key: paymentResponse.data.key,


                amount: paymentResponse.data.amount,


                currency: "INR",


                name: "Happy Accessories",


                description: "Luxury Jewellery Purchase",


                order_id: paymentResponse.data.id,


                handler: function (response) {


                    saveOrder({

                        payment_mode: "Razorpay",

                        payment_id:
                            response.razorpay_payment_id

                    });


                },


                prefill: {


                    name: form.full_name,


                    email: form.email,


                    contact: form.phone


                },


                theme: {


                    color: "#D4AF37"


                }


            };



            const razorpay = new window.Razorpay(options);


            razorpay.open();



        }


        catch (error) {


            console.log(error);


            alert(
                "Razorpay failed. Please select Cash on Delivery"
            );


        }


    };


    const saveOrder = async (payment = null) => {


        const orderData = {


            full_name: form.full_name,


            email: form.email,


            phone: form.phone,


            address: form.address,


            payment_method: paymentMethod,


            payment_id:

                payment
                    ? payment.razorpay_payment_id
                    : "",


            grand_total: total,


            items: cart.map(item => ({


                product: item.id,


                quantity: item.quantity,


                price: item.price


            }))


        };


        try {

            const response = await axios.post(
                "https://ecommerce-7jru.onrender.com/api/orders/",
                orderData
            );

            setOrderId(response.data.id);

            localStorage.removeItem("cart");
            setCart([]);
            setShowSuccess(true);




        }


        catch (error) {


            console.log(error);


            alert(
                "Order saving failed"
            );


        }



    };

    return (
        <div className="min-h-screen bg-[#fffaf0] pb-10">
            {/* Top Navigation Bar */}
            <nav className="bg-white border-b border-yellow-200 px-8 py-4 flex items-center justify-between shadow-sm">
                <div className="text-2xl font-serif font-bold text-yellow-800">
                    Happy Accessories
                </div>
                <div className="flex items-center gap-6 text-gray-700 font-medium">
                    <Link to="/" className="hover:text-yellow-700">Home</Link>
                    <Link to="/shop" className="hover:text-yellow-700">Shop</Link>
                    <Link to="/about" className="hover:text-yellow-700">About</Link>
                    <Link to="/contact" className="hover:text-yellow-700">Contact</Link>
                </div>
                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        placeholder="Search jewellery..."
                        className="border border-gray-300 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:border-yellow-600 w-60"
                    />
                    <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
                        <span className="text-xl">🛒</span>
                        {cart.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                {cart.reduce((sum, item) => sum + item.quantity, 0)}
                            </span>
                        )}
                    </div>
                </div>
            </nav>

            {/* Page Header */}
            <div className="text-center my-8">
                <h1 className="text-3xl font-serif font-bold text-yellow-800">
                    Happy Accessories
                </h1>
                <p className="text-sm tracking-widest text-gray-600 uppercase mt-1">
                    Luxury Jewellery Checkout
                </p>
            </div>

            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 px-5">
                {/* Customer Details */}
                <div className="bg-white rounded-xl shadow-xl border border-yellow-300 p-8">
                    <h2 className="text-2xl font-serif text-yellow-700 mb-5">
                        Delivery Details
                    </h2>

                    {/* Full Name */}
                    <div className="mb-4">
                        <input
                            name="full_name"
                            placeholder="Full Name"
                            value={form.full_name}
                            onChange={handleChange}
                            className={`w-full border rounded-lg p-3 ${errors.full_name ? 'border-red-500 focus:outline-red-500' : 'border-gray-300'}`}
                        />
                        {errors.full_name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.full_name}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <input
                            name="email"
                            placeholder="Email Address"
                            value={form.email}
                            onChange={handleChange}
                            className={`w-full border rounded-lg p-3 ${errors.email ? 'border-red-500 focus:outline-red-500' : 'border-gray-300'}`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Phone Number */}
                    <div className="mb-4">
                        <input
                            name="phone"
                            placeholder="Phone Number (10 digits)"
                            value={form.phone}
                            onChange={handleChange}
                            maxLength="10"
                            className={`w-full border rounded-lg p-3 ${errors.phone ? 'border-red-500 focus:outline-red-500' : 'border-gray-300'}`}
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.phone}
                            </p>
                        )}
                    </div>

                    {/* Address */}
                    <div className="mb-4">
                        <textarea
                            name="address"
                            placeholder="Delivery Address (Min 10 characters)"
                            value={form.address}
                            onChange={handleChange}
                            rows="4"
                            className={`w-full border rounded-lg p-3 ${errors.address ? 'border-red-500 focus:outline-red-500' : 'border-gray-300'}`}
                        />
                        {errors.address && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.address}
                            </p>
                        )}
                    </div>

                    <div className="mb-5">

                        <h3 className="
text-lg
font-semibold
text-yellow-700
mb-3
">
                            Payment Method
                        </h3>


                        <label className="
flex
items-center
gap-3
mb-3
">

                            <input
                                type="radio"
                                value="COD"
                                checked={paymentMethod === "COD"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />

                            <span>
                                Cash on Delivery
                            </span>

                        </label>



                        <label className="
flex
items-center
gap-3
">

                            <input
                                type="radio"
                                value="RAZORPAY"
                                checked={paymentMethod === "RAZORPAY"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />

                            <span>
                                Pay Online (Razorpay)
                            </span>

                        </label>


                    </div>



                    <button
                        onClick={placeOrder}
                        className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg font-semibold transition duration-200"
                    >
                        Place Order
                    </button>
                </div>

                {/* Order Summary */}
                <div className="bg-white rounded-xl shadow-xl border border-yellow-300 p-8 h-fit">
                    <h2 className="text-2xl font-serif text-yellow-700 mb-5">
                        Your Jewellery
                    </h2>
                    {
                        cart.map(item => (
                            <div
                                key={item.id}
                                className="flex items-center gap-4 border-b pb-4 mb-4"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-20 h-20 rounded-lg object-cover border border-yellow-300"
                                />
                                <div className="flex-1">
                                    <h3 className="font-semibold">
                                        {item.name}
                                    </h3>
                                    <p className="text-gray-600">
                                        Qty: {item.quantity}
                                    </p>
                                    <p className="text-yellow-700 font-bold">
                                        {formatPrice(
                                            item.price * item.quantity
                                        )}
                                    </p>
                                </div>
                            </div>
                        ))
                    }
                    <div className="border-t pt-5 flex justify-between text-xl font-bold">
                        <span>Grand Total</span>
                        <span className="text-yellow-700">
                            {formatPrice(total)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            {
                showSuccess &&
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-10 text-center shadow-2xl border border-yellow-400 max-w-md mx-4">
                        <h2 className="text-3xl font-serif text-yellow-700 mb-4">
                            ✨ Order Confirmed ✨
                        </h2>
                        <p className="text-gray-700 mb-6">
                            Thank you for shopping with
                            <br />
                            <b className="text-yellow-700">
                                Happy Accessories
                            </b>
                        </p>
                        <button
                            onClick={() => navigate("/shop")}
                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-lg transition duration-200"
                        >
                            Continue Shopping
                        </button>
                        <button
                            onClick={() => navigate(`/track-order/${orderId}`)}
                            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg"
                        >
                            Track Order
                        </button>
                    </div>
                </div>
            }
        </div>
    );
}

export default Checkout;