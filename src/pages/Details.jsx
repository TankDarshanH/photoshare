import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "../pages/HeroSection";

const Details = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    remember: false,
  });

  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const isValid = {
    name: formData.name.trim().length >= 2 && /^[A-Za-z\s]+$/.test(formData.name),
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
    phone: /^\d{10}$/.test(formData.phone),
  };

  const errorText = {
    name: "Enter at least 2 letters (no numbers)",
    email: "Enter a valid email",
    phone: "Enter a 10-digit number",
  };

  const isFormComplete = Object.values(isValid).every(Boolean);

  const handleSubmit = () => {
    if (isFormComplete) {
      navigate("/loading");
    }
  };

  return (
    <div className="min-h-screen bg-black text-black px-4 py-4 flex items-start justify-center">
      <div className="w-[320px] bg-white shadow-lg rounded-md">
        <HeroSection />

        <div className="px-4 py-6 space-y-4">
          <h2 className="font-bold text-base">Welcome to Amit's Wedding Photos!</h2>
          <p className="text-sm leading-5">
            With Photoshare AI, you can access all photos of events Or limited photos Or you can search <strong>YOUR</strong> photo from thousands of photos through our <strong>AI Technology</strong>
          </p>

          <p className="font-semibold text-sm pt-4">Enter your details and start!</p>

          <div className="space-y-3">
          
            <div>
              <label className="block text-sm font-medium mb-1">Full Name*</label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, "");
                }}
                className={`w-full border ${
                  touched.name && !isValid.name ? "border-red-400" : "border-gray-300"
                } rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {touched.name && !isValid.name && (
                <p className="text-xs text-red-500 mt-1">{errorText.name}</p>
              )}
            </div>

         
            <div>
              <label className="block text-sm font-medium mb-1">Email*</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full border ${
                  touched.email && !isValid.email ? "border-red-400" : "border-gray-300"
                } rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {touched.email && !isValid.email && (
                <p className="text-xs text-red-500 mt-1">{errorText.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone Number*</label>
              <input
                name="phone"
                type="text"
                inputMode="numeric"
                maxLength={10}
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                }}
                className={`w-full border ${
                  touched.phone && !isValid.phone ? "border-red-400" : "border-gray-300"
                } rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {touched.phone && !isValid.phone && (
                <p className="text-xs text-red-500 mt-1">{errorText.phone}</p>
              )}
            </div>

   
            <div className="flex items-center gap-2">
              <input
                name="remember"
                type="checkbox"
                checked={formData.remember}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <label className="text-sm">Remember Me</label>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!isFormComplete}
            className={`w-full h-12 text-white font-semibold text-base rounded transition ${
              isFormComplete
                ? "bg-black cursor-pointer"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          >
            Go to Photos
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;








