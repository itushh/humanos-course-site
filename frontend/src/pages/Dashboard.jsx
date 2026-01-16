import CourseCard from "@/components/CourseCard";
import Header from "@/components/Header";
import SectionTitle from "@/components/SectionTitle";
import { SparklesCore } from "@/components/ui/sparkles";
import { useAuthStore } from "@/store/authStore";
import { User } from "lucide-react";
import { Navigate } from "react-router-dom";

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
        <div className="bg-primary/5 backdrop-blur-sm border text-center py-3 rounded-tr-4xl">
          Update Profile
        </div>
        <div className="bg-primary/5 backdrop-blur-sm border text-center py-3">
          Logout of Device
        </div>
        <div className="bg-primary/5 backdrop-blur-sm border text-center py-3">
          Delete Profile
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

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
      <div className="py-10 max-w-7xl mx-auto px-5 xl:px-0">
        <Header />
        <div className="md:px-10 xl:px-20">
          {/* Enrolled Courses */}
          <div className="mt-20">
            <SectionTitle title="Enrolled Courses" />
            <EnrolledCourses />
          </div>
          {/* Completed Courses */}
          <div className="mt-20">
            <SectionTitle title="Completed Courses" />
            <CompletedCourses />
          </div>
          <div className="mt-20">
            <SectionTitle title="Your Profile" />
            <UserProfile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
