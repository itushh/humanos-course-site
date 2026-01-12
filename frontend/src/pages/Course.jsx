import Breadcrumb from "@/components/Breadcrumb";
import ChaptersList from "@/components/ChaptersList";
import Header from "@/components/Header";
import Rating from "@/components/Rating";
import { SparklesCore } from "@/components/ui/sparkles";
import { useCourseStore } from "@/store/courseStore";
import { Loader } from "lucide-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const CourseData = () => {
  const { isFetchingCourseData, courseData, fetchCourse, error } =
    useCourseStore();
  const { slug } = useParams();

  useEffect(() => {
    fetchCourse(slug);
  }, [fetchCourse, slug]);

  if (courseData) {
    return (
      <>
        {/* basic details */}
        <div className="bg-white/2 mt-5 rounded-md backdrop-blur-xs p-15 flex gap-10">
          <div className="w-120">
            <div className="w-full aspect-video bg-accent rounded-md">
              <img src={courseData.thumbnail} className="size-full object-cover rounded-md" />
            </div>
          </div>
          <div className="flex-1">
            <h1 className="font-oswald text-3xl text-primary">
              {courseData.title}
            </h1>
            <p className="font-jomolhari text-primary/70 mt-2">
              {courseData.description}
            </p>
            <div>
              <Rating />
            </div>
            <div className="border-2 flex items-center w-fit gap-2 px-3 mt-3 rounded-md text-sm">
              <div className="">Program Duration: 8 Weeks</div>
              <div className="text-lg">|</div>
              <div className="">Beginner</div>
            </div>
            <button className="border-2 font-jomolhari bg-green-700 px-10 py-2 rounded text-center mt-5">
              Enroll Now
            </button>
          </div>
        </div>

        {/* more details */}
        <div className="flex justify-between bg-white/2 backdrop-blur-md mt-3 p-10 rounded-md">
          {/* chapters */}
          <div className="border-r pr-10 flex-1 border-white/50">
            <ChaptersList
              chapters={[
                { title: "Introduction", duration: "10:48" },
                { title: "Types of meditation", duration: "00:48" },
                { title: "Benifites of meditation", duration: "00:48" },
                { title: "When to do meditation", duration: "00:48" },
              ]}
            />
          </div>
          <div className="pl-10 w-100">
            <h2 className="font-jomolhari text-lg">What you'll learn</h2>
            <p className="text-primary/70 font-jomolhari mt-2">
              You will learn how to meditate through guided sessions with one on
              one mentorships. Track all yours progress with our digitized
              mechanism.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="bg-white/2 mt-5 rounded-md backdrop-blur-xs p-15 flex gap-10 justify-center">
        {isFetchingCourseData && <Loader className="animate-spin" />}
        {error && <span className="text-rose-500">{error}</span>}
      </div>
    </>
  );
};

const Course = () => {
  const { slug } = useParams();
  return (
    <div className="min-h-dvh pb-10 ">
      <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={25}
        className="w-full absolute -z-40"
        particleColor="#FFFFFF"
      />
      <Header />
      <main className="px-100 mt-5">
        <Breadcrumb
          pages={[
            { text: "Home", link: "/" },
            { text: slug, link: "/" },
          ]}
        />
        <CourseData />
      </main>
    </div>
  );
};

export default Course;
