import Header from "@/components/Header";
import { SparklesCore } from "@/components/ui/sparkles";
import { useCourseStore } from "@/store/courseStore";
import { Loader } from "lucide-react";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const Chapter = ({ timeStamp, videoRef, title }) => {
  const skipToChapter = () => {
    if (!videoRef.current) return;

    let seconds = 0;

    if (typeof timeStamp === "string") {
      const parts = timeStamp.split(":").map(Number);

      if (parts.length === 2) {
        seconds = parts[0] * 60 + parts[1];
      } else if (parts.length === 3) {
        seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
      }
    } else {
      seconds = timeStamp;
    }

    videoRef.current.currentTime = seconds;
  };

  return (
    <div
      className="w-full border px-5 py-3 rounded-md flex gap-5 cursor-pointer"
      onClick={skipToChapter}
    >
      <div className="border text-xs flex items-center px-2 rounded font-jomolhari">
        {timeStamp}
      </div>
      <div className="font-jomolhari text-nowrap overflow-x-hidden">{title}</div>
    </div>
  );
};

const CourseContent = () => {
  const { courseContent } = useCourseStore();
  const videoRef = useRef(null);

  if (!courseContent) return;

  return (
    <div className="flex flex-col 2xl:flex-row p-5 sm:p-10 rounded-4xl gap-10 bg-primary/5 backdrop-blur-xs 2xl:h-full overflow-auto shadow-md">
      <div className="w-full 2xl:w-3/4">
        <div className="w-full aspect-video">
          <video
            src={courseContent.access_url}
            ref={videoRef}
            controls
            className="size-full object-cover rounded-4xl"
          ></video>
        </div>
        <h1 className="mt-2 font-jomolhari text-xl text-center text-primary/80">
          {courseContent.title} : Chapter 5 (Introduction)
        </h1>
      </div>
      <div className="space-y-3 h-full 2xl:flex-1 2xl:pr-5 overflow-auto">
        {courseContent.chapters.map((chapter, index) => (
          <Chapter
            key={index}
            timeStamp={chapter.timestamp}
            videoRef={videoRef}
            title={chapter.title}
          />
        ))}
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
    <div>
      <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={5}
        className="w-full absolute -z-40"
      />
      <div className="flex flex-col h-dvh py-10">
        <div className="max-w-7xl w-full px-5 xl:px-0 mx-auto">
          <Header />
        </div>
        <main className="flex-1 max-w-400 w-full px-5 2xl:px-0 mx-auto overflow-y-auto mt-10">
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
