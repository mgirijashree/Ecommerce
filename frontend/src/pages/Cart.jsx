import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Minus, Plus } from "lucide-react";


function Cart() {


  const navigate = useNavigate();


  const [cart, setCart] = useState(
    JSON.parse(
      localStorage.getItem("cart")
    ) || []
  );



  const updateCart = (updatedCart) => {

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

  };




  // Increase quantity

  const increaseQty = (id) => {

    const updated = cart.map(item => {

      if (item.id === id) {

        return {
          ...item,
          quantity: item.quantity + 1
        }

      }

      return item;

    });


    updateCart(updated);

  };




  // Decrease quantity

  const decreaseQty = (id) => {


    const updated = cart.map(item => {


      if (item.id === id && item.quantity > 1) {

        return {

          ...item,

          quantity: item.quantity - 1

        }

      }


      return item;


    });


    updateCart(updated);


  };




  // Remove Item

  const removeItem = (id) => {


    const updated = cart.filter(
      item => item.id !== id
    );


    updateCart(updated);


  };




  // Total

  const subtotal = cart.reduce(

    (total, item) =>

      total +
      (Number(item.price) * item.quantity),

    0

  );



  const formatPrice = (amount) => {

    return new Intl.NumberFormat(
      "en-IN",
      {
        style: "currency",
        currency: "INR"
      }

    ).format(amount);

  };



  return (

    <div className="
min-h-screen
bg-[#fffaf0]
py-10
px-5
">


      <h1 className="
text-4xl
text-center
font-serif
font-bold
text-yellow-700
mb-10
">

        Happy Accessories

        <span className="
block
text-lg
tracking-widest
text-gray-600
">

          Luxury Jewellery Collection

        </span>

      </h1>



      {
        cart.length === 0 ?

          (

            <div className="
text-center
bg-white
shadow-lg
rounded-xl
p-10
max-w-xl
mx-auto
border
border-yellow-300
">


              <h2 className="
text-2xl
text-gray-700
">

                Your cart is empty

              </h2>


              <button

                onClick={() => navigate("/shop")}

                className="
mt-5
bg-yellow-600
text-white
px-8
py-3
rounded-lg
"

              >

                Continue Shopping

              </button>


            </div>

          )

          :

          (



            <div className="
grid
lg:grid-cols-3
gap-8
max-w-7xl
mx-auto
">



              {/* Products */}


              <div className="
lg:col-span-2
space-y-5
">


                {
                  cart.map(product => (


                    <div

                      key={product.id}

                      className="
bg-white
rounded-xl
shadow-md
border
border-yellow-200
p-5
flex
gap-5
items-center
"


                    >


                      <img

                        src={product.image}

                        alt={product.name}

                        className="
w-28
h-28
object-cover
rounded-lg
border
border-yellow-300
"

                      />



                      <div className="flex-1">


                        <h2 className="
text-xl
font-semibold
text-gray-800
">

                          {product.name}

                        </h2>



                        <p className="
text-yellow-700
font-bold
mt-2
">

                          {formatPrice(product.price)}

                        </p>



                        <div className="
flex
items-center
gap-3
mt-4
">


                          <button

                            onClick={() => decreaseQty(product.id)}

                            className="
border
rounded-full
p-2
hover:bg-yellow-100
"

                          >

                            <Minus size={16} />

                          </button>


                          <span className="
font-bold
">

                            {product.quantity}

                          </span>


                          <button

                            onClick={() => increaseQty(product.id)}

                            className="
border
rounded-full
p-2
hover:bg-yellow-100
"

                          >

                            <Plus size={16} />

                          </button>



                        </div>


                      </div>




                      <button

                        onClick={() => removeItem(product.id)}

                        className="
text-red-600
hover:text-red-800
"

                      >

                        <Trash2 />

                      </button>



                    </div>


                  ))

                }


              </div>





              {/* Summary */}


              <div className="
bg-white
rounded-xl
shadow-xl
border
border-yellow-300
p-6
h-fit
">


                <h2 className="
text-2xl
font-serif
text-yellow-700
mb-5
">

                  Order Summary

                </h2>



                <div className="
flex
justify-between
mb-3
">

                  <span>
                    Items
                  </span>

                  <span>
                    {cart.length}
                  </span>

                </div>




                <div className="
border-t
pt-4
flex
justify-between
text-xl
font-bold
">


                  <span>
                    Total
                  </span>


                  <span className="
text-yellow-700
">

                    {formatPrice(subtotal)}

                  </span>


                </div>




                <button

                  onClick={() => navigate("/checkout")}

                  className="
mt-6
w-full
bg-yellow-600
hover:bg-yellow-700
text-white
py-3
rounded-lg
font-semibold
shadow-lg
"

                >

                  Proceed To Checkout

                </button>




                <button

                  onClick={() => navigate("/shop")}

                  className="
mt-3
w-full
border
border-yellow-600
text-yellow-700
py-3
rounded-lg
"

                >

                  Continue Shopping

                </button>



              </div>




            </div>


          )

      }



    </div>


  )


}


export default Cart;