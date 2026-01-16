import Monk from "@/assets/monk.png";


const Hero = () => {
  return (
    <div className="md:mt-40 -mb-80 md:mb-0 w-full scale-30 sm:scale-40 md:scale-50 lg:scale-75 xl:scale-90 flex justify-center">
      <div className="font-jomhuria w-fit mx-auto text-primary/80 relative">
        <h2 className="text-left text-7xl pl-4">Bring</h2>
        <h2 className="text-[700px] -mt-82 -mb-108">PEACE</h2>
        <h2 className="text-right text-7xl pr-2">in Life</h2>
        <div className="absolute -top-24 left-90">
          <img className="w-140" src={Monk} />
        </div>
      </div>
    </div>
  );
};

export default Hero;