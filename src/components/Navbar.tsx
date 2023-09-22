import React from "react";
import { useNavigate, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="h-full fixed left-12 top-[64px] w-32 pt-8 text-[16px]">
      <div className="flex flex-col text-[#777] w-20">
        <ul className="divide-y divide-slate-700 cursor-pointer flex flex-nowrap flex-col gap-12 w-24 font-semibold text-[16px]">
          <li className=" hover:text-[#f6f6f6]">
            <NavLink
              to="/"
              className={(navData) => (navData.isActive ? "active" : "")}
            >
              Dashboard
            </NavLink>
          </li>
          <li className="hover:text-[#f6f6f6]">
            <NavLink
              className={(navData) => (navData.isActive ? "active" : "")}
              to={"/category"}
            >
              Category
            </NavLink>
          </li>
          <li className=" hover:text-[#f6f6f6]">
            <NavLink
              className={(navData) => (navData.isActive ? "active" : "")}
              to={"/item"}
            >
              List Product
            </NavLink>
          </li>
          <li className=" hover:text-[#f6f6f6]">
            <NavLink
              className={(navData) => (navData.isActive ? "active" : "")}
              to={"/voucher"}
            >
              Voucher
            </NavLink>
          </li>
          <li className=" hover:text-[#f6f6f6]">
            <NavLink
              className={(navData) => (navData.isActive ? "active" : "")}
              to={"/flash-sale"}
            >
              Flash Sale
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
