import React from "react";
import logo from "../assets/logo.png";

function Footer() {
  return (
    <footer className="w-full py-14 px-4 bg-gradient-to-b from-white via-emerald-100 to-white text-gray-800 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] overflow-x-hidden">

      <div className="max-w-[1100px] mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 text-center lg:text-left">

        {/* Logo */}
        <div className="flex flex-col items-center lg:items-start gap-4">

          <img
            src={logo}
            alt="HealthPredict Logo"
            className="w-16 h-16 object-contain"
          />

          <div>
            <h3 className="text-2xl font-semibold text-emerald-600">
              MediCare
            </h3>

            <p className="text-gray-500 text-sm mt-1 max-w-[260px]">
              AI-powered health prediction & doctor recommendation system
            </p>
          </div>

        </div>


        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-10 text-gray-600 items-center lg:items-start">

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3 text-gray-800">Quick Links</h4>

            <ul className="space-y-2">
              <li><a href="/" className="hover:text-emerald-600 transition">Home</a></li>
              <li><a href="/doctors" className="hover:text-emerald-600 transition">Doctors</a></li>
              <li><a href="/services" className="hover:text-emerald-600 transition">Services</a></li>
              <li><a href="/contact" className="hover:text-emerald-600 transition">Contact</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-3 text-gray-800">Resources</h4>

            <ul className="space-y-2">
              <li><a href="#" className="hover:text-emerald-600 transition">FAQ</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition">Terms & Conditions</a></li>
            </ul>
          </div>

        </div>


        {/* Contact */}
        <div className="flex flex-col items-center lg:items-start">

          <h4 className="font-semibold mb-3 text-gray-800">Contact</h4>

          <p className="text-sm">bhaditya18252004@gmail.com</p>
          <p className="text-sm mt-1">+91 8400257717</p>

          <div className="flex gap-4 mt-4 text-lg">

            <span className="cursor-pointer hover:text-emerald-600 transition">🌐</span>
            <span className="cursor-pointer hover:text-emerald-600 transition">🐦</span>
            <span className="cursor-pointer hover:text-emerald-600 transition">📘</span>

          </div>

        </div>

      </div>


      {/* Bottom */}
      <div className="mt-10 border-t border-gray-300 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Medicare. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;