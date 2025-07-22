import { useState, useEffect, useRef } from "react";
import { BsDownload } from "react-icons/bs";
import { TbHeart, TbHeartFilled, TbShare, TbFocusCentered } from "react-icons/tb";
import { SlOptionsVertical } from "react-icons/sl";
import bride from "../assets/bride.jpg";


const sessions = ["All", "Haldi", "Wedding", "Reception"];

const AlbumGallery = () => {
  const [selectedSession, setSelectedSession] = useState("All");
  const [photos, setPhotos] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [likedPhotos, setLikedPhotos] = useState({});
  const [showCameraModal, setShowCameraModal] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/photos?_limit=20");
        const data = await res.json();
        const formatted = data.map((item) => ({
          id: item.id,
          src: `https://picsum.photos/seed/${item.id}/204/208`,
          session: "All",
        }));
        setPhotos(formatted);
      } catch (error) {
        console.error("Failed to fetch photos", error);
      }
    };
    fetchPhotos();
  }, []);

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      setShowCameraModal(true);
    } catch (error) {
      console.error("Camera access error:", error);
    }
  };

  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    setShowCameraModal(false);
  };

  useEffect(() => {
    if (showCameraModal && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [showCameraModal]);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0);
      const imageData = canvas.toDataURL("image/png");

      const newSelfie = {
        id: Date.now(),
        src: imageData,
        session: "All",
      };
      setPhotos((prev) => [newSelfie, ...prev]);

      closeCamera();
      setSelectedSession("All");
    }
  };

  const uploadPhoto = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const newPhoto = {
            id: Date.now(),
            src: reader.result,
            session: "All",
          };
          setPhotos((prev) => [newPhoto, ...prev]);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const toggleLike = (photoId) => {
    setLikedPhotos((prev) => {
      const updated = { ...prev };
      if (updated[photoId]) {
        delete updated[photoId];
      } else {
        updated[photoId] = true;
      }
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-black text-black px-4 py-6 flex items-start justify-center relative">
      <div className="w-[320px] bg-white shadow-lg rounded-md relative z-10">

        <div className="relative">
          <img src={bride} alt="Amit's Wedding" className="w-full h-[300px] object-cover" />
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <div className="w-7 h-7 bg-black rounded-full" />
            <span className="text-white text-base font-bold">Photoshare AI</span>
          </div>
          <div className="absolute bottom-4 left-0 w-full text-white text-center px-4">
            <div className="text-lg font-semibold">Amit's wedding</div>
            <div className="text-sm">25 May, 2025</div>
          </div>
        </div>

      
        <div className="bg-white px-4 pt-4 pb-2 -mt-2 rounded-t-md shadow-2xl">
          <div className="flex justify-between items-start">
            <h2 className="text-xs font-bold text-gray-800">Amit's Wedding</h2>
            <div className="relative flex items-center gap-4">
              <TbFocusCentered
                className="w-6 h-6 cursor-pointer text-black"
                onClick={openCamera}
              />
              <div className="relative">
                <SlOptionsVertical
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => setShowMenu((prev) => !prev)}
                />
                {showMenu && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-20 text-sm">
                    <div
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setShowMenu(false);
                        openCamera();
                      }}
                    >
                      📸 Take Photo
                    </div>
                    <div
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setShowMenu(false);
                        uploadPhoto();
                      }}
                    >
                      📂 Upload Photo
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>


          <div className="mt-4 flex items-center justify-between">
            <span className="text-base font-semibold text-gray-800">Sessions</span>
            <div className="relative">
              <select
                value={selectedSession}
                onChange={(e) => setSelectedSession(e.target.value)}
                className="appearance-none bg-white pl-2 pr-6 border-b border-black text-sm font-medium text-black focus:outline-none h-6 leading-tight"
              >
                {sessions.map((session, i) => (
                  <option key={i} value={session}>{session}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-black text-xs">▼</div>
            </div>
          </div>
        </div>

 
        <div className="px-3 pb-3 pt-4">
          {photos.length === 0 ? (
            <p className="text-sm text-center text-gray-500 py-10">Loading photos...</p>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {photos
                .filter(photo => selectedSession === "All" || photo.session === selectedSession)
                .map((photo) => (
                  <div key={photo.id} className="relative overflow-hidden bg-white shadow-xl -translate-y-1">
                    <img
                      src={photo.src}
                      alt={`Wedding ${photo.id}`}
                      className="w-[200px] h-[170px] object-cover bg-gray-100"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/30 opacity-80 text-white text-xs px-2 py-1 flex justify-end gap-3 items-center">
                      <a href={photo.src} download={`photo-${photo.id}.png`}>
                        <BsDownload className="cursor-pointer text-sm" title="Download" />
                      </a>
                      <TbShare className="cursor-pointer text-sm" title="Share" />
                      {likedPhotos[photo.id] ? (
                        <TbHeartFilled
                          className="cursor-pointer text-sm text-red-500"
                          title="Unlike"
                          onClick={() => toggleLike(photo.id)}
                        />
                      ) : (
                        <TbHeart
                          className="cursor-pointer text-sm hover:text-red-500"
                          title="Like"
                          onClick={() => toggleLike(photo.id)}
                        />
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>


      {showCameraModal && (
        <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-[380px] relative overflow-hidden animate-fadeIn">

            <div className="flex justify-between items-center px-4 py-2 border-b">
              <span className="text-sm font-semibold text-gray-700">Camera</span>
              <button
                onClick={closeCamera}
                className="text-gray-500 hover:text-black text-lg"
                aria-label="Close"
              >
                &times;
              </button>
            </div>

            <div className="px-4 pt-4 pb-2">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded-md border border-gray-300 shadow-sm"
              />
              <p className="text-xs text-center text-gray-500 mt-2">
                Tap button below to capture photo
              </p>
            </div>

            <div className="flex justify-center px-4 pb-4">
              <button
                onClick={capturePhoto}
                className="bg-black text-white text-sm px-4 py-1.5 rounded-full hover:bg-gray-800 transition-all"
              >
                📸 Capture Photo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumGallery;
