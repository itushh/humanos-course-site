import React from "react";

const ChaptersList = ({ chapters }) => {
  return (
    <div>
      <ol className="relative border-l border-l-black/10 dark:border-border">
        {chapters.map((item, index) => (
          <Chapter index={index} title={item.title} duration={item.duration} />
        ))}
      </ol>
    </div>
  );
};

const Chapter = ({ index, title, duration }) => {
  return (
    <li className="mb-10 ms-4">
      <div className="absolute w-3 h-3 bg-primary/70 rounded-full mt-1.5 -start-1.5 border border-buffer"></div>
      <time className="text-sm font-normal leading-none text-primary/70">
        Chapter {index + 1}
      </time>
      <h3 className="text-lg text-primary my-2">{title}</h3>
      <p className="text-primary/70 border text-xs px-1 w-fit rounded">{duration}</p>
    </li>
  );
};

export default ChaptersList;
