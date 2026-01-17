import React from "react";

const ChaptersList = ({ chapters }) => {
  return (
    <div>
      <ol className="relative border-l border-l-black/10 dark:border-border">
        {chapters.map((item, index) => (
          <Chapter key={index} timestamp={item.timestamp} title={item.title} description={item.description} duration={item.duration} />
        ))}
      </ol>
    </div>
  );
};

const Chapter = ({ timestamp, title, description, duration }) => {
  return (
    <li className="mb-10 ms-4">
      <div className="absolute w-3 h-3 bg-primary/70 rounded-full mt-1.5 -start-1.5 border border-buffer"></div>
      <time className="text-sm font-normal leading-none text-primary/70">
        {timestamp}
      </time>
      <h3 className="text-lg text-primary mt-2">{title}</h3>
      <h4 className="text-primary/70 mt-2 mb-2">{description}</h4>
      <p className="text-primary/70 border text-xs px-1 w-fit rounded">{duration}</p>
    </li>
  );
};

export default ChaptersList;
