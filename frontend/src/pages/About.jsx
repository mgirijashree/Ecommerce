import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Gem, ShieldCheck, Truck, HeartHandshake, Sparkles, Award } from "lucide-react";

import ring1 from "../assets/images/ring1.jpg";
import necklace1 from "../assets/images/necklace1.jpg";
import bracelet1 from "../assets/images/bracelet1.jpg";
import earring1 from "../assets/images/earring1.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const values = [
  {
    icon: Gem,
    title: "Handpicked Craftsmanship",
    text: "Every piece is selected for its detail, finish and lasting shine — nothing leaves our shelves unless we'd wear it ourselves.",
  },
  {
    icon: ShieldCheck,
    title: "Certified Quality",
    text: "All our diamond and gold pieces come with authenticity assurance, so you can buy with complete confidence.",
  },
  {
    icon: Truck,
    title: "Fast, Safe Delivery",
    text: "Insured, tamper-proof packaging with free shipping on orders above ₹999, delivered right to your door.",
  },
  {
    icon: HeartHandshake,
    title: "Customer First",
    text: "From easy returns to real humans on support, we're here to make sure you love what you wear.",
  },
];

const stats = [
  { value: "50K+", label: "Happy Customers" },
  { value: "1,200+", label: "Unique Designs" },
  { value: "8+", label: "Years of Trust" },
  { value: "4.8/5", label: "Average Rating" },
];

export default function About() {
  return (
    <div className="bg-[#faf8f4]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-900 via-amber-700 to-amber-600 text-white">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,white,transparent_35%)]" />
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative">
          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="uppercase tracking-[0.3em] text-amber-200 text-sm mb-4"
          >
            Our Story
          </motion.p>

          <motion.h1
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold max-w-3xl leading-tight"
          >
            Timeless Jewellery, Crafted for Every Moment
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-amber-50/90 max-w-2xl"
          >
            Happy Accessories was born from a love of fine jewellery and a
            belief that every piece should tell a story. From engagement
            rings to everyday earrings, we design and curate jewellery you'll
            treasure for years to come.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              to="/shop"
              className="bg-white text-amber-800 px-6 py-3 rounded-xl font-semibold hover:bg-amber-50 transition"
            >
              Explore Collection
            </Link>
            <Link
              to="/contact"
              className="border border-white/60 px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 -mt-10 md:-mt-14 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center py-8 px-4">
              <p className="text-3xl md:text-4xl font-bold text-amber-700">
                {stat.value}
              </p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story + Image collage */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-4"
        >
          <img
            src={ring1}
            alt="Diamond ring"
            className="rounded-2xl object-cover h-56 w-full shadow-lg"
          />
          <img
            src={necklace1}
            alt="Necklace"
            className="rounded-2xl object-cover h-56 w-full shadow-lg mt-8"
          />
          <img
            src={earring1}
            alt="Earrings"
            className="rounded-2xl object-cover h-56 w-full shadow-lg -mt-8"
          />
          <img
            src={bracelet1}
            alt="Bracelet"
            className="rounded-2xl object-cover h-56 w-full shadow-lg"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-amber-700 font-semibold flex items-center gap-2 mb-3">
            <Sparkles size={18} /> Who We Are
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Jewellery that celebrates your everyday moments
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            What started as a small atelier is now a home for thousands of
            customers who trust us with their most meaningful moments —
            proposals, anniversaries, graduations, and quiet Tuesdays that
            deserve a little sparkle too.
          </p>

          <p className="text-gray-600 leading-relaxed">
            We work directly with skilled artisans to bring you rings,
            necklaces, bracelets, earrings and watches that balance timeless
            design with modern craftsmanship — all at prices that feel fair,
            never inflated.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
              <Award size={22} />
            </div>
            <div>
              <p className="font-semibold text-gray-800">
                Award-winning design team
              </p>
              <p className="text-sm text-gray-500">
                Recognised for craftsmanship & innovation
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Values */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Why Shop With Us
            </h2>
            <p className="text-gray-500 mt-3">
              We hold ourselves to a simple standard — jewellery good enough
              to become someone's favourite piece.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map(({ icon: Icon, title, text }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#faf8f4] rounded-2xl p-7 hover:shadow-xl transition"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-700 text-white flex items-center justify-center mb-5">
                  <Icon size={22} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-amber-700 to-amber-600 rounded-3xl px-8 py-16 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_80%_20%,white,transparent_35%)]" />
          <h2 className="text-3xl md:text-4xl font-bold relative">
            Ready to find your next favourite piece?
          </h2>
          <p className="mt-3 text-amber-50/90 relative">
            Browse our full collection or reach out — our team is always
            happy to help.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 relative">
            <Link
              to="/shop"
              className="bg-white text-amber-800 px-6 py-3 rounded-xl font-semibold hover:bg-amber-50 transition"
            >
              Shop Now
            </Link>
            <Link
              to="/contact"
              className="border border-white/60 px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
