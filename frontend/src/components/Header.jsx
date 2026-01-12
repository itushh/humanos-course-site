import React from "react";
import { Link } from "react-router-dom";

const menus = [
  {
    text: "Meditation",
    link: "/#",
  },
  {
    text: "Yoga",
    link: "/#",
  },
  {
    text: "Lifestyle",
    link: "/#",
  },
  {
    text: "Partnership",
    link: "/#",
  },
  {
    text: "Pricing",
    link: "/#",
  },
  {
    text: "Contact",
    link: "/#",
  },
];

const Header = () => {
  return (
    <div className="sticky w-full top-0 flex justify-between px-100 py-7 bg-white/2 backdrop-blur-xs items-center z-50">
      <img src="/logo.svg" />
      <div className="flex gap-3 font-jomolhari">
        <div className="flex gap-3 items-center">
          {menus.map((item, index) => (
            <div key={index} className="cursor-pointer">
              <Link to={item.link}>{item.text}</Link>
            </div>
          ))}
        </div>
        <div className="text-3xl">|</div>
        <div className="flex items-center cursor-pointer">
          <Link to="/auth">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
