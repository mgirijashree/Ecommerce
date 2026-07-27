import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-amber-50 to-white">
      {/* Decorative floating blobs */}
      <motion.div
        aria-hidden
        className="absolute -top-16 -left-16 w-72 h-72 bg-amber-200/40 rounded-full blur-3xl"
        animate={{ y: [0, 20, 0], x: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute top-1/3 -right-20 w-80 h-80 bg-amber-300/30 rounded-full blur-3xl"
        animate={{ y: [0, -25, 0], x: [0, -10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-10 items-center relative">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-amber-700 font-semibold tracking-widest uppercase flex items-center gap-2"
          >
            <Sparkles size={18} className="text-amber-500" />
            Happy Accessories
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl font-bold mt-4 leading-tight text-gray-900"
          >
            Elegant Jewellery
            <br />
            For Every Occasion
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg text-gray-600"
          >
            Discover premium rings, earrings, bangles, bracelets and
            necklaces crafted with elegance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 mt-8 bg-amber-700 text-white px-8 py-4 rounded-xl hover:bg-amber-800 transition"
            >
              Shop Now
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <motion.img
            src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=900"
            alt="Jewellery"
            className="rounded-3xl shadow-2xl"
            whileHover={{ scale: 1.03, rotate: 0.3 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          />
        </motion.div>
      </div>
    </section>
  );
}
