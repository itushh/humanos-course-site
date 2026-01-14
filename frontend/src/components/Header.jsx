import { useAuthStore } from "@/store/authStore";
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
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="sticky w-full rounded-full shadow-md top-10 flex justify-between px-20 border py-7 bg-primary/5 text-primary/80 backdrop-blur-xs items-center z-50">
      <img className="invert-100 dark:invert-0" src="/logo.svg" />
      <div className="flex gap-3 font-jomolhari">
        <div className="flex gap-3 items-center">
          {menus.map((item, index) => (
            <div key={index} className="cursor-pointer hover:text-primary">
              <Link to={item.link}>{item.text}</Link>
            </div>
          ))}
        </div>
        <div className="flex items-center cursor-pointer border-l pl-3">
          {isAuthenticated ? <Link to="/account">Account</Link> :<Link to="/auth">Login</Link>}
        </div>
      </div>
    </div>
  );
};

export default Header;
