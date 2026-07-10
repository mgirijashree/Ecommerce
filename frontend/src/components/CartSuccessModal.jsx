export default function CartSuccessModal({
  show,
  onClose,
  onGoToCart,
}) {

  if (!show) return null;


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl p-8 w-96 text-center shadow-xl">

        <div className="text-green-600 text-5xl mb-4">
          ✓
        </div>

        <h2 className="text-2xl font-bold mb-3">
          Item Added to Cart
        </h2>

        <p className="text-gray-600 mb-6">
          Your product has been added successfully.
        </p>


        <div className="flex gap-4 justify-center">

          <button
            onClick={onGoToCart}
            className="bg-yellow-600 text-white px-5 py-2 rounded-lg hover:bg-yellow-700"
          >
            Go to Cart
          </button>


          <button
            onClick={onClose}
            className="border px-5 py-2 rounded-lg hover:bg-gray-100"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}