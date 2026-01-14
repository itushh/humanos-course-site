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
    <div className="flex p-10 rounded-md gap-10 bg-white/2 backdrop-blur-xs h-full">
      <div className="w-3/4">
        <div className="w-full aspect-video bg-slate-800 rounded-md">
          <video
            src={courseContent.access_url}
            className="size-full object-cover"
          ></video>
        </div>
        <h1 className="mt-2 font-jomolhari text-2xl">{courseContent.title}</h1>
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
    <div className="h-dvh flex flex-col">
      <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={5}
        className="w-full absolute -z-40"
        particleColor="#FFFFFF"
      />
      <Header />
      <main className="px-40 py-10 flex-1 overflow-auto">
        <div className="px-60">
          {isAccessing && (
            <div className="flex justify-center bg-white/2 backdrop-blur-xs py-10 rounded-md">
              <Loader className="animate-spin" />
            </div>
          )}
          {errorAccessing && (
            <div className="flex justify-center bg-white/2 backdrop-blur-xs py-10 rounded-md">
              {errorAccessing}
            </div>
          )}
        </div>
        {!errorAccessing && <CourseContent />}
      </main>
    </div>
  );
};

export default Learn;
