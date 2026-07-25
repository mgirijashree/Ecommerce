import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";


export default function Cart() {

  const {
    cart,
    increase,
    decrease,
    removeItem,
    total
  } = useCart();

  const navigate = useNavigate();



  if (cart.length === 0) {

    return (

      <div className="
            min-h-screen
            flex
            flex-col
            items-center
            justify-center
            bg-[#fffaf0]
            ">

        <ShoppingBag
          size={70}
          className="text-yellow-700 mb-5"
        />

        <h1 className="
                text-3xl
                font-bold
                text-gray-700
                ">
          Your Cart is Empty
        </h1>


        <Link
          to="/shop"
          className="
                mt-6
                bg-yellow-700
                text-white
                px-8
                py-3
                rounded-full
                "
        >

          Continue Shopping

        </Link>


      </div>

    )

  }



  return (

    <div className="
min-h-screen
bg-[#fffaf0]
py-10
px-6
">


      <h1 className="
text-4xl
font-bold
text-yellow-800
mb-10
text-center
">

        Happy Accessories Cart

      </h1>



      <div className="
max-w-7xl
mx-auto
grid
lg:grid-cols-3
gap-8
">



        {/* PRODUCTS */}

        <div className="
lg:col-span-2
space-y-5
">


          {
            cart.map((item) => (


              <div

                key={item.id}

                className="
bg-white
rounded-2xl
shadow-md
p-5
flex
gap-6
items-center
border
border-yellow-100
"


              >


                <img

                  src={item.image}

                  alt={item.name}

                  className="
w-32
h-32
object-cover
rounded-xl
"


                />



                <div className="flex-1">


                  <h2 className="
text-xl
font-bold
text-gray-800
">

                    {item.name}

                  </h2>


                  <p className="
text-yellow-700
font-semibold
text-lg
mt-2
">

                    ₹{item.price}

                  </p>



                  <div className="
flex
items-center
gap-4
mt-5
">


                    <button

                      onClick={() => decrease(item.id)}

                      className="
border
rounded-full
p-2
hover:bg-yellow-100
"

                    >

                      <Minus size={18} />

                    </button>



                    <span className="
font-bold
">

                      {item.quantity}

                    </span>



                    <button

                      onClick={() => increase(item.id)}

                      className="
border
rounded-full
p-2
hover:bg-yellow-100
"

                    >

                      <Plus size={18} />

                    </button>



                  </div>


                </div>



                <button

                  onClick={() => removeItem(item.id)}

                  className="
text-red-500
hover:text-red-700
"

                >

                  <Trash2 />

                </button>



              </div>


            ))

          }



        </div>





        {/* SUMMARY */}


        <div className="
bg-white
rounded-2xl
shadow-lg
p-8
h-fit
border
border-yellow-200
">


          <h2 className="
text-2xl
font-bold
text-yellow-800
mb-6
">

            Order Summary

          </h2>



          <div className="
flex
justify-between
mb-4
">

            <span>
              Subtotal
            </span>


            <span>
              ₹{total.toFixed(2)}
            </span>


          </div>



          <div className="
flex
justify-between
mb-4
">

            <span>
              Delivery
            </span>


            <span>
              Free
            </span>


          </div>



          <hr className="my-5" />



          <div className="
flex
justify-between
text-2xl
font-bold
">

            <span>
              Total
            </span>


            <span className="text-yellow-800">

              ₹{total.toFixed(2)}

            </span>


          </div>




          <button

            onClick={() => navigate("/checkout")}

            className="
bg-yellow-600
text-white
px-6
py-3
rounded-lg
"

          >

            Proceed To Checkout

          </button>


        </div>



      </div>


    </div>

  )

}