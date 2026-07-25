import { Link } from "react-router-dom";

export default function CartSuccessModal({ product, close }) {

    return (

        <div className="
fixed inset-0 
bg-black/50 
flex 
items-center 
justify-center 
z-50
">


            <div className="
bg-white
rounded-2xl
p-8
w-[90%]
max-w-md
text-center
shadow-xl
">


                <div className="
text-green-600
text-5xl
mb-4
">
                    ✓
                </div>


                <h2 className="
text-2xl
font-bold
text-gray-800
mb-3
">

                    Added to Cart!

                </h2>


                <p className="mb-6">

                    {product.name} has been added successfully.

                </p>


                <div className="
flex
gap-4
justify-center
">


                    <Link

                        to="/cart"

                        className="
bg-amber-700
text-white
px-5
py-3
rounded-xl
hover:bg-amber-800
"

                    >

                        Go to Cart

                    </Link>



                    <Link

                        to="/shop"

                        onClick={close}

                        className="
                            border
                            border-amber-700
                            text-amber-700
                            px-5
                            py-3
                            rounded-xl
                            hover:bg-amber-50
                            "

                    >

                        Continue Shopping

                    </Link>


                </div>


            </div>


        </div>

    )

}