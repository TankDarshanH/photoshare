import bride from "../assets/bride.jpg";

const HeroImageSection = () => {
  return (
    <div className="relative">
      <img src={bride} alt="bride" className="w-full h-[400px] object-cover" />
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <div className="w-7 h-7 bg-black rounded-full" />
        <span className="text-white text-base font-bold">Photoshare AI</span>
      </div>
      <div className="absolute bottom-4 left-0 w-full text-white text-center px-4">
        <div className="text-lg font-semibold">Amit's wedding</div>
        <div className="text-sm">25 May, 2025</div>
      </div>
    </div>
  );
};

export default HeroImageSection;




