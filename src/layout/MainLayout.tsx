import Header from "../components/Header";
import React from "react";
import Navbar from "../components/Navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#121212] h-screen">
      <div className="w-11/12 mx-auto">
        <Header />
        <div className="border-b border-[#383838]"></div>
        <div className="flex">
          <Navbar />
          <div className="border-r border-[#383838]"></div>
          <div className="p-12 w-full">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
