import { Routes, Route } from "react-router-dom";
import PinEntry from "./pages/PinEntry";
import Details from "./pages/Details";
import Loading from "./pages/Loading";
import AlbumGallery from "./pages/AlbumGallery";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PinEntry />} />
      <Route path="/details" element={<Details />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/albums" element={<AlbumGallery />} />
    </Routes>
  );
}

export default App;



