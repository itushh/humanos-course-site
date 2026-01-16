import React from "react";

const SectionTitle = ({ title }) => {
  return (
    <div className="text-center font-jomolhari text-md sm:text-xl text-primary/80 bg-primary/5 py-3 sm:py-5 md:py-7 backdrop-blur-xs w-fit mx-auto px-20 rounded-full border shadow-md">
      {title}
    </div>
  );
};

export default SectionTitle;
