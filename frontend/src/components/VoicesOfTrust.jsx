import React from "react";
import D2 from "../assets/D2.png"
import D3 from "../assets/D3.png"
import D4 from "../assets/D4.png"
import D5 from "../assets/D5.png"
import D6 from "../assets/D6.png"
import P1 from "../assets/P1.jpg"
import P2 from "../assets/P2.jpg"
import P3 from "../assets/P3.png"
import P4 from "../assets/P4.jpg"
import P5 from "../assets/P5.png"

const doctors = [
  {
    name: "Dr. Rahul Mehta",
    role: "General Physician",
    text: "This Tool helps patients understand possible health conditions before visiting a clinic. It improves early awareness & saves valuable time.",
    image: D2
  },
  {
    name: "Dr. Priya Sharma",
    role: "Cardiologist",
    text: "The system provides intelligent disease predictions based on symptoms. It is a great support tool for guiding patients toward the right specialist.",
    image: D3
  },
  {
    name: "Dr. Anil Kapoor",
    role: "Dermatologist",
    text: "Patients can easily check symptoms and get doctor recommendations instantly. This technology is making healthcare more accessible.",
    image: D4
  },
  {
    name: "Dr. Neha Verma",
    role: "Neurologist",
    text: "This platform helps in early detection of neurological issues and connects patients to specialized doctors efficiently.",
    image: D5
  },
  {
    name: "Dr. Sanjay Roy",
    role: "Pediatrician",
    text: "Parents can quickly assess child symptoms and get recommendations. It saves time and reduces unnecessary hospital visits.",
    image: D6
  }
];

const patients = [
  {
    name: "Aman Gupta",
    role: "Patient",
    text: "I entered my symptoms and the system suggested possible diseases along with recommended doctors. It helped me quickly book the right consultation.",
    image: P2
  },
  {
    name: "Riya Singh",
    role: "Patient",
    text: "The symptom checker is very easy to use. Within seconds I received health insights and doctor recommendations.",
    image: P1
  },
  {
    name: "Karan Patel",
    role: "Patient",
    text: "This platform helped me understand my health problem early and guided me to the right specialist doctor.",
    image: P3
  },
  {
    name: "Neha Agarwal",
    role: "Patient",
    text: "I love how simple it is to get health insights. The doctor recommendations were spot on.",
    image: P4
  },
  {
    name: "Vikram Singh",
    role: "Patient",
    text: "Saved me a lot of time and gave accurate suggestions. Highly recommend this platform.",
    image: P5
  }
];

function VoicesOfTrust() {
  return (
    <div className="w-full py-10 flex justify-center px-4
    bg-gradient-to-b from-white via-emerald-100 to-white overflow-x-hidden">

      <div className="w-full max-w-[1100px]">

        {/* Heading */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
            Voices of <span className="text-emerald-600">Trust</span>
          </h2>

          <p className="text-gray-500 mt-3 max-w-[650px] mx-auto text-sm md:text-base">
            Real experiences from doctors and patients using our AI-powered
            health prediction and recommendation system.
          </p>
        </div>

        {/* Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

          {/* Doctors Column */}
          <div className="bg-white rounded-3xl p-0 shadow-lg border border-blue-100 
          max-h-[400px] md:max-h-[450px] overflow-y-auto hide-scrollbar relative">

            <div className="bg-blue-200 text-blue-800 py-2 text-center font-semibold
            sticky top-0 z-10 rounded-t-3xl shadow-md border-b border-blue-300">
              👨‍⚕️ Medical Professionals
            </div>

            <div className="p-4 md:p-6 flex flex-col gap-5">

              {doctors.map((doc, index) => (
                <div
                  key={index}
                  className="relative bg-gray-50 rounded-2xl p-4 shadow-sm
                  hover:shadow-md transition border-l-4 border-blue-500
                  flex flex-col justify-between"
                >

                  <div className="absolute top-3 right-3 text-yellow-400">
                    ★★★★★
                  </div>

                  <div className="flex items-center gap-3">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-blue-300"
                    />

                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm md:text-base">
                        {doc.name}
                      </h4>

                      <p className="text-xs md:text-sm text-gray-500">
                        {doc.role}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-600 text-xs md:text-sm italic mt-2">
                    "{doc.text}"
                  </p>

                </div>
              ))}

            </div>
          </div>

          {/* Patients Column */}
          <div className="bg-white rounded-3xl p-0 shadow-lg border border-emerald-100 
          max-h-[400px] md:max-h-[450px] overflow-y-auto hide-scrollbar relative">

            <div className="bg-emerald-200 text-emerald-800 py-2 text-center font-semibold
            sticky top-0 z-10 rounded-t-3xl shadow-md border-b border-emerald-300">
              🧑 Patients
            </div>

            <div className="p-4 md:p-6 flex flex-col gap-5">

              {patients.map((pat, index) => (
                <div
                  key={index}
                  className="relative bg-gray-50 rounded-2xl p-4 shadow-sm
                  hover:shadow-md transition border-l-4 border-emerald-500
                  flex flex-col justify-between"
                >

                  <div className="absolute top-3 right-3 text-yellow-400">
                    ★★★★★
                  </div>

                  <div className="flex items-center gap-3">

                    <img
                      src={pat.image}
                      alt={pat.name}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-emerald-300"
                    />

                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm md:text-base">
                        {pat.name}
                      </h4>

                      <p className="text-xs md:text-sm text-gray-500">
                        {pat.role}
                      </p>
                    </div>

                  </div>

                  <p className="text-gray-600 text-xs md:text-sm italic mt-2">
                    "{pat.text}"
                  </p>

                </div>
              ))}

            </div>
          </div>

        </div>

      </div>

      {/* Hide Scrollbar */}
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

    </div>
  );
}

export default VoicesOfTrust;