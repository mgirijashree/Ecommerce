import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";


export default function Register(){

    const navigate = useNavigate();


    const [form,setForm] = useState({

        username:"",
        email:"",
        password:""

    });


    const [message,setMessage] = useState("");



    const handleChange = (e)=>{

        setForm({

            ...form,

            [e.target.name]:e.target.value

        });

    };



    const handleRegister = async(e)=>{

        e.preventDefault();


        try{

            const response = await api.post(
                "register/",
                form
            );


            if(response.data.success){

                setMessage(
                    "Registration successful"
                );


                setTimeout(()=>{

                    navigate("/login");

                },1000);

            }


        }
        catch(error){

            setMessage(
                error.response?.data?.message ||
                "Registration failed"
            );

        }

    };



    return (

        <div
        className="
            min-h-screen
            flex
            items-center
            justify-center
            bg-gray-100
            px-4
        "
        >


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


        <h1
        className="
            text-3xl
            font-bold
            text-center
            mb-6
        "
        >
            Create Account
        </h1>



        {
            message &&

            <p className="
                text-center
                text-blue-600
                mb-4
            ">
                {message}
            </p>
        }



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
            mb-4
        "

        />



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
            mb-4
        "

        />



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
            mb-5
        "

        />



        <button

        className="
            w-full
            bg-green-600
            text-white
            py-3
            rounded-lg
            hover:bg-green-700
        "

        >

            Register

        </button>



        <p
        className="
            text-center
            mt-4
        "
        >

        Already have account?

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