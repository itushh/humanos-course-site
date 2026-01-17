import Header from "@/components/Header";
import { SparklesCore } from "@/components/ui/sparkles";
import CourseCard from "@/components/CourseCard";
import Hero from "@/components/Hero";
import SectionTitle from "@/components/SectionTitle";
import { useCourseStore } from "@/store/courseStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";

const Courses = () => {
  const {
    fetchAllCourses,
    allCoursesData,
    isFetchingAllCourses,
    errorFetchingAllCourses,
  } = useCourseStore();

  useEffect(() => {
    fetchAllCourses();
  }, [fetchAllCourses])

  if(!allCoursesData){
    return (
      <div className="mt-10 xl:px-20 flex justify-center">
        {isFetchingAllCourses && <Loader className="animate-spin" />}
        {errorFetchingAllCourses && <p className="text-center text-rose-500">{errorFetchingAllCourses}</p>}
    </div>
    )
  }

  return (
    <div className="mt-10 xl:px-20 space-y-2">
      {allCoursesData.map((item, index) => (
        <CourseCard key={index} index={index} length={allCoursesData.length} courseData={item} />
      ))}
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
      <div className="max-w-7xl px-5 xl:px-0 py-10 mx-auto">
        <Header />
        <Hero />
        <div className="mt-70 md:mt-50 lg:mt-60">
          <SectionTitle title="Explore Courses" />
        </div>
        <Courses />
      </div>
    </div>
  );
};

export default Lander;
