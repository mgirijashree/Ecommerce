import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  "Rings",
  "Earrings",
  "Bracelets",
  "Bangles",
  "Necklaces",
  "Hoops",
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function CategorySection() {
  return (
    <section className="max-w-7xl mx-auto py-20 px-6">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-12"
      >
        Shop By Category
      </motion.h2>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid md:grid-cols-3 lg:grid-cols-6 gap-6"
      >
        {categories.map((cat) => (
          <motion.div key={cat} variants={item}>
            <Link to={`/shop?category=${encodeURIComponent(cat)}`}>
              <motion.div
                whileHover={{ y: -6, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition-shadow"
              >
                <motion.div
                  className="text-5xl mb-4"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  💎
                </motion.div>

                <h3 className="font-semibold">{cat}</h3>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
