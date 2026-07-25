import { useState } from "react";

function Register() {

    const [form, setForm] = useState({

        username: "",

        email: "",

        password: ""

    });

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        await fetch(

            "http://127.0.0.1:8000/register/",

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(form)

            }

        );

        alert("Registered Successfully");

    };

    return (

        <div>

            Register Form

        </div>

    );

}

export default Register;