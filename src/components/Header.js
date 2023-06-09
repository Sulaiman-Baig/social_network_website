import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CgMenuRightAlt } from "react-icons/cg";
const Header = () => {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(true);
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
      {showMenu && (
        <div className="flex justify-end mr-5 mt-5 lg:hidden xl:hidden  3xl:hidden bg-primary">
          <CgMenuRightAlt size={30} color="white" />
        </div>
      )}
      {/* web view */}
      <div className="flex space-x-10 justify-end items-center md:hidden">
        {menuItems.map((item) => {
          return (
            <Link
              to={`${item.path}`}
              className={`text-gray-200 ${
                item.path === location.pathname &&
                "bg-white text-black rounded py-1 px-3"
              }`}
            >
              {item.title}
            </Link>
          );
        })}
      </div>
      {/*  mobile view  */}
      {showMenu && (
        <div className="flex space-x-10 justify-end items-end flex-col space-y-5 lg:hidden xl:hidden 3xl:hidden ">
          {menuItems.map((item) => {
            return (
              <Link
                to={`${item.path}`}
                className={`text-gray-200 ${
                  item.path === location.pathname &&
                  "bg-white text-black rounded py-1 px-3"
                }`}
              >
                {item.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Header;
