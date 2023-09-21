import React, { useContext } from "react";

import { context } from "../store";

export default function Header() {
  const value = useContext(context);

  return (
    <div className="flex justify-between items-center h-16">
      <div className="flex justify-between items-center">
        <img src="/logo/book_logo.png" className="h-12" alt="logo" />
        <div className="bg-[#383838] rounded-full ml-3 py-2 px-4">
          <span className="text-[#ccc]">Book</span>
        </div>
      </div>
      <div className="flex justify-center items-center gap-6 text-[white] text-[18px]">
        <span className="capitalize">{value && value?.user?.name}</span>
        <span>Logout</span>
      </div>
    </div>
  );
}
