import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";


export default function Register(){

    const navigate = useNavigate();


    const [form,setForm] = useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    });


    const [errors,setErrors] = useState({});

    const [serverError,setServerError] = useState("");

    const [success,setSuccess] = useState("");



    const handleChange=(e)=>{

        setForm({
            ...form,
            [e.target.name]:e.target.value
        });


        // remove field error while typing
        setErrors({
            ...errors,
            [e.target.name]:""
        });

    };



    const validate = ()=>{

        let newErrors={};


        if(!form.username.trim()){

            newErrors.username=
            "Username is required";

        }


        if(!form.email.trim()){

            newErrors.email=
            "Email is required";

        }
        else if(
            !/\S+@\S+\.\S+/.test(form.email)
        ){

            newErrors.email=
            "Enter a valid email address";

        }



        if(!form.password){

            newErrors.password=
            "Password is required";

        }
        else if(form.password.length < 6){

            newErrors.password=
            "Password must contain minimum 6 characters";

        }



        if(!form.confirmPassword){

            newErrors.confirmPassword=
            "Please confirm your password";

        }
        else if(
            form.password !== form.confirmPassword
        ){

            newErrors.confirmPassword=
            "Passwords do not match";

        }


        return newErrors;

    };



    const handleRegister = async (e) => {

    e.preventDefault();

    try {

        const response = await api.post(
            "register/",
            form
        );


        if (response.data.success) {

            setMessage(
                "Registration successful! Redirecting to login..."
            );


            setTimeout(() => {

                navigate("/login");

            }, 1500);

        }

    }
    catch (error) {

        setMessage(
            error.response?.data?.message ||
            "Registration failed"
        );

    }

};



    return(

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

    className="
        w-full
        border
        rounded-lg
        p-3
    "

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

    className="
        w-full
        border
        rounded-lg
        p-3
        mt-4
    "

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

    className="
        w-full
        border
        rounded-lg
        p-3
        mt-4
    "

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

    className="
        w-full
        border
        rounded-lg
        p-3
        mt-4
    "

    />


    {
    errors.confirmPassword &&

    <p className="text-red-500 text-sm mt-1">
        {errors.confirmPassword}
    </p>

    }




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

    onClick={()=>navigate("/login")}

    className="
        text-blue-600
        ml-2
    "

    >
        Login
    </button>

    </p>



    </form>


    </div>

    );

}