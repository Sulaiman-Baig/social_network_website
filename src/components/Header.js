import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CgMenuRightAlt } from "react-icons/cg";
const Header = () => {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
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
    <div className="p-5 bg-primary rounded-md">
      {!showMenu && (
        <div className="md:flex justify-end hidden bg-primary -mb-8">
          <CgMenuRightAlt
            size={30}
            color="white"
            className="cursor-pointer"
            onClick={() => setShowMenu(true)}
          />
        </div>
      )}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white" >Social Networking</h1>
        {/* web view */}
        <div className="flex space-x-10 justify-end items-center md:hidden">
          {menuItems.map((item) => {
            return (
              <Link
                to={`${item.path}`}
                className={`text-gray-200 ${
                  item.path === location.pathname &&
                  "bg-white text-gray-950 rounded py-1 px-3"
                }`}
                onClick={() => setShowMenu(true)}
              >
                {item.title}
              </Link>
            );
          })}
        </div>
        {/*  mobile view  */}
        {showMenu && (
          <div className="md:flex space-x-10 justify-end flex-col items-end  space-y-5 hidden ">
            {menuItems.map((item) => {
              return (
                <Link
                  to={`${item.path}`}
                  className={`text-gray-200 ${
                    item.path === location.pathname &&
                    "bg-white text-gray-950 rounded py-1 px-3"
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
