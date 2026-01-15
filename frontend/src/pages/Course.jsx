import Breadcrumb from "@/components/Breadcrumb";
import ChaptersList from "@/components/ChaptersList";
import Header from "@/components/Header";
import Rating from "@/components/Rating";
import { SparklesCore } from "@/components/ui/sparkles";
import { useAuthStore } from "@/store/authStore";
import { useCourseStore } from "@/store/courseStore";
import { Loader } from "lucide-react";
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const CourseData = () => {
  const { isAuthenticated } = useAuthStore();
  const { slug } = useParams();
  const navigate = useNavigate();
  const {
    isFetchingCourseData,
    courseData,
    fetchCourse,
    error,
    isEnrolling,
    isEnrolled,
    enrollInCourse,
    errorEnrolling,
    clearEnrollmentError,
  } = useCourseStore();

  useEffect(() => {
    fetchCourse(slug);
  }, [fetchCourse, slug]);

  useEffect(() => {
    if (isEnrolled) {
      navigate(`/learn/${slug}`, { replace: true });
    }
  }, [isEnrolled, navigate, slug]);

  const handleEntrollment = () => {
    clearEnrollmentError();
    enrollInCourse(slug);
  };

  if (!courseData) {
    return (
      <div className="bg-primary/5 mt-5 rounded-4xl backdrop-blur-sm p-15 flex gap-10 justify-center border">
        {isFetchingCourseData && <Loader className="animate-spin" />}
        {error && <span className="text-rose-500">{error}</span>}
      </div>
    );
  }

  return (
    <>
      {/* basic details */}
      <div className="mt-5 flex-col lg:flex-row flex gap-2">
        {/* thumbnai */}
        <div className="w-full lg:w-140 bg-primary/5 backdrop-blur-sm p-10 border shadow-md rounded-t-4xl lg:rounded-none lg:rounded-tl-4xl">
          <div className="w-full aspect-video relative overflow-hidden after:absolute after:inset-0 after:pointer-events-none after:bg-[radial-gradient(circle_at_center,transparent_45%,rgba(250,250, 250, 0.5)_100%)] dark:after:bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.5)_100%)] rounded-lg">
            <img
              src={courseData.thumbnail}
              className="size-full object-cover"
            />
          </div>
        </div>

        {/* details */}
        <div className="flex-1 bg-primary/5 backdrop-blur-sm p-10 border shadow-md lg:rounded-tr-4xl">
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
          {errorEnrolling && (
            <p className="text-rose-500 pt-5">{errorEnrolling}</p>
          )}
          {!isAuthenticated ? (
            <Link to="/auth">
              <button className="border hover:scale-101 dark:border-border font-jomolhari px-10 py-2.5 rounded-lg bg-green-500/80 dark:bg-primary/10 text-center mt-5 cursor-pointer">
                Login to Enroll
              </button>
            </Link>
          ) : (
            <button
              className="border hover:scale-101 dark:border-border font-jomolhari px-10 py-2.5 rounded-lg bg-green-500/80 dark:bg-primary/10 text-center mt-5 cursor-pointer"
              onClick={handleEntrollment}
            >
              {isEnrolling ? <Loader className="animate-spin" /> : "Enroll Now"}
            </button>
          )}
        </div>
      </div>

      {/* more details */}
      <div className="flex flex-col lg:flex-row gap-2 mt-2">
        {/* chapters */}
        <div className="p-10 flex-1 bg-primary/5 backdrop-blur-sm lg:rounded-bl-4xl border shadow-md">
          <ChaptersList
            chapters={[
              { title: "Introduction", duration: "10:48" },
              { title: "Types of meditation", duration: "00:48" },
              { title: "Benifites of meditation", duration: "00:48" },
              { title: "When to do meditation", duration: "00:48" },
            ]}
          />
        </div>
        {/* What did you learn */}
        <div className="p-10 lg:w-100 rounded-b-4xl lg:rounded-none lg:rounded-br-4xl bg-primary/5 backdrop-blur-sm border shadow-md">
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
};

const Course = () => {
  const { slug } = useParams();

  return (
    <div className="min-h-dvh px-2">
      <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={10}
        className="w-full absolute top-0 left-0 -z-40"
        particleColor="#FFFFFF"
      />
      <div className="max-w-7xl mx-auto py-10">
        <Header />
        <main className="mt-5 px-2 sm:px-10 lg:px-20">
          <Breadcrumb
            pages={[
              { text: "Home", link: "/" },
              { text: slug, link: "/" },
            ]}
          />
          <CourseData />
        </main>
      </div>
    </div>
  );
};

export default Course;
