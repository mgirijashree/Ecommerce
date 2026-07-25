function Footer() {
  return (
    <footer className="bg-black text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        <div>
          <h2 className="text-xl font-bold text-yellow-500 mb-3">
            Jewelry Store
          </h2>
          <p className="text-sm leading-relaxed">
            Timeless, elegant jewellery crafted for every occasion.
            Quality you can trust, styles you'll love.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-yellow-500">Rings</a></li>
            <li><a href="#" className="hover:text-yellow-500">Earrings</a></li>
            <li><a href="#" className="hover:text-yellow-500">Necklace</a></li>
            <li><a href="#" className="hover:text-yellow-500">Watches</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-yellow-500">Contact Us</a></li>
            <li><a href="#" className="hover:text-yellow-500">Shipping Info</a></li>
            <li><a href="#" className="hover:text-yellow-500">Returns</a></li>
            <li><a href="#" className="hover:text-yellow-500">FAQs</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Stay Connected</h3>
          <p className="text-sm mb-3">
            Sign up for updates on new arrivals and offers.
          </p>
          <a
            href="mailto:support@elegantjewellery.com"
            className="text-sm text-yellow-500 hover:underline"
          >
            support@elegantjewellery.com
          </a>
        </div>

      </div>

      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Elegant Jewellery Store. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
