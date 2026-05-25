import { useContext, useState } from "react";
import { userDataContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  const { userData, logout } = useContext(userDataContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(); 
    setProfileOpen(false);
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 100);
  };

  const getInitial = () => {
    if (userData && userData.username) {
      return userData.username.charAt(0).toUpperCase();
    }
    return "";
  };

  return (
    <div className="w-full h-[75px] bg-white/80 backdrop-blur-md border-b border-emerald-100 fixed top-0 left-0 z-50 flex items-center justify-between px-4 md:px-6 shadow-lg">
      {/* LOGO */}
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 md:w-16 md:h-16">
          <img src={logo} alt="logo" className="w-full h-full object-contain" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
            Medicare
          </h1>
          <p className="text-xs text-gray-500 hidden sm:block">
            Healthcare Solutions
          </p>
        </div>
      </div>

      {/* DESKTOP NAV */}
      <div className="hidden md:flex h-[45px] font-semibold items-center justify-center rounded-full border border-emerald-200">
        <ul className="flex items-center gap-8 px-6 text-gray-700 font-medium">
          <li>
            <Link to="/" className="hover:text-emerald-600 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/doctors" className="hover:text-emerald-600 transition">
              Doctor
            </Link>
          </li>
          {userData && (
            <li>
              <Link
                to="/services"
                className="hover:text-emerald-600 transition"
              >
                Services
              </Link>
            </li>
          )}
          <li>
            <Link to="/about" className="hover:text-emerald-600 transition">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-emerald-600 transition">
              Contact
            </Link>
          </li>
        </ul>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        {!userData ? (
          <button
            onClick={() => navigate("/signin")}
            className="hidden md:block px-5 py-2 rounded-full bg-emerald-600 text-white font-medium shadow-md hover:bg-emerald-700 transition"
          >
            Login
          </button>
        ) : (
          <div className="relative">
            <div
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center cursor-pointer select-none"
            >
              {getInitial()}
            </div>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg p-2 flex flex-col gap-2 z-50">
                <button
                  onClick={() => {
                    if (userData?.role === "doctor") {
                      navigate("/doctor-dashboard");
                    } else {
                      navigate("/user-dashboard");
                    }
                    setProfileOpen(false);
                  }}
                  className="text-left px-2 py-1 hover:bg-emerald-100 rounded"
                >
                  View Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="text-left px-2 py-1 hover:bg-red-100 rounded text-red-500"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        {/* MOBILE MENU ICON */}
        <div
          className="md:hidden text-3xl cursor-pointer select-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="absolute top-[75px] left-0 w-full bg-white border-t border-emerald-100 shadow-md md:hidden">
          <ul className="flex flex-col items-center gap-6 py-6 text-gray-700 font-medium">
            <Link to="/">Home</Link>
            <Link to="/doctors">Doctor</Link>
            {userData && <Link to="/services">Services</Link>}
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>

            {!userData ? (
              <button
                onClick={() => navigate("/signin")}
                className="px-6 py-2 rounded-full bg-emerald-600 text-white font-medium shadow-md hover:bg-emerald-700 transition"
              >
                Login
              </button>
            ) : (
              <>
                <Link to="/user-dashboard">Dashboard</Link>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 rounded-full bg-red-500 text-white font-medium shadow-md hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
