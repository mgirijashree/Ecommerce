import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ProductCard({ product }) {
  const image = product.image?.startsWith("http")
    ? product.image
    : `https://ecommerce-7jru.onrender.com${product.image}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      whileHover={{ y: -6 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow group"
    >
      <div className="overflow-hidden">
        <motion.img
          src={image}
          alt={product.name}
          className="w-full h-64 object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      <div className="p-5">
        <h3 className="font-bold text-xl">{product.name}</h3>

        <motion.p
          className="text-amber-700 font-bold mt-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          ₹{product.price}
        </motion.p>

        <Link to={`/product/${product.id}`}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="block mt-4 bg-amber-700 text-white text-center py-3 rounded-xl hover:bg-amber-800 transition-colors"
          >
            View Product
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
}
