import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";



export default function Cart({
  cartItems,
  increaseQuantity,
  decreaseQuantity,
  removeItem,


}) {

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 0 : 0;



  const [showAddressForm, setShowAddressForm] = useState(true);

  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    email: "",
    house: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem("shippingAddress");

    if (saved) {
      setAddress(JSON.parse(saved));
      setShowAddressForm(false);
    }
  }, []);


  const validateAddress = () => {
    let newErrors = {};

    // Full Name
    if (!address.fullName.trim()) {
      newErrors.fullName = "Name is required";
    } else if (!/^[A-Za-z ]+$/.test(address.fullName)) {
      newErrors.fullName = "Only letters are allowed";
    } else if (address.fullName.trim().length < 3) {
      newErrors.fullName = "Name should contain at least 3 letters";
    }

    // Phone
    if (!address.phone.trim()) {
      newErrors.phone = "Phone Number is required";
    } else if (!/^[6-9]\d{9}$/.test(address.phone)) {
      newErrors.phone = "Enter a valid 10-digit mobile number";
    }

    // Email
    if (!address.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(address.email)
    ) {
      newErrors.email = "Enter a valid email";
    }

    // House Number
    if (!address.house.trim()) {
      newErrors.house = "House Number & Building Name is required";
    } else if (address.house.trim().length < 3) {
      newErrors.house = "Enter a valid house number";
    }

    // Street
    if (!address.street.trim()) {
      newErrors.street = "Street Name is required";
    } else if (address.street.trim().length < 3) {
      newErrors.street = "Enter a valid street name";
    }

    // City
    if (!address.city.trim()) {
      newErrors.city = "City is required";
    }

    // State
    if (!address.state.trim()) {
      newErrors.state = "State is required";
    }

    // Pincode
    if (!address.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(address.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");




  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();

    if (subtotal === 0) {
      setCouponMessage("Your cart is empty.");
      setDiscount(0);
      return;
    }

    switch (code) {
      case "WELCOME10":
        setDiscount(subtotal * 0.10);
        setCouponMessage("🎉 10% discount applied!");
        break;

      case "SAVE20":
        setDiscount(subtotal * 0.20);
        setCouponMessage("🎉 20% discount applied!");
        break;

      case "FLAT500":
        if (subtotal >= 1500) {
          setDiscount(500);
          setCouponMessage("🎉 ₹500 discount applied!");
        } else {
          setDiscount(0);
          setCouponMessage(
            "❌ FLAT500 is applicable only on orders of ₹1500 or above."
          );
        }
        break;

      case "FREESHIP":
        setDiscount(100);
        setCouponMessage("🎉 Free Shipping coupon applied!");
        break;

      default:
        setDiscount(0);
        setCouponMessage("❌ Invalid coupon code.");
    }
  };

  const total = subtotal + shipping - discount;


  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Main Cart Box */}

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-3">


        {/* LEFT SIDE */}

        <div className="md:col-span-2 p-8">

          <button
            className="text-pink-500 mb-6"
            onClick={() => window.history.back()}
          >
            ← Continue Shopping
          </button>


          <h1 className="text-3xl font-bold mb-2">
            Shopping Cart
          </h1>

          <p className="text-gray-400 mb-8">
            {cartItems.length} items
          </p>



          {cartItems.length === 0 ? (

            <div className="text-center py-20">

              <h2 className="text-xl">
                Your cart is empty
              </h2>

            </div>

          ) : (

            cartItems.map((item) => (

              <div
                key={item.id}
                className="flex items-center justify-between border-b py-5"
              >


                {/* Image */}

                <img
                  src={`http://127.0.0.1:8000${item.image}`}
                  alt={item.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />


                {/* Details */}

                <div className="flex-1 ml-5">

                  <h3 className="font-semibold">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-400">
                    Category: {item.category_name}
                  </p>


                  <div className="flex items-center gap-3 mt-3">

                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="border rounded px-3"
                    >
                      -
                    </button>


                    <span>
                      {item.quantity}
                    </span>


                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="border rounded px-3"
                    >
                      +
                    </button>

                  </div>




                </div>



                {/* Price */}

                <div className="text-right">

                  <p className="font-bold">
                    ₹
                    {
                      (
                        item.price *
                        item.quantity
                      ).toFixed(2)
                    }
                  </p>


                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 text-sm mt-3"
                  >
                    Remove
                  </button>

                </div>


              </div>

            ))

          )}


        </div>



        {/* RIGHT SIDE CHECKOUT */}


        <div className="bg-pink-50 p-8">


          <div className="bg-white rounded-xl shadow p-6 mt-8">

            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-semibold">
                Delivery Address
              </h2>

              {!showAddressForm && (
                <button
                  onClick={() => setShowAddressForm(true)}
                  className="text-pink-600 font-semibold hover:underline"
                >
                  Edit
                </button>
              )}
            </div>

            {/* ADDRESS FORM */}

            {showAddressForm ? (

              <>
                <div className="grid md:grid-cols-2 gap-4">

                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="border rounded-lg p-3 w-full"
                      placeholder="Full Name"
                      value={address.fullName}
                      onChange={(e) =>
                        setAddress({
                          ...address,
                          fullName: e.target.value,
                        })
                      }
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="border rounded-lg p-3 w-full"
                      placeholder="Phone Number"
                      maxLength={10}
                      value={address.phone}
                      onChange={(e) =>
                        setAddress({
                          ...address,
                          phone: e.target.value.replace(/\D/g, ""),
                        })
                      }
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm">{errors.phone}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="border rounded-lg p-3 w-full"
                      placeholder="Email"
                      value={address.email}
                      onChange={(e) =>
                        setAddress({
                          ...address,
                          email: e.target.value,
                        })
                      }
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>

                  {/* House */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      House Number & Building Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="border rounded-lg p-3 w-full"
                      placeholder="House Number & Building Name"
                      value={address.house}
                      onChange={(e) =>
                        setAddress({
                          ...address,
                          house: e.target.value,
                        })
                      }
                    />
                    {errors.house && (
                      <p className="text-red-500 text-sm">{errors.house}</p>
                    )}
                  </div>

                  {/* Street */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Street Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="border rounded-lg p-3 w-full"
                      placeholder="Street Name"
                      value={address.street}
                      onChange={(e) =>
                        setAddress({
                          ...address,
                          street: e.target.value,
                        })
                      }
                    />
                    {errors.street && (
                      <p className="text-red-500 text-sm">{errors.street}</p>
                    )}
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="border rounded-lg p-3 w-full"
                      placeholder="City"
                      value={address.city}
                      onChange={(e) =>
                        setAddress({
                          ...address,
                          city: e.target.value,
                        })
                      }
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm">{errors.city}</p>
                    )}
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="border rounded-lg p-3 w-full"
                      placeholder="State"
                      value={address.state}
                      onChange={(e) =>
                        setAddress({
                          ...address,
                          state: e.target.value,
                        })
                      }
                    />
                    {errors.state && (
                      <p className="text-red-500 text-sm">{errors.state}</p>
                    )}
                  </div>

                  {/* Pincode */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PIN Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="border rounded-lg p-3 w-full"
                      placeholder="Pincode"
                      maxLength={6}
                      value={address.pincode}
                      onChange={(e) =>
                        setAddress({
                          ...address,
                          pincode: e.target.value.replace(/\D/g, ""),
                        })
                      }
                    />
                    {errors.pincode && (
                      <p className="text-red-500 text-sm">{errors.pincode}</p>
                    )}
                  </div>

                </div>

                <button
                  className="bg-pink-600 text-white px-6 py-3 rounded-lg mt-5 hover:bg-pink-700"
                  onClick={() => {
                    if (!validateAddress()) return;

                    localStorage.setItem(
                      "shippingAddress",
                      JSON.stringify(address)
                    );

                    setShowAddressForm(false);

                    alert("Address Saved Successfully");
                  }}
                >
                  Save Address
                </button>
              </>

            ) : (

              /* SAVED ADDRESS */

              <div className="text-gray-700 space-y-2 bg-gray-50 rounded-lg p-5">

                <p className="font-bold text-lg">{address.fullName}</p>

                <p>{address.phone}</p>

                <p>{address.email}</p>

                <p>{address.house}</p>

                <p>{address.street}</p>

                <p>
                  {address.city}, {address.state} - {address.pincode}
                </p>

                <p>{address.country}</p>

              </div>

            )}

          </div>

          <h2 className="font-bold mb-4">
            Discount Code?
          </h2>


          <div className="flex mb-8">

            <input
              className="border p-2 rounded-l w-full"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />

            <button
              className="bg-black text-white px-5 rounded-r"
              onClick={applyCoupon}
            >
              Apply
            </button>

          </div>

          {couponMessage && (
            <p
              className={`mt-2 text-sm ${discount > 0
                ? "text-green-600"
                : "text-red-500"
                }`}
            >
              {couponMessage}
            </p>
          )}




          {/* Summary */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-green-600 font-medium">
                <span>Discount</span>
                <span>- ₹{discount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>FREE</span>
            </div>

            <hr />

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <button
              className="w-full bg-green-600 text-white py-3 rounded-lg mt-6 hover:bg-green-700"
              onClick={() => {
                if (showAddressForm) {
                  alert("Please save your delivery address first.");
                  return;
                }
                navigate("/checkout", {
                  state: { subtotal, discount, total, cartItems }
                });
              }}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}