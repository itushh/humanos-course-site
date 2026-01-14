import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

/* recieves: [{text, link}] */
const Breadcrumb = ({ pages }) => {
  return (
    <div className="flex items-center text-primary/80 gap-3 w-fit px-10 mx-auto py-3 rounded-full">
      {pages.map((item, index) => (
        <>
          <div key={index} className={`font-jomolhari hover:text-primary ${index === pages.length-1 && "text-primary"}`}>
            <Link to={item.Link}>{item.text}</Link>{" "}
          </div>
          {index !== pages.length - 1 && <ChevronRight size={15} className="mt-1" />}
        </>
      ))}
    </div>
  );
};

export default Breadcrumb;
