import { useState } from "react";

export default function Checkout({ cartItems, onCompletePurchase }) {
    const [paymentMethod, setPaymentMethod] = useState("card");

    const [cardDetails, setCardDetails] = useState({
        cardNumber: "",
        holderName: "",
        expiry: "",
        cvv: "",
    });

    const [upiId, setUpiId] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");

    const [errors, setErrors] = useState({});

    const methods = [
        { id: "card", label: "Credit / Debit Card", icon: "💳" },
        { id: "razorpay", label: "Razorpay (UPI)", icon: "⚡" },
        { id: "mobikwik", label: "MobiKwik Wallet", icon: "📱" },
        { id: "cash", label: "Cash on Delivery", icon: "💵" },
    ];

    const totalAmount = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const validatePayment = () => {
        let newErrors = {};

        if (paymentMethod === "card") {
            if (!/^\d{16}$/.test(cardDetails.cardNumber)) {
                newErrors.cardNumber = "Card Number must contain 16 digits";
            }

            if (cardDetails.holderName.trim().length < 3) {
                newErrors.holderName = "Enter Card Holder Name";
            }

            // Expiry Validation
            if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiry)) {
                newErrors.expiry = "Expiry should be in MM/YY format";
            } else {
                const [month, year] = cardDetails.expiry.split("/");

                const expiryMonth = parseInt(month, 10);
                const expiryYear = 2000 + parseInt(year, 10);

                const today = new Date();
                const currentMonth = today.getMonth() + 1; // January = 1
                const currentYear = today.getFullYear();

                if (
                    expiryYear < currentYear ||
                    (expiryYear === currentYear && expiryMonth < currentMonth)
                ) {
                    newErrors.expiry = "Card has expired";
                }
            }

            if (!/^\d{3}$/.test(cardDetails.cvv)) {
                newErrors.cvv = "CVV should contain 3 digits";
            }
        }

        if (paymentMethod === "razorpay") {
            if (!/^[a-zA-Z0-9._-]+@[a-zA-Z]+$/.test(upiId)) {
                newErrors.upiId = "Enter a valid UPI ID";
            }
        }

        if (paymentMethod === "mobikwik") {
            if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
                newErrors.mobile = "Enter a valid 10-digit Mobile Number";
            }
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        if (totalAmount <= 0) {
            alert("Order cannot be placed because the total amount is ₹0.");
            return;
        }

        if (!validatePayment()) return;

        alert("🎉 Payment Successful!");

        if (onCompletePurchase) {
            onCompletePurchase();
        }
    };

    return (
       <div className="max-w-2xl mx-auto mt-6 sm:mt-10 bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
                Checkout
            </h2>

            <h3 className="text-xl font-semibold mb-5">
                Select Payment Method
            </h3>

            <div className="space-y-4">

                {methods.map((method) => (

                    <label
                        key={method.id}
                        className={`flex items-center border rounded-lg p-4 cursor-pointer transition
            ${paymentMethod === method.id
                                ? "border-black bg-gray-100"
                                : "border-gray-300"
                            }`}
                    >

                        <input
                            type="radio"
                            name="payment"
                            value={method.id}
                            checked={paymentMethod === method.id}
                            onChange={(e) => {
                                setPaymentMethod(e.target.value);
                                setErrors({});
                            }}
                            className="mr-4"
                        />

                        <span className="text-2xl mr-3">
                            {method.icon}
                        </span>

                        <span className="font-medium">
                            {method.label}
                        </span>

                    </label>

                ))}

            </div>

            {/* CARD */}

            {paymentMethod === "card" && (

                <div className="mt-8 space-y-4">

                    <div>
                        <input
                            className="border rounded-lg p-3 w-full"
                            placeholder="Card Number"
                            maxLength={16}
                            value={cardDetails.cardNumber}
                            onChange={(e) =>
                                setCardDetails({
                                    ...cardDetails,
                                    cardNumber: e.target.value.replace(/\D/g, ""),
                                })
                            }
                        />
                        {errors.cardNumber && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.cardNumber}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            className="border rounded-lg p-3 w-full"
                            placeholder="Card Holder Name"
                            value={cardDetails.holderName}
                            onChange={(e) =>
                                setCardDetails({
                                    ...cardDetails,
                                    holderName: e.target.value,
                                })
                            }
                        />
                        {errors.holderName && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.holderName}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div>
                            <input
                                className="border rounded-lg p-3 w-full"
                                placeholder="MM/YY"
                                maxLength={5}
                                value={cardDetails.expiry}
                                onChange={(e) =>
                                    setCardDetails({
                                        ...cardDetails,
                                        expiry: e.target.value,
                                    })
                                }
                            />
                            {errors.expiry && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.expiry}
                                </p>
                            )}
                        </div>

                        <div>
                            <input
                                type="password"
                                className="border rounded-lg p-3 w-full"
                                placeholder="CVV"
                                maxLength={3}
                                value={cardDetails.cvv}
                                onChange={(e) =>
                                    setCardDetails({
                                        ...cardDetails,
                                        cvv: e.target.value.replace(/\D/g, ""),
                                    })
                                }
                            />
                            {errors.cvv && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.cvv}
                                </p>
                            )}
                        </div>

                    </div>

                </div>

            )}

            {/* Razorpay */}

            {paymentMethod === "razorpay" && (

                <div className="mt-8">

                    <input
                        className="border rounded-lg p-3 w-full"
                        placeholder="Enter UPI ID (example@ybl)"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                    />

                    {errors.upiId && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.upiId}
                        </p>
                    )}

                </div>

            )}

            {/* Mobikwik */}

            {paymentMethod === "mobikwik" && (

                <div className="mt-8">

                    <input
                        className="border rounded-lg p-3 w-full"
                        placeholder="Registered Mobile Number"
                        maxLength={10}
                        value={mobileNumber}
                        onChange={(e) =>
                            setMobileNumber(
                                e.target.value.replace(/\D/g, "")
                            )
                        }
                    />

                    {errors.mobile && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.mobile}
                        </p>
                    )}

                </div>

            )}

            {/* Cash */}

            {paymentMethod === "cash" && (

                <div className="mt-8 bg-green-100 border border-green-300 rounded-lg p-5">

                    <h3 className="font-bold text-green-700 mb-2">
                        Cash on Delivery
                    </h3>

                    <p className="text-green-700">
                        Please keep the exact amount ready while receiving your order.
                    </p>

                </div>

            )}

            {/* Total */}

            <div className="mt-8 border-t pt-6 space-y-3">

                <div className="flex justify-between text-lg">
                    <span>Total Items</span>
                    <span>{cartItems.length}</span>
                </div>

                <div className="flex justify-between text-2xl font-bold">
                    <span>Total Amount</span>
                    <span>₹{totalAmount.toFixed(2)}</span>
                </div>

            </div>

            <button
                onClick={handleCheckout}
                disabled={cartItems.length === 0 || totalAmount <= 0}
                className={`w-full mt-8 py-4 rounded-lg text-lg font-bold transition
${cartItems.length === 0 || totalAmount <= 0
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-black text-white hover:bg-gray-800 active:scale-95"
                    }`}
            >
                {cartItems.length === 0
                    ? "Cart is Empty"
                    : totalAmount <= 0
                        ? "Total Amount is ₹0"
                        : `Pay ₹${totalAmount.toFixed(2)}`}
            </button>

        </div>
    );
}