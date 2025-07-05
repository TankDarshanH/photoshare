import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "../pages/HeroSection";

const PinEntry = () => {
  const [pin, setPin] = useState(["", "", "", ""]);
  const inputs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    if (value && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const isComplete = pin.every((val) => val !== "");

  const handleLogin = () => {
    if (isComplete) {
      navigate("/details");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-[320px] h-[700px] bg-white shadow-lg overflow-hidden">
        <HeroSection />

        <div className="p-6">
          <p className="text-left text-black font-medium text-base mb-6 mt-0">
            Enter the PIN shared with you
          </p>
          <div className="flex justify-between mb-6 gap-2">
            {pin.map((val, i) => (
              <input
                key={i}
                type="text"
                value={val}
                maxLength={1}
                onChange={(e) => handleChange(e.target.value, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                ref={(el) => (inputs.current[i] = el)}
                className="w-12 h-16 border-2 border-gray-300 text-center text-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>
          <button
            onClick={handleLogin}
            disabled={!isComplete}
            className={`w-full h-12 text-white text-lg font-semibold transition ${
              isComplete
                ? "bg-black cursor-pointer"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default PinEntry;






