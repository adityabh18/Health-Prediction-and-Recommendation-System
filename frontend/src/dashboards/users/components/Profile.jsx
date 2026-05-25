import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { authDataContext } from "../../../context/AuthContext";
import { toast } from "react-toastify";

function ProfilePage() {
  const { serverUrl } = useContext(authDataContext);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    contact: "",
  });

  // ================= FETCH USER =================
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/user/current-user`,
          { withCredentials: true }
        );

        const data = res.data;

        setUser(data);

        setFormData({
          name: data.name || data.username || "",
          email: data.email || "",
          age: data.age || "",
          gender: data.gender || "",
          contact: data.contact || "",
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [serverUrl]);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= SAVE PROFILE =================
  const handleSave = async () => {
    try {
      const res = await axios.put(
        `${serverUrl}/api/user/update-profile`,
        {
          age: formData.age,
          gender: formData.gender,
          contact: formData.contact,
        },
        { withCredentials: true }
      );
toast.success("Profile updated successfully 🎉");
      // UPDATE UI INSTANTLY
      setUser(res.data);

      setFormData({
        name: res.data.name || res.data.username || "",
        email: res.data.email || "",
        age: res.data.age || "",
        gender: res.data.gender || "",
        contact: res.data.contact || "",
      });

      setEditMode(false);
    } catch (err) {
      console.log(err);
       const msg = err?.response?.data?.message;

    if (msg) {
      toast.error(msg);
    } else {
      toast.error("Profile update failed ❌");
    }
    }
  };

  // ================= SAFE INITIAL =================
  const getInitial = (name = "") => {
    const clean = String(name || "").trim();
    return clean ? clean.charAt(0).toUpperCase() : "U";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        No user found
      </div>
    );
  }

  const displayName = user.name || user.username || "User";

  // ================= FIELDS =================
  const fields = [
    {
      label: "Full Name",
      name: "name",
      type: "text",
      value: formData.name,
      disabled: true,
      show: true,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      value: formData.email,
      disabled: true,
      show: true,
    },
    {
      label: "Age",
      name: "age",
      type: "number",
      placeholder: "Enter age",
      disabled: !editMode,
      show: true,
    },
    {
      label: "Gender",
      name: "gender",
      type: "select",
      options: ["Male", "Female", "Other"],
      disabled: !editMode,
      show: true,
    },
    {
      label: "Contact Number",
      name: "contact",
      type: "text",
      placeholder: "Enter contact number",
      disabled: !editMode,
      show: true,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-emerald-50 to-teal-200 px-4 py-10">

      {/* CARD */}
      <div
        className="bg-white p-6 sm:p-8 rounded-3xl w-full max-w-sm md:max-w-md
        shadow-md border border-emerald-200
        transition duration-300
        hover:shadow-xl hover:-translate-y-2"
      >

        {/* AVATAR */}
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white flex items-center justify-center text-2xl font-bold shadow-md">
          {getInitial(displayName)}
        </div>

        {/* NAME + EMAIL */}
        <div className="text-center mt-4">
          <h2 className="text-xl font-bold text-gray-800">
            {displayName}
          </h2>

          <p className="text-gray-500 text-sm">
            {user.email}
          </p>
        </div>

        {/* FIELDS */}
        <div className="grid grid-cols-1 gap-4 mt-6">

          {fields.map((field) => {
            if (!field.show) return null;

            return (
              <div key={field.name}>

                <label className="text-sm text-gray-600">
                  {field.label}
                </label>

                <div
                  className={`rounded-full px-4 py-2 mt-1 shadow-sm ${
                    field.disabled
                      ? "bg-gray-100"
                      : "bg-emerald-50"
                  }`}
                >

                  {field.type === "select" ? (
                    <select
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      disabled={field.disabled}
                      className="bg-transparent w-full text-sm outline-none"
                    >
                      <option value="">Select...</option>

                      {field.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={
                        field.disabled
                          ? field.value || formData[field.name]
                          : formData[field.name]
                      }
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      disabled={field.disabled}
                      className="bg-transparent w-full text-sm outline-none"
                    />
                  )}

                </div>
              </div>
            );
          })}

        </div>

        {/* BUTTON */}
        <div className="flex justify-center mt-6">

          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="px-6 py-3 w-[80%] rounded-full text-white font-medium
              bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600
              shadow-md shadow-emerald-200
              hover:shadow-2xl hover:-translate-y-1
              transition-all duration-300"
            >
              Edit Info
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="px-6 py-3 w-[80%] rounded-full text-white font-medium
              bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600
              shadow-md shadow-emerald-200
              hover:shadow-2xl hover:-translate-y-1
              transition-all duration-300"
            >
              Save Info
            </button>
          )}

        </div>

      </div>
    </div>
  );
}

export default ProfilePage;