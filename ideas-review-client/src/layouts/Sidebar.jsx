import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { updateSlideBar } from "../store/Slices/sideBarSlice";

const Sidebar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const sideBar = useSelector((state) => state.sideBar);
  const handleCloseSidebar = () => {
    dispatch(updateSlideBar({ open: !sideBar.open }));
  };

  const sidebarLinks = [
    {
      path: "/dashboard",
      label: "Dashboard",
      show: user.user.userType !== "admin" ? true : true,
    },
    {
      path: "/review-cfp",
      label: "Review IDEAS",
      show: user.user.userType !== "admin" ? true : true,
    },
    {
      path: "/talks",
      label: "Ideas",
      show: user.user.userType !== "admin" ? false : true,
    },
    {
      path: "/members",
      label: "Members",
      show: user.user.userType !== "admin" ? false : true,
    },
  ];
  let open = sideBar.open
  return (
    <div
      className={`bg-gray-800 ${open ? "sm:block w-3/4" : "sm:hidden"}  text-white h-screen flex flex-col border-white/50 border-r sm:absolute`}
    >
      {/* Sidebar Header */}
      <MdClose
        className="absolute top-2 right-2 text-xl sm:block hidden"
        onClick={handleCloseSidebar}
      />

      <div className="p-4 sm:mt-12">
        <h2 className="text-lg font-semibold text-center">IDEA Review</h2>
      </div>

      {/* Sidebar Links */}

      <nav className="flex-grow px-4">
        <ul>
          {sidebarLinks.map(
            (link, index) =>
              link.show && (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    onClick={() => dispatch(updateSlideBar({open:false}))}
                    className="block p-3 hover:bg-gray-700 hover:rounded-md"
                    activeClassName="bg-gray-700 rounded-md"
                  >
                    {link.label}
                  </NavLink>
                </li>
              )
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
