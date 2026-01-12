import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

/* recieves: [{text, link}] */
const Breadcrumb = ({ pages }) => {
  return (
    <div className="flex gap-3">
      {pages.map((item, index) => (
        <>
          <div key={index} className="font-jomolhari">
            <Link to={item.Link}>{item.text}</Link>{" "}
          </div>
          {index !== pages.length - 1 && <ChevronRight className="mt-1" />}
        </>
      ))}
    </div>
  );
};

export default Breadcrumb;
