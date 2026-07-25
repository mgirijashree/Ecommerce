import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-10 items-center">

        <div>

          <p className="text-amber-700 font-semibold tracking-widest uppercase">
            Happy Accessories
          </p>

          <h1 className="text-6xl font-bold mt-4 leading-tight text-gray-900">

            Elegant Jewellery

            <br />

            For Every Occasion

          </h1>

          <p className="mt-6 text-lg text-gray-600">

            Discover premium rings, earrings, bangles,
            bracelets and necklaces crafted with elegance.

          </p>

          <Link
            to="/shop"
            className="inline-block mt-8 bg-amber-700 text-white px-8 py-4 rounded-xl hover:bg-amber-800 transition"
          >
            Shop Now
          </Link>

        </div>

        <div>

          <img
            src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=900"
            alt="Jewellery"
            className="rounded-3xl shadow-2xl"
          />

        </div>

      </div>
    </section>
  );
}