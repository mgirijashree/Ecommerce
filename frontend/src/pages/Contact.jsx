import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";
import axios from "axios";

const CONTACT_API = "https://ecommerce-7jru.onrender.com/api/contact/";

const infoCards = [
  {
    icon: MapPin,
    title: "Visit Us",
    lines: ["221B Gem Street, Jewellery District", "Chennai, Tamil Nadu, India"],
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+91 98765 43210", "Mon - Sat, 10am - 7pm"],
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["support@happyaccessories.com", "We reply within 24 hours"],
  },
  {
    icon: Clock,
    title: "Store Hours",
    lines: ["Mon - Sat: 10:00 AM - 8:00 PM", "Sunday: 11:00 AM - 5:00 PM"],
  },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const next = {};

    if (!form.name.trim()) next.name = "Please enter your name";

    if (!form.email.trim()) {
      next.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Please enter a valid email";
    }

    if (form.phone && !/^[0-9+\-\s()]{7,15}$/.test(form.phone)) {
      next.phone = "Please enter a valid phone number";
    }

    if (!form.message.trim()) next.message = "Please enter a message";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await axios.post(CONTACT_API, form);

      setSuccess({
        emailSent: res.data.email_sent,
        smsSent: res.data.sms_sent,
      });

      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      const data = err?.response?.data;

      if (data?.errors) {
        setErrors(data.errors);
      } else {
        setSubmitError(
          "Something went wrong while sending your message. Please try again."
        );
      }
    }

    setLoading(false);
  };

  return (
    <div className="bg-[#faf8f4]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-900 via-amber-700 to-amber-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="uppercase tracking-[0.3em] text-amber-200 text-sm mb-4"
          >
            We'd love to hear from you
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-amber-50/90 max-w-xl mx-auto"
          >
            Questions about an order, a product, or just want to say hi?
            Send us a message and our team will get back to you soon.
          </motion.p>
        </div>
      </section>

      {/* Info Cards */}
      <section className="max-w-7xl mx-auto px-6 -mt-12 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {infoCards.map(({ icon: Icon, title, lines }) => (
            <div
              key={title}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
            >
              <div className="w-11 h-11 rounded-xl bg-amber-700 text-white flex items-center justify-center mb-4">
                <Icon size={20} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
              {lines.map((line) => (
                <p key={line} className="text-sm text-gray-500">
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Form + Map */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg p-8 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-10"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-6">
                  <CheckCircle2 size={44} />
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  Message Sent!
                </h2>

                <p className="text-gray-600 max-w-md mx-auto">
                  Thank you for reaching out. Our team will get back to you
                  shortly.
                </p>

                <div className="mt-6 flex flex-col items-center gap-2 text-sm">
                  {success.emailSent && (
                    <span className="flex items-center gap-2 text-green-700 bg-green-50 px-4 py-2 rounded-full">
                      <Mail size={16} /> Email confirmation sent
                    </span>
                  )}
                  {success.smsSent && (
                    <span className="flex items-center gap-2 text-green-700 bg-green-50 px-4 py-2 rounded-full">
                      <MessageCircle size={16} /> SMS confirmation sent
                    </span>
                  )}
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <button
                    onClick={() => setSuccess(null)}
                    className="border border-amber-700 text-amber-700 px-6 py-3 rounded-xl font-semibold hover:bg-amber-50 transition"
                  >
                    Send Another Message
                  </button>
                  <Link
                    to="/shop"
                    className="bg-amber-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-amber-800 transition"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                noValidate
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  Send Us a Message
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  Fields marked with * are required.
                </p>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className={`w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-amber-500 ${
                        errors.name ? "border-red-400" : "border-gray-200"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      className={`w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-amber-500 ${
                        errors.email ? "border-red-400" : "border-gray-200"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className={`w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-amber-500 ${
                        errors.phone ? "border-red-400" : "border-gray-200"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">
                      Add your number to also receive an SMS confirmation.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Order query, feedback, etc."
                      className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help..."
                      className={`w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-amber-500 resize-none ${
                        errors.message ? "border-red-400" : "border-gray-200"
                      }`}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>
                </div>

                {submitError && (
                  <p className="text-red-500 text-sm mt-4">{submitError}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 w-full sm:w-auto flex items-center justify-center gap-2 bg-amber-700 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-amber-800 disabled:opacity-60 transition"
                >
                  {loading ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send size={18} /> Send Message
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Side panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl overflow-hidden shadow-lg h-56 bg-gray-200">
            <iframe
              title="store-location"
              className="w-full h-full border-0"
              loading="lazy"
              src="https://www.google.com/maps?q=Chennai,Tamil%20Nadu,India&output=embed"
            />
          </div>

          <div className="bg-amber-700 text-white rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-3">What happens next?</h3>
            <ul className="space-y-3 text-sm text-amber-50/90">
              <li className="flex gap-3">
                <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
                Your message is saved and routed to our support team.
              </li>
              <li className="flex gap-3">
                <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
                You'll instantly get an email confirmation.
              </li>
              <li className="flex gap-3">
                <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
                If you shared a phone number, we'll also text you a confirmation.
              </li>
              <li className="flex gap-3">
                <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
                Our team typically replies within 24 hours.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
