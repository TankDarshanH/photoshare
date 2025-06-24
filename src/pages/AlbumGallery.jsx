// import { useState, useEffect } from "react";
// import {
//   FaHeart,
//   FaDownload,
//   FaShareAlt,
// } from "react-icons/fa";
// import { TbFocusCentered } from "react-icons/tb";
// import { SlOptionsVertical } from "react-icons/sl";
// import bride from "../assets/bride.jpg";

// const sessions = ["All", "Haldi", "Wedding", "Reception"];

// const AlbumGallery = () => {
//   const [selectedSession, setSelectedSession] = useState("All");
//   const [photos, setPhotos] = useState([]);
//   const [showMenu, setShowMenu] = useState(false);

//   useEffect(() => {
//     const fetchPhotos = async () => {
//       try {
//         const res = await fetch("https://jsonplaceholder.typicode.com/photos?_limit=20");
//         const data = await res.json();
//         const formatted = data.map((item) => ({
//           id: item.id,
//           src: item.thumbnailUrl,
//         }));
//         setPhotos(formatted);
//       } catch (error) {
//         console.error("Failed to fetch photos", error);
//       }
//     };
//     fetchPhotos();
//   }, []);

//   return (
//     <div className="min-h-screen bg-white text-black px-4 flex items-center justify-center">
//       <div className="w-[320px] h-[700px] bg-white shadow-lg overflow-hidden">
//         {/* Banner */}
//         <div className="relative">
//           <img
//             src={bride}
//             alt="Amit's Wedding"
//             className="w-full h-[300px] object-cover"
//           />
//           <div className="absolute top-4 left-4 flex items-center gap-2">
//             <div className="w-7 h-7 bg-black rounded-full" />
//             <span className="text-white text-base font-bold">Photoshare AI</span>
//           </div>
//           <div className="absolute bottom-4 left-0 w-full text-white text-center px-4">
//             <div className="text-lg font-semibold">Amit's wedding</div>
//             <div className="text-sm">25 May, 2025</div>
//           </div>
//         </div>

//         {/* Scrollable Content */}
//         <div className="h-[400px] overflow-y-auto bg-white px-4 pt-4">
//           {/* Header with icons */}
//           <div className="flex place-items-start justify-between">
//             <h2 className="text-sm font-semibold text-gray-800">Amit’s Wedding</h2>
//             <div className="relative flex items-center gap-4">
//               <TbFocusCentered className="w-7 h-7 cursor-pointer text-black" />
//               <div className="relative">
//                 <SlOptionsVertical
//                   className="w-5 h-6 cursor-pointer"
//                   onClick={() => setShowMenu((prev) => !prev)}
//                 />
//                 {showMenu && (
//                   <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow z-10 text-sm">
//                     <div className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
//                       Option 1
//                     </div>
//                     <div className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
//                       Option 2
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Session Filter */}
//           <div className="mt-6 flex items-center justify-between mb-3">
//             <span className="text-base font-semibold text-gray-800">Sessions</span>
//             <div className="relative">
//               <select
//                 value={selectedSession}
//                 onChange={(e) => setSelectedSession(e.target.value)}
//                 className="appearance-none bg-white pl-2 pr-6 border-b border-black text-sm font-medium text-black focus:outline-none h-6 leading-tight"
//               >
//                 {sessions.map((session, i) => (
//                   <option key={i} value={session}>
//                     {session}
//                   </option>
//                 ))}
//               </select>
//               <div className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-black text-xs">
//                 ▼
//               </div>
//             </div>

//           </div>

//           {/* Photo Grid */}
//           <div className="grid grid-cols-2 gap-2 pb-4">
//             {photos.map((photo) => (
//               <div key={photo.id} className="relative rounded-md overflow-hidden">
//                 <img
//                   src={photo.src}
//                   alt={`Wedding ${photo.id}`}
//                   className="w-full h-[240px] object-cover"
//                 />
//                 <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm px-4 py-2 flex justify-between items-center">
//                   <FaDownload className="cursor-pointer" />
//                   <FaHeart className="cursor-pointer" />
//                   <FaShareAlt className="cursor-pointer" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AlbumGallery;


import { useState, useEffect } from "react";
import { BsDownload } from "react-icons/bs";
import { TbHeart, TbShare, TbFocusCentered } from "react-icons/tb";
import { SlOptionsVertical } from "react-icons/sl";
import bride from "../assets/bride.jpg";

const sessions = ["All", "Haldi", "Wedding", "Reception"];

const AlbumGallery = () => {
  const [selectedSession, setSelectedSession] = useState("All");
  const [photos, setPhotos] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/photos?_limit=20");
        const data = await res.json();
        const formatted = data.map((item) => ({
          id: item.id,
          src: `https://picsum.photos/seed/${item.id}/204/208`,
        }));
        setPhotos(formatted);
      } catch (error) {
        console.error("Failed to fetch photos", error);
      }
    };
    fetchPhotos();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black px-4 py-6 flex items-start justify-center">
      <div className="w-[320px] bg-white shadow-lg rounded-md">

        {/* Banner */}
        <div className="relative">
          <img
            src={bride}
            alt="Amit's Wedding"
            className="w-full h-[300px] object-cover"
          />
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <div className="w-7 h-7 bg-black rounded-full" />
            <span className="text-white text-base font-bold">Photoshare AI</span>
          </div>
          <div className="absolute bottom-4 left-0 w-full text-white text-center px-4">
            <div className="text-lg font-semibold">Amit's wedding</div>
            <div className="text-sm">25 May, 2025</div>
          </div>
        </div>

        {/* Raised Header & Filter */}
        <div className="bg-white px-4 pt-4 pb-2 -mt-2 rounded-t-md shadow-2xl">
          <div className="flex place-items-start justify-between">
            <h2 className="text-xs  font-bold text-gray-800">Amit’s Wedding</h2>
            <div className="relative flex items-center gap-4">
              <TbFocusCentered className="w-6 h-6 cursor-pointer text-black" />
              <div className="relative">
                <SlOptionsVertical
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => setShowMenu((prev) => !prev)}
                />
                {showMenu && (
                  <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow z-10 text-sm">
                    <div className="px-3 py-2 hover:bg-gray-100 cursor-pointer">Option 1</div>
                    <div className="px-3 py-2 hover:bg-gray-100 cursor-pointer">Option 2</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Session Filter */}
          <div className="mt-4 flex items-center justify-between ">
            <span className="text-base font-semibold text-gray-800">Sessions</span>
            <div className="relative">
              <select
                value={selectedSession}
                onChange={(e) => setSelectedSession(e.target.value)}
                className="appearance-none bg-white pl-2 pr-6 border-b border-black text-sm font-medium text-black focus:outline-none h-6 leading-tight"
              >
                {sessions.map((session, i) => (
                  <option key={i} value={session}>
                    {session}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-black text-xs">
                ▼
              </div>
            </div>
          </div>
        </div>

        {/* Photo Grid */}
        <div className="px-3 pb-3 pt-4">
          {photos.length === 0 ? (
            <p className="text-sm text-center text-gray-500 py-10">Loading photos...</p>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="relative overflow-hidden bg-white shadow-xl -translate-y-1"
                >
                  <img
                    src={photo.src}
                    alt={`Wedding ${photo.id}`}
                    className="w-[200px] h-[170px] object-cover bg-gray-100"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/30 opacity-80 text-white text-xs px-2 py-1 flex justify-end gap-3 items-center">
                    <BsDownload className="cursor-pointer text-sm" />
                    <TbShare className="cursor-pointer text-sm" />
                    <TbHeart className="cursor-pointer text-sm" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AlbumGallery;








