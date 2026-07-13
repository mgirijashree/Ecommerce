import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";


export default function Login() {

  const navigate = useNavigate();


  const [form, setForm] = useState({
    username: "",
    password: ""
  });


  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

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

    setServerError("");

  };



  const validate = () => {

    let newErrors = {};


    if (!form.username.trim()) {

      newErrors.username =
        "Username is required";

    }


    if (!form.password.trim()) {

      newErrors.password =
        "Password is required";

    }
    else if (form.password.length < 6) {

      newErrors.password =
        "Password must contain minimum 6 characters";

    }


    return newErrors;

  };



  const handleLogin = async (e) => {

    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {

      const response = await api.post("login/", form);

      console.log("Login Response:", response.data);

      if (response.data.success) {

        localStorage.setItem(
          "user",
          JSON.stringify({
            username: response.data.username,
            address: response.data.address,
          })
        );

        setShowSuccessModal(true);

        setTimeout(() => {
          setShowSuccessModal(false);
          navigate("/products");
        }, 5000);

      } else {

        setServerError(
          response.data.message || "Invalid username or password"
        );

      }

    } catch (error) {

      setServerError(
        error.response?.data?.message ||
        "Invalid username or password"
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

        onSubmit={handleLogin}

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
          Login
        </h1>



        {/* Server Error */}

        {
          serverError &&

          <p
            className="
                text-red-600
                text-sm
                mb-4
                text-center
            "
          >
            {serverError}
          </p>
        }



        {/* Username */}

        <label className="block mb-2 font-medium">
          Username
        </label>


        <input

          type="text"

          name="username"

          value={form.username}

          onChange={handleChange}

          placeholder="Enter username"

          className={`
            w-full
            border
            rounded-lg
            p-3
            mb-1

            ${errors.username
              ?
              "border-red-500"
              :
              "border-gray-300"
            }
        `}

        />


        {
          errors.username &&

          <p
            className="
                text-red-500
                text-sm
                mb-4
            "
          >
            {errors.username}
          </p>
        }



        {/* Password */}

        <label className="block mb-2 font-medium">
          Password
        </label>


        <input

          type="password"

          name="password"

          value={form.password}

          onChange={handleChange}

          placeholder="Enter password"

          className={`
            w-full
            border
            rounded-lg
            p-3
            mb-1

            ${errors.password
              ?
              "border-red-500"
              :
              "border-gray-300"
            }
        `}

        />


        {
          errors.password &&

          <p
            className="
                text-red-500
                text-sm
                mb-4
            "
          >
            {errors.password}
          </p>
        }




        <button

          type="submit"

          className="
            w-full
            bg-blue-600
            text-white
            py-3
            rounded-lg
            hover:bg-blue-700
            transition
        "

        >

          Login

        </button>



        <p
          className="
            text-center
            mt-5
        "
        >

          Don't have an account?

          <button

            type="button"

            onClick={() => navigate("/register")}

            className="
            text-blue-600
            ml-2
        "

          >
            Register
          </button>


        </p>



      </form>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-8 w-[90%] max-w-md text-center animate-fade-in">

            <div className="text-6xl mb-4">🎉</div>

            <h2 className="text-2xl font-bold text-green-600 mb-2">
              Login Successful
            </h2>

            <p className="text-gray-600 mb-4">
              Welcome back!
            </p>

            <p className="text-gray-500">
              Redirecting to Products page...
            </p>

            <div className="mt-6 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full animate-[progress_5s_linear]"
                style={{ width: "100%" }}
              ></div>
            </div>

          </div>
        </div>
      )}

    </div>

  );

}