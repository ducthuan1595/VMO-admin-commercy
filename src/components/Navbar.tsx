import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="h-full w-36 pt-8 text-[16px]">
      <div className="flex flex-col text-[#777] w-20">
        <ul className="divide-y divide-slate-700 cursor-pointer flex flex-nowrap flex-col gap-6 w-24 font-semibold">
          <li className=" hover:text-[#f6f6f6]" onClick={() => navigate("/")}>
            Dashboard
          </li>
          <li
            className=" hover:text-[#f6f6f6]"
            onClick={() => navigate("/category")}
          >
            Category
          </li>
          <li
            className=" hover:text-[#f6f6f6]"
            onClick={() => navigate("/item")}
          >
            List Products
          </li>
          <li
            className=" hover:text-[#f6f6f6]"
            onClick={() => navigate("/voucher")}
          >
            Voucher
          </li>
          <li
            className=" hover:text-[#f6f6f6]"
            onClick={() => navigate("/flash-sale")}
          >
            Flash Sale
          </li>
        </ul>
      </div>
    </div>
  );
}
