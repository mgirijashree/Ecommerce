import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";


export default function Register() {

    const navigate = useNavigate();


    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: ""
    });


    const [errors, setErrors] = useState({});

    const [serverError, setServerError] = useState("");

    const [success, setSuccess] = useState("");

    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });


        // remove field error while typing
        setErrors({
            ...errors,
            [e.target.name]: ""
        });

    };



    const validate = () => {

        let newErrors = {};

        if (!form.username.trim()) {
            newErrors.username = "Username is required";
        } else if (form.username.length < 3) {
            newErrors.username = "Username must be at least 3 characters";
        }

        if (!form.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = "Enter a valid email address";
        }

        if (!form.password) {
            newErrors.password = "Password is required";
        } else if (form.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (!form.confirmPassword) {
            newErrors.confirmPassword = "Confirm Password is required";
        } else if (form.password !== form.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (!form.address.trim()) {
            newErrors.address = "Address is required";
        } else if (form.address.length < 10) {
            newErrors.address = "Address should contain at least 10 characters";
        }

        return newErrors;
    };

    const handleRegister = async (e) => {

        e.preventDefault();

        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setServerError("");

        try {

            const response = await api.post("register/", {
                username: form.username,
                email: form.email,
                password: form.password,
                address: form.address
            });

            if (response.data.success) {

                setShowSuccessModal(true);

            }

        } catch (error) {

            setServerError(
                error.response?.data?.message ||
                "Registration failed"
            );

        }

    };

    return (

        <div className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-100
        px-4
    ">


            <form

                onSubmit={handleRegister}

                className="
        bg-white
        shadow-xl
        rounded-xl
        p-8
        w-full
        max-w-md
    "

            >


                <h1 className="
        text-3xl
        font-bold
        text-center
        mb-6
    ">
                    Create Account
                </h1>



                {serverError && (

                    <p className="
            text-red-600
            bg-red-100
            p-2
            rounded
            mb-4
        ">
                        {serverError}
                    </p>

                )}



                {success && (

                    <p className="
            text-green-600
            bg-green-100
            p-2
            rounded
            mb-4
        ">
                        {success}
                    </p>

                )}




                {/* Username */}

                <input

                    name="username"

                    placeholder="Username"

                    value={form.username}

                    onChange={handleChange}

                    className={`w-full border rounded-lg p-3 ${errors.username ? "border-red-500" : "border-gray-300"
                        }`}

                />

                {
                    errors.username &&

                    <p className="text-red-500 text-sm mt-1">
                        {errors.username}
                    </p>
                }




                {/* Email */}

                <input

                    name="email"

                    type="email"

                    placeholder="Email"

                    value={form.email}

                    onChange={handleChange}

                    className={`w-full border rounded-lg p-3 ${errors.username ? "border-red-500" : "border-gray-300"
                        }`}

                />

                {
                    errors.email &&

                    <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                    </p>

                }




                {/* Password */}

                <input

                    name="password"

                    type="password"

                    placeholder="Password"

                    value={form.password}

                    onChange={handleChange}

                    className={`w-full border rounded-lg p-3 ${errors.username ? "border-red-500" : "border-gray-300"
                        }`}
                />


                {
                    errors.password &&

                    <p className="text-red-500 text-sm mt-1">
                        {errors.password}
                    </p>

                }




                {/* Confirm Password */}

                <input

                    name="confirmPassword"

                    type="password"

                    placeholder="Confirm Password"

                    value={form.confirmPassword}

                    onChange={handleChange}

                    className={`w-full border rounded-lg p-3 ${errors.username ? "border-red-500" : "border-gray-300"
                        }`}

                />


                {
                    errors.confirmPassword &&

                    <p className="text-red-500 text-sm mt-1">
                        {errors.confirmPassword}
                    </p>

                }



                <textarea

                    name="address"

                    placeholder="Enter your address"

                    value={form.address}

                    onChange={handleChange}

                    className={`w-full border rounded-lg p-3 ${errors.username ? "border-red-500" : "border-gray-300"
                        }`}

                ></textarea>

                {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.address}
                    </p>
                )}


                <button

                    className="
                        w-full
                        bg-green-600
                        text-white
                        py-3
                        rounded-lg
                        mt-6
                        hover:bg-green-700
                    "

                >

                    Register

                </button>



                <p className="
                    text-center
                    mt-4
                ">

                    Already have an account?

                    <button

                        type="button"

                        onClick={() => navigate("/login")}

                        className="
                            text-blue-600
                            ml-2
                            "

                    >
                        Login
                    </button>

                </p>



            </form>



            {showSuccessModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

                    <div className="bg-white rounded-xl shadow-xl p-8 w-96 text-center">

                        <div className="text-6xl mb-4">✅</div>

                        <h2 className="text-2xl font-bold mb-2">
                            Registration Successful
                        </h2>

                        <p className="text-gray-600 mb-6">
                            Your account has been created successfully.
                        </p>

                        <button
                            onClick={() => {

                                setShowSuccessModal(false);

                                navigate("/login");

                            }}
                            className="bg-green-600 text-white px-6 py-2 rounded-lg"
                        >
                            Continue
                        </button>

                    </div>

                </div>
            )}
        </div>

    );

}