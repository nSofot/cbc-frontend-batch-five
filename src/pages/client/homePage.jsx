import { Fragment } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiShoppingBag,
  FiCreditCard,
  FiTruck,
} from "react-icons/fi";
import { FaStar } from "react-icons/fa";

export default function Home() {
  /* ------------------ dummy spotlight data ------------------ */
  const spotlight = [
    {
      id: 1,
      name: "Hydra Glow Serum",
      price: "Rs 4,990",
      img: "/products/serum.jpg",
    },
    {
      id: 2,
      name: "Velvet Matte Lipstick",
      price: "Rs 2,450",
      img: "/products/lipstick.jpg",
    },
    {
      id: 3,
      name: "Renew Night Cream",
      price: "Rs 5,600",
      img: "/products/nightcream.jpg",
    },
  ];

  /* --------------------------- UI --------------------------- */
  return (
    <Fragment>
      {/* ---------- HERO ---------- */}
      <section className="relative h-[70vh] bg-gradient-to-r from-pink-500 to-indigo-600 flex items-center justify-center overflow-hidden">
        <motion.img
          src="/hero-beauty.jpg"          // wide image in /public
          alt="Beauty banner"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        />

        <div className="relative text-center text-white px-4">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold drop-shadow-lg"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Elevate Your Everyday&nbsp;Glow
          </motion.h1>

          <motion.p
            className="mt-4 max-w-xl mx-auto text-lg md:text-xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Shop Sri Lanka’s best‑loved skincare &amp; beauty picks, delivered
            fast and sustainably.
          </motion.p>

          <motion.div
            className="mt-8 flex justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Link
              to="/products"
              className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-full shadow hover:bg-gray-100"
            >
              Shop Now
            </Link>
            <Link
              to="/about"
              className="px-6 py-3 border border-white font-semibold rounded-full hover:bg-white hover:text-indigo-600"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ---------- FEATURES ---------- */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-8 text-center">
          {[
            {
              icon: <FiTruck size={36} />,
              title: "Express Delivery",
              desc: "Colombo same‑day, island‑wide in 2‑3 days",
            },
            {
              icon: <FiCreditCard size={36} />,
              title: "Secure Payments",
              desc: "Card, bank transfer, Cash‑on‑Delivery",
            },
            {
              icon: <FiShoppingBag size={36} />,
              title: "100% Authentic",
              desc: "We’re an authorised retailer—no fakes, ever",
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center">
              <div className="text-indigo-600">{icon}</div>
              <h3 className="mt-3 font-bold">{title}</h3>
              <p className="mt-1 text-gray-600 text-sm text-center px-4">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- SPOTLIGHT / BESTSELLERS ---------- */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Trending Now
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {spotlight.map((item, idx) => (
            <motion.article
              key={item.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link to={`/product/${item.id}`}>
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="mt-2 text-indigo-600 font-bold">
                    {item.price}
                  </p>

                  <p className="mt-2 flex items-center gap-1 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} size={14} />
                    ))}
                    <span className="ml-1 text-sm text-gray-600">(1 k reviews)</span>
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-block px-8 py-3 border border-indigo-600 text-indigo-600 font-semibold rounded-full hover:bg-indigo-50"
          >
            Browse All Products
          </Link>
        </div>
      </section>

      {/* ---------- CTA BANNER ---------- */}
      <section className="w-full bg-indigo-600 text-white py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          Join our Beauty Insider Club
        </h2>
        <p className="mt-4 max-w-2xl mx-auto">
          Get 10% off your first order, early access to sales, and exclusive
          content straight to your inbox.
        </p>
        <Link
          to="/register"
          className="mt-8 inline-block px-8 py-3 bg-white text-indigo-600 font-semibold rounded-full shadow hover:bg-gray-100"
        >
          Sign Up Free
        </Link>
      </section>
    </Fragment>
  );
}
