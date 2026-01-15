import Header from "@/components/Header";
import Rating from "@/components/Rating";
import { SparklesCore } from "@/components/ui/sparkles";
import { User } from "lucide-react";
import { Link } from "react-router-dom";

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
        className={`w-full lg:w-140 bg-primary/5 backdrop-blur-sm p-10 border shadow-md ${
          index === 0 && "rounded-tl-4xl"
        } ${index === length - 1 && "rounded-bl-4xl"}`}
      >
        <div className="w-full aspect-video relative overflow-hidden after:absolute after:inset-0 after:pointer-events-none after:bg-[radial-gradient(circle_at_center,transparent_45%,rgba(250,250, 250, 0.5)_100%)] dark:after:bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.5)_100%)] rounded-lg">
          <img src={courseData.thumbnail} className="size-full object-cover" />
        </div>
      </div>

      {/* details */}
      <div
        className={`flex-1 bg-primary/5 backdrop-blur-sm p-10 border shadow-md ${
          index === 0 && "rounded-tr-4xl"
        } ${index === length - 1 && "rounded-br-4xl"}`}
      >
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

const EnrolledCourses = () => {
  return (
    <div className="mt-10 space-y-2">
      <CourseCard index={0} length={3} />
      <CourseCard index={1} length={3} />
      <CourseCard index={2} length={3} />
    </div>
  );
};

const CompletedCourses = () => {
  return (
    <div className="mt-10 space-y-2">
      <CourseCard index={0} length={3} />
      <CourseCard index={1} length={3} />
      <CourseCard index={2} length={3} />
    </div>
  );
};

const UserProfile = () => {
  return (
    <div className="mt-10 flex gap-2 font-jomolhari">
      {/* Info */}
      <div className="bg-primary/5 backdrop-blur-sm flex-1 border rounded-l-4xl p-10">
        <div className="mx-auto border-primary/80 border w-fit rounded-full">
          <User size={50} className="text-primary/80" />
        </div>
        <div className="text-center mt-2">
          <h2 className="text-xl text-primary/90">Mr Tushar Ramgirkar</h2>
          <h2 className="text-primary/60">tusharramgirkar@gmail.com</h2>
          <h2 className="text-primary/60">since 14 july 2005</h2>
        </div>
      </div>
      {/* Options */}
      <div className="w-100 space-y-2">
        <div className="bg-primary/5 backdrop-blur-sm border text-center py-3 rounded-tr-4xl">Update Profile</div>
        <div className="bg-primary/5 backdrop-blur-sm border text-center py-3">Logout of Device</div>
        <div className="bg-primary/5 backdrop-blur-sm border text-center py-3">Delete Profile</div>
      </div>
    </div>
  )
}

const Dashboard = () => {
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
      <div className="py-10 max-w-7xl mx-auto">
        <Header />
        <div className="px-20">
          {/* Enrolled Courses */}
          <div className="mt-20 text-center font-jomolhari text-xl text-primary/80 bg-primary/5 py-7 backdrop-blur-xs w-fit mx-auto px-20 rounded-full border shadow-md">
            Enrolled Courses
          </div>
          <EnrolledCourses />
          {/* Completed Courses */}
          <div className="mt-20 text-center font-jomolhari text-xl text-primary/80 bg-primary/5 py-7 backdrop-blur-xs w-fit mx-auto px-20 rounded-full border shadow-md">
            Completed Courses
          </div>
          <CompletedCourses />
          {/* User Profile */}
          <div className="mt-20 text-center font-jomolhari text-xl text-primary/80 bg-primary/5 py-7 backdrop-blur-xs w-fit mx-auto px-20 rounded-full border shadow-md">
            User Profile
          </div>
          <UserProfile />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
