import React from "react";

const features = [
  {
    icon: "🤖",
    title: "AI-Powered Analysis",
    tag: "Smart Prediction",
    desc: "Advanced machine learning algorithms analyze your symptoms to provide accurate disease predictions."
  },
  {
    icon: "🔒",
    title: "Secure & Private",
    tag: "Data Protection",
    desc: "Your health data is encrypted and protected with industry-standard security measures."
  },
  {
    icon: "⚡",
    title: "Instant Results",
    tag: "Fast Diagnosis",
    desc: "Get immediate insights about potential health conditions based on your symptoms."
  }
];

function WhyChoose() {
  return (
    <div className="w-full py-12 flex justify-center px-4
    bg-gradient-to-b from-white via-emerald-100 to-white overflow-x-hidden">

      <div className="w-full max-w-[1100px]">

        {/* Heading */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Why Choose <span className="text-emerald-600">MediCare?</span>
          </h2>

          <p className="text-gray-500 mt-2 max-w-[650px] mx-auto text-sm md:text-base">
            Our platform combines cutting-edge AI technology with medical expertise
            to provide reliable health insights.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center">

          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 md:p-7 text-center
              shadow-md hover:shadow-xl hover:-translate-y-1
              transition duration-300
              max-w-[260px] w-full min-h-[230px]
              border border-emerald-200"
            >

              {/* Icon */}
              <div className="text-emerald-500 text-3xl md:text-4xl mb-4">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-base md:text-lg font-semibold text-gray-800">
                {item.title}
              </h3>

              {/* Tag Badge */}
              <div className="mt-3 inline-block bg-emerald-50 text-emerald-700 text-xs px-3 py-1 rounded-full">
                {item.tag}
              </div>

              {/* Description */}
              <p className="text-gray-500 text-xs md:text-sm mt-4 leading-relaxed">
                {item.desc}
              </p>

            </div>
          ))}

        </div>

        {/* GREEN GLOW DIVIDER */}
        <div className="w-full flex justify-center mt-10 md:mt-12">
          <div className="w-[85%] h-[3px]
          bg-gradient-to-r from-transparent via-emerald-400 to-transparent
          rounded-full shadow-lg shadow-emerald-300">
          </div>
        </div>

      </div>

    </div>
  );
}

export default WhyChoose;