import React from "react";

interface IScreenCenter {
  children: React.ReactNode;
  bgColor: "white" | "transparent";
}

export default function ScreenCenter({ children, bgColor }: IScreenCenter) {
  return (
    <main className="flex justify-center min-h-[calc(100vh-60px)]">
      <div
        className={`bg-${bgColor} max-w-[1200px] w-full py-[24px] px-[16px]  lg:px-0 sm:px-[24px]`}
      >
        {children}
      </div>
    </main>
  );
}
