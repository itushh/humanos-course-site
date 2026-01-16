import { useAuthStore } from "@/store/authStore";
import { Menu, X } from "lucide-react";
import React, { useState } from "react";
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
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  return (
    <>
      <div className="sticky w-full rounded-full shadow-md top-10 flex flex-row sm:flex-col gap-3 lg:flex-row justify-between px-10 sm:px-20 border py-7 bg-primary/5 text-primary/80 backdrop-blur-xs items-center z-50">
        <Link to="/">
          <img className="invert-100 dark:invert-0 w-32" src="/logo.svg" />
        </Link>
        <div className="flex gap-3 font-jomolhari">
          <div className="hidden sm:flex gap-3 items-center">
            {menus.map((item, index) => (
              <div key={index} className="cursor-pointer hover:text-primary">
                <Link to={item.link}>{item.text}</Link>
              </div>
            ))}
          </div>
          <div
            className="sm:hidden"
            onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
          >
            {mobileMenuVisible ? <X /> : <Menu />}
          </div>
          <div className="flex items-center cursor-pointer border-l pl-3">
            {isAuthenticated ? (
              <Link to="/dashboard">Account</Link>
            ) : (
              <Link to="/auth">Login</Link>
            )}
          </div>
        </div>
      </div>
      {mobileMenuVisible && (
        <div className="sm:hidden">
          <div className="border py-10 text-center space-y-10 bg-primary/5 text-primary/80 backdrop-blur-xs z-40 mt-2 rounded-4xl">
            {menus.map((item, index) => (
              <div key={index} className="cursor-pointer hover:text-primary">
                <Link to={item.link}>{item.text}</Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
