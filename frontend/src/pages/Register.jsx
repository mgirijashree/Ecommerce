import { useState } from "react";

function Register() {

    const [form, setForm] = useState({
        username: "",
        email: "",
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
                "https://ecommerce-7jru.onrender.com/register/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(form),
                }
            );

            const data = await res.json();

            if (res.ok && !data.error) {
                alert(data.message || "Registered Successfully");
                setForm({ username: "", email: "", password: "" });
            } else {
                setError(data.error || data.message || "Registration failed. Please try again.");
            }

        } catch (err) {
            setError("Something went wrong. Please try again.");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

            <div className="bg-white w-full max-w-md rounded-xl shadow p-8">

                <h1 className="text-2xl font-bold mb-6 text-center">
                    Register
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
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
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
                        {loading ? "Registering..." : "Register"}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Register;
