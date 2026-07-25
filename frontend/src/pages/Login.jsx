import { useState } from "react";

function Login({ onClose, onSwitchToRegister, onSuccess }) {

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const res = await fetch(
                "https://ecommerce-7jru.onrender.com/login/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(form),
                }
            );

            const data = await res.json();

            if (data.success) {
                localStorage.setItem("username", data.username);
                onSuccess(data.username);
            } else {
                setError(data.message || "Invalid username or password");
            }

        } catch (err) {
            setError("Something went wrong. Please try again.");
        }

        setLoading(false);
    };

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">

            <div className="bg-white w-full max-w-md rounded-xl shadow p-8 relative">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-2xl leading-none text-gray-500 hover:text-black"
                    aria-label="Close"
                >
                    ×
                </button>

                <h1 className="text-2xl font-bold mb-6 text-center">
                    Login
                </h1>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                        className="border w-full p-3 rounded mb-4"
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="border w-full p-3 rounded mb-4"
                        required
                    />

                    {error && (
                        <p className="text-red-600 text-sm mb-4">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-3 rounded hover:bg-amber-700 disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                <p className="text-center text-sm text-gray-500 mt-5">
                    Don't have an account?{" "}
                    <button
                        onClick={onSwitchToRegister}
                        className="text-amber-700 font-medium hover:underline"
                    >
                        Register
                    </button>
                </p>

            </div>

        </div>
    );
}

export default Login;
