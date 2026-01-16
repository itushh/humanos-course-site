import { ChevronRight } from "lucide-react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ pages }) => {
  return (
    <div className="flex items-center text-primary/80 gap-3 w-fit px-10 mx-auto py-3 rounded-full">
      {pages.map((item, index) => (
        <Fragment key={index}>
          <div className="font-jomolhari hover:text-primary">
            <Link to={item.link}>{item.text}</Link>{" "}
          </div>
          {index !== pages.length - 1 && <ChevronRight size={15} className="mt-1" />}
        </Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;
