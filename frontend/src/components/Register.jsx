// frontend/src/components/Register.jsx
import React, { useState } from 'react';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', password: '', email: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/register/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        if (response.ok) alert('Registration successful!');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input name="username" placeholder="Username" onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Register</button>
        </form>
    );
};
export default Register;