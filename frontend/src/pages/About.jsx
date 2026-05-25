import React from "react";
import Navbar from "../components/Navbar";

import { FaBrain, FaUserShield, FaUsers, FaCheckCircle } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { MdOutlineSecurity } from "react-icons/md";

function About() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-r from-emerald-50 via-emerald-100 to-teal-200">

      <Navbar />

      <div className="py-16 max-w-[1000px] w-full mx-auto px-4">

        {/* ABOUT SECTION */}
        <div className="text-center mt-12 mb-14">

          <h1 className="text-3xl md:text-4xl font-bold text-emerald-700">
            About MediCare
          </h1>

          <p className="text-gray-600 mt-4 max-w-[650px] mx-auto">
            We’re revolutionizing healthcare by making disease prediction accessible,
            accurate, and user-friendly through the power of artificial intelligence.
          </p>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">

          <div className="bg-white rounded-2xl shadow-md p-6 text-center border border-transparent hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] transition">
            <h2 className="text-3xl font-bold text-emerald-600">10K+</h2>
            <p className="text-gray-600 mt-2">Users Served</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 text-center border border-transparent hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] transition">
            <h2 className="text-3xl font-bold text-emerald-600">50+</h2>
            <p className="text-gray-600 mt-2">Symptoms Analyzed</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 text-center border border-transparent hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] transition">
            <h2 className="text-3xl font-bold text-emerald-600">20+</h2>
            <p className="text-gray-600 mt-2">Diseases Covered</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 text-center border border-transparent hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] transition">
            <h2 className="text-3xl font-bold text-emerald-600">95%</h2>
            <p className="text-gray-600 mt-2">User Satisfaction</p>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="w-full flex justify-center mb-20">
          <div className="w-[85%] h-[3px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent rounded-full shadow-lg shadow-emerald-300"></div>
        </div>

        {/* MISSION + STAND FOR */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">

          <div className="bg-white rounded-3xl shadow-lg p-8 border border-transparent hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] transition">

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Mission
            </h2>

            <p className="text-gray-600 mb-4">
              To democratize healthcare by providing everyone with access to
              AI-powered disease prediction tools.
            </p>

            <p className="text-gray-600 mb-4">
              We believe that early detection and awareness are key to better
              health outcomes.
            </p>

            <p className="text-gray-600">
              Our platform bridges the gap between symptoms and professional
              medical care.
            </p>

          </div>


          <div className="bg-white rounded-3xl shadow-lg p-8 border border-transparent hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] transition">

            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              What We Stand For
            </h2>

            <div className="space-y-4">

              <div>
                <h3 className="font-semibold text-gray-800">Accessibility</h3>
                <p className="text-gray-600 text-sm">
                  Making health insights available to everyone
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">Accuracy</h3>
                <p className="text-gray-600 text-sm">
                  Continuously improving our algorithms
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">Responsibility</h3>
                <p className="text-gray-600 text-sm">
                  Promoting professional medical consultation
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">Innovation</h3>
                <p className="text-gray-600 text-sm">
                  Pushing the boundaries of AI in healthcare
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* DIVIDER */}
        <div className="w-full flex justify-center mb-20">
          <div className="w-[85%] h-[3px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent rounded-full shadow-lg shadow-emerald-300"></div>
        </div>

        {/* CORE VALUES */}
        <div className="mb-20">

          <h2 className="text-3xl font-semibold text-center text-gray-800">
            Our Core Values
          </h2>

          <p className="text-gray-600 text-center mt-3 mb-10 max-w-[650px] mx-auto">
            These guiding principles shape how we build our technology.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            <div className="bg-white rounded-2xl shadow-md p-6 text-center border border-transparent hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] transition">
              <GiArtificialIntelligence className="text-4xl text-emerald-500 mx-auto mb-3"/>
              <h3 className="font-semibold text-gray-800 mb-3">AI-Powered</h3>
              <p className="text-gray-600 text-sm">
                Advanced machine learning algorithms analyze symptoms.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 text-center border border-transparent hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] transition">
              <FaUserShield className="text-4xl text-emerald-500 mx-auto mb-3"/>
              <h3 className="font-semibold text-gray-800 mb-3">Privacy First</h3>
              <p className="text-gray-600 text-sm">
                Your health data is encrypted and protected.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 text-center border border-transparent hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] transition">
              <FaUsers className="text-4xl text-emerald-500 mx-auto mb-3"/>
              <h3 className="font-semibold text-gray-800 mb-3">User-Centric</h3>
              <p className="text-gray-600 text-sm">
                Designed with patients in mind.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 text-center border border-transparent hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] transition">
              <FaCheckCircle className="text-4xl text-emerald-500 mx-auto mb-3"/>
              <h3 className="font-semibold text-gray-800 mb-3">Accurate Results</h3>
              <p className="text-gray-600 text-sm">
                Continuously trained on medical data.
              </p>
            </div>

          </div>

        </div>

        {/* DIVIDER */}
        <div className="w-full flex justify-center mb-20">
          <div className="w-[85%] h-[3px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent rounded-full shadow-lg shadow-emerald-300"></div>
        </div>

        {/* TECHNOLOGY */}
        <div className="mb-10">

          <h2 className="text-3xl font-semibold text-center text-gray-800">
            Our Technology
          </h2>

          <p className="text-gray-600 text-center mt-3 mb-10 max-w-[650px] mx-auto">
            MediCare is powered by advanced artificial intelligence and modern
            web technologies.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-white rounded-2xl shadow-md p-6 border border-transparent hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] transition">
              <FaBrain className="text-4xl text-emerald-500 mb-3"/>
              <h3 className="font-semibold text-gray-800 mb-2">
                Machine Learning
              </h3>
              <p className="text-gray-600 text-sm">
                Algorithms trained on large medical datasets.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 border border-transparent hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] transition">
              <GiArtificialIntelligence className="text-4xl text-emerald-500 mb-3"/>
              <h3 className="font-semibold text-gray-800 mb-2">
                Neural Networks
              </h3>
              <p className="text-gray-600 text-sm">
                Deep neural networks detect complex patterns.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 border border-transparent hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] transition">
              <MdOutlineSecurity className="text-4xl text-emerald-500 mb-3"/>
              <h3 className="font-semibold text-gray-800 mb-2">
                Web Technology
              </h3>
              <p className="text-gray-600 text-sm">
                Modern web stack ensures fast experience.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default About;