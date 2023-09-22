import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { context } from "../store";

export default function Header() {
  const value = useContext(context);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (value && value.setUser) {
      value.setUser(null);
      console.log(value.user);
      navigate("/login");
    }
  };

  return (
    <div className="bg-[#121212] flex justify-between px-12 z-50 fixed items-center top-0 left-0 right-0 h-16">
      <div className="flex justify-between items-center">
        <img src="/logo/book_logo.png" className="h-12" alt="logo" />
        <div className="bg-[#383838] rounded-full ml-3 py-2 px-4">
          <span className="text-[#ccc]">Book - </span>
          <span className="text-[#ccc] text-[14px]">
            {new Date().getDate()}/{new Date().getMonth() + 1}/
            {new Date().getFullYear()}
          </span>
        </div>
      </div>
      <div className="flex justify-center items-center gap-6 text-[white] text-[18px]">
        <span className="capitalize"> Hello,{value && value?.user?.name}</span>
        <span
          onClick={handleLogout}
          className="cursor-pointer hover:bg-[#383838] p-1 border-2 border-[#383838] rounded-lg"
        >
          Logout
        </span>
      </div>
    </div>
  );
}
