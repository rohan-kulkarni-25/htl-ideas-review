import React, { useState } from "react";
import { BsList, BsPerson, BsPersonAdd } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateSlideBar } from "../store/Slices/sideBarSlice";

const Header = () => {
  const user = useSelector((state) => state.user);
  const sideBar = useSelector(state => state.sideBar)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [mobileView,setMobileView] = useState(false)
  const onLogout = () => {
    navigate("/");
  };

  const handleSideBar = () => {
dispatch(updateSlideBar({open:!sideBar.open}))
  }

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-end items-center">
      {/* Application Title */}
      {user.user.userType == "admin" && (
        <button
          onClick={() => navigate("/addTalks")}
          className="bg-blue-600 text-white px-4 mx-8 py-2  rounded-md hover:bg-blue-700 sm:hidden"
        >
          ADD IDEAS
        </button>
      )}

      <BsList className="text-xl mr-auto hidden sm:block" onClick={handleSideBar} />
      {/* User Information and Logout Button */}
      <div className="flex items-center space-x-4">
        {/* User's Username */}
        <BsPerson className="text-xl" />
        {user.user.userType == "admin" && (
          <span className="text-sm text-white">{user.user.userType}</span>
        )}
        <span className="text-sm text-white">{user.user.username}</span>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
