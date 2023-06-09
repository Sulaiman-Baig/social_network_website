import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const menuItems = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Add Post",
      path: "/addpost",
    },
    {
      title: "Shares",
      path: "/shares",
    },
    {
      title: "Profile",
      path: "/profil",
    },
  ];
  return (
    <div className="p-5 bg-primary">
      <div className="flex space-x-10 justify-end items-center md:flex-col md:items-end md:space-y-5 ">
        {menuItems.map((item) => {
          return (
            <Link to={`${item.path}`} className={`text-gray-200 ${item.path == location.pathname && 'bg-white text-black rounded py-1 px-3'}`} >
              {item.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
