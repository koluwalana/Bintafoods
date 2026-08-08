import Link from "next/link";
import {
  Wheat,
  Phone,
  Mail,
  MapPin,
  AtSign,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-950 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <Wheat className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold">BINTA</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium 100% natural rice flour made from the finest rice.
              Nourishing Nigerian families with quality since day one.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-secondary">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/products", label: "Products" },
                { href: "/about", label: "About Us" },
                { href: "/cart", label: "Cart" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-secondary">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                5, Salami Eleku Cl, Awoyaya, Lagos
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4 shrink-0 text-primary" />
                08138070191, 09137447992
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4 shrink-0 text-primary" />
                hello@bintafoods.com
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <AtSign className="w-4 h-4 shrink-0 text-primary" />
                @bintafoods
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-secondary">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-3">
              Get updates on new products and exclusive offers.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-primary"
              />
              <button className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-lg transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Binta Foods. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">100% Natural Ingredients</p>
        </div>
      </div>
    </footer>
  );
}
