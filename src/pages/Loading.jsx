import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Loading = () => {
  const [error, setError] = useState(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
   
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((res) => {
        if (!res.ok) throw new Error("API request failed");
        return res.json();
      })
      .then((data) => {
        console.log("API success:", data);

  
        return navigator.mediaDevices.getUserMedia({ video: true });
      })
      .then((stream) => {

        stream.getTracks().forEach(track => track.stop());

        setTimeout(() => {
          navigate("/albums");
        }, 1000);
      })
      .catch((err) => {
        console.error("Error during loading:", err);

  
        if (
          err.name === "NotAllowedError" ||
          err.name === "PermissionDeniedError"
        ) {
          setPermissionDenied(true);
        } else {
          setError("Something went wrong. Please try again.");
        }
      });
  }, );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black px-4">
    
      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 border-[5px] border-black shadow-lg mb-6 animate-pulse"></div>

  
      {!error && !permissionDenied ? (
        <p className="text-xl font-extrabold text-center tracking-wide">
          Loading<span className="animate-pulse font-extrabold">...</span>
        </p>
      ) : permissionDenied ? (
        <div className="text-center max-w-xs">
          <p className="text-red-600 font-semibold text-base">
            Camera permission denied.
          </p>
          <p className="text-sm mt-2 text-gray-700">
            Please allow camera access from your browser settings to continue.
          </p>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-red-600 font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-black text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
};

export default Loading;

