import { Star } from "lucide-react";
import React from "react";

const Rating = () => {
  return (
    <div className="flex gap-1 mt-3">
      <Star className="fill-primary/80 stroke-primary/80" size={20} />
      <Star className="fill-primary/80 stroke-primary/80" size={20} />
      <Star className="fill-primary/80 stroke-primary/80" size={20} />
      <Star className="fill-primary/80 stroke-primary/80" size={20} />
      <Star className="fill-primary/80 stroke-primary/80" size={20} />
      <div className="ml-2 text-primary/80">( 5.0 )</div>
    </div>
  );
};

export default Rating;
