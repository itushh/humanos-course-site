import Header from "@/components/Header";
import { SparklesCore } from "@/components/ui/sparkles";
import { useCourseStore } from "@/store/courseStore";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Chapter = () => {
  return (
    <div className="w-full border px-5 py-3 rounded-md flex gap-5">
      <div className="border text-xs flex items-center px-2 rounded font-jomolhari">
        00:48
      </div>
      <div className="font-jomolhari">An Introduction</div>
    </div>
  );
};

const CourseContent = () => {
  const { courseContent } = useCourseStore();

  if (!courseContent) return;

  return (
    <div className="flex p-10 rounded-4xl gap-10 bg-primary/5 backdrop-blur-xs h-full shadow-md">
      <div className="w-3/4">
        <div className="w-full aspect-video">
          <video
            src={courseContent.access_url}
            controls
            className="size-full object-cover rounded-4xl"
          ></video>
        </div>
        <h1 className="mt-2 font-jomolhari text-xl text-center text-primary/80">{courseContent.title} : Chapter 5 (Introduction)</h1>
      </div>
      <div className="space-y-3 h-full flex-1 pr-5 overflow-auto">
        <Chapter />
        <Chapter />
        <Chapter />
        <Chapter />
        <Chapter />
        <Chapter />
        <Chapter />
        <Chapter />
        <Chapter />
        <Chapter />
        <Chapter />
        <Chapter />
        <Chapter />
        <Chapter />
        <Chapter />
        <Chapter />
        <Chapter />
        <Chapter />
        <Chapter />
        <Chapter />
        <Chapter />
        <Chapter />
        <Chapter />
        <Chapter />
        <Chapter />
      </div>
    </div>
  );
};

const Learn = () => {
  const { isAccessing, errorAccessing, accessCourse } = useCourseStore();
  const { slug } = useParams();

  useEffect(() => {
    accessCourse(slug);
  }, [accessCourse, slug]);

  return (
    <div className="">
      <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={5}
        className="w-full absolute -z-40"
        particleColor="#FFFFFF"
      />
      <div className="flex flex-col h-dvh max-w-8xl mx-auto py-10">
        <div className="px-100">
          <Header />
        </div>
        <main className="flex-1 px-60 overflow-y-auto mt-10">
          <div className="px-60">
            {isAccessing && (
              <div className="flex justify-center bg-white/2 backdrop-blur-xs py-10 rounded-4xl showdow-md">
                <Loader className="animate-spin" />
              </div>
            )}
            {errorAccessing && (
              <div className="flex justify-center bg-white/2 backdrop-blur-xs py-10 rounded-4xl showdow-md">
                {errorAccessing}
              </div>
            )}
          </div>
          {!errorAccessing && <CourseContent />}
        </main>
      </div>
    </div>
  );
};

export default Learn;
