import Header from "@/components/Header";
import { SparklesCore } from "@/components/ui/sparkles";
import Monk from "@/assets/monk.png";
import Rating from "@/components/Rating";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="mt-40">
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

const CourseCard = ({ index, length }) => {
  const courseData = {
    _id: "695face018b9e585a70354b5",
    title: "How to meditate",
    slug: "how-to-meditate",
    public_id: "how-to-meditate",
    price: 0,
    description: "Learn how to meditate",
    thumbnail:
      "https://images.unsplash.com/photo-1536007164800-b7f11331f35c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    duration: "6:15",
    is_active: true,
    tags: [""],
    chapters: [],
  };
  return (
    <div className={"flex-col lg:flex-row flex gap-2"}>
      {/* thumbnai */}
      <div
        className={`w-full lg:w-140 bg-primary/5 backdrop-blur-sm p-10 border shadow-md ${index === 0 && "rounded-tl-4xl"} ${index === length-1 && "rounded-bl-4xl"}`}
      >
        <div className="w-full aspect-video relative overflow-hidden after:absolute after:inset-0 after:pointer-events-none after:bg-[radial-gradient(circle_at_center,transparent_45%,rgba(250,250, 250, 0.5)_100%)] dark:after:bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.5)_100%)] rounded-lg">
          <img src={courseData.thumbnail} className="size-full object-cover" />
        </div>
      </div>

      {/* details */}
      <div className={`flex-1 bg-primary/5 backdrop-blur-sm p-10 border shadow-md ${index === 0 && "rounded-tr-4xl"} ${index === length-1 && "rounded-br-4xl"}`}>
        <h1 className="font-jomolhari text-2xl text-primary">
          {courseData.title}
        </h1>
        <p className="font-jomolhari text-primary/70 mt-2">
          {courseData.description}
        </p>
        <div>
          <Rating />
        </div>
        <div className="border border-black/10 dark:border-border flex items-center w-fit gap-2 px-3 mt-3 rounded-md text-sm">
          <div className="py-1">Program Duration: 8 Weeks</div>
          <div className="pl-2 border-l py-1 border-black/10 dark:border-border">
            Beginner
          </div>
        </div>
        <Link to={`/course/${courseData.slug}`}>
          <button className="border hover:scale-101 dark:border-border font-jomolhari px-10 py-2.5 rounded-lg bg-green-500/80 dark:bg-primary/10 text-center mt-5 cursor-pointer">
            Learn More
          </button>
        </Link>
      </div>
    </div>
  );
};

const Lander = () => {
  return (
    <div>
      <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={10}
        className="w-full fixed top-0 left-0 -z-40"
      />
      <div className="max-w-7xl py-10 mx-auto">
        <Header />
        <Hero />
        <div className="mt-70 text-center font-jomolhari text-xl text-primary/80 bg-primary/5 py-7 backdrop-blur-xs w-fit mx-auto px-20 rounded-full border shadow-md">
          Discover Your Inner Harmony
        </div>
        <div className="mt-10 px-20 space-y-2">
          <CourseCard index={0} length={4} />
          <CourseCard index={1} length={4} />
          <CourseCard index={2} length={4} />
          <CourseCard index={3} length={4} />
        </div>
      </div>
    </div>
  );
};

export default Lander;
