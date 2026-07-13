import {useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../services/api";


export default function Login(){

    const navigate = useNavigate();


    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState("");



    const handleLogin = async(e)=>{

        e.preventDefault();


        try{

            const response = await api.post(
                "login/",
                {
                    username,
                    password
                }
            );


            if(response.data.success){

                localStorage.setItem(
                    "username",
                    response.data.username
                );


                navigate("/products");

            }


        }
        catch(error){

            setError(
                "Invalid username or password"
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
        ">


        <form
        onSubmit={handleLogin}
        className="
            bg-white
            p-8
            rounded-xl
            shadow-lg
            w-full
            max-w-md
        "
        >

        <h1 className="
            text-3xl
            font-bold
            mb-6
            text-center
        ">
            Login
        </h1>


        {
        error &&
        <p className="text-red-500 mb-3">
            {error}
        </p>
        }


        <input
        className="
            w-full
            border
            p-3
            mb-4
            rounded
        "
        placeholder="Username"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
        />


        <input
        className="
            w-full
            border
            p-3
            mb-4
            rounded
        "
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />


        <button
        className="
            w-full
            bg-blue-600
            text-white
            py-3
            rounded
        "
        >
            Login
        </button>


        </form>


        </div>

    );
}