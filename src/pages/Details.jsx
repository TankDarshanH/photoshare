import { useState } from "react";
import bride from "../assets/bride.jpg";
import { useNavigate } from "react-router-dom";

const Details = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    remember: false,
  });

  const isFormComplete =
    formData.name && formData.email && formData.phone;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    if (isFormComplete) {
      navigate("/loading");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-6 overflow-auto">
      <div className="w-[320px] bg-white shadow-lg rounded-none">
       
        <div className="relative">
          <img
            src={bride}
            alt="bride"
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <div className="w-7 h-7 bg-black rounded-full" />
            <span className="text-white text-base font-bold">
              Photoshare AI
            </span>
          </div>
          <div className="absolute bottom-4 left-0 w-full text-white text-center px-4">
            <div className="text-lg font-semibold">Amit's wedding</div>
            <div className="text-sm">25 May, 2025</div>
          </div>
        </div>

        <div className="px-4 py-6 space-y-4">
          <h2 className="text-black font-bold text-base">
            Welcome to Amit's Wedding Photos!
          </h2>
          <p className="text-sm text-black leading-5">
            With Photoshare AI, you can access all photos of events Or
            limited photos Or you can search <strong>YOUR</strong> photo
            from thousands of photos through our <strong>AI Technology</strong>
          </p>

          <p className="text-black font-semibold text-sm pt-4">
            Enter your details and start!
          </p>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name*
              </label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Email*
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <input
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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

