import React from "react";
import Navbar from "@/components/shared/Navbar/Navbar";
import LeftSideBar from "@/components/shared/LeftSideBar/LeftSideBar";
import RightSideBar from "@/components/shared/RightSideBar/RightSideBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light850_dark100 relative">
      <Navbar />
      <div className="flex">
        <LeftSideBar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full">{children}</div>
        </section>
        <RightSideBar />
      </div>
    </main>
  );
};

export default Layout;
