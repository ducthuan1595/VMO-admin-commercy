import Header from "../components/Header";
import React from "react";
import Navbar from "../components/Navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#121212] min-h-screen h-full">
      <div className="w-11/12 mx-auto">
        <Header />
        <div className="border-b fixed left-0 right-0 top-[64px] border-[#383838]"></div>
        <div className="flex relative">
          <Navbar />
          <div className="border-l ml-[160px] border-[#383838]"></div>
          <div className="p-12 mt-10 w-full">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
