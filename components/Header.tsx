import React from "react";
import { FaUser } from "react-icons/fa6";

export const Header = () => {
  return (
    <header className="bg-[#F0F3F7] flex items-center justify-between py-4 px-6">
      <p data-testid="header-title" className="text-xl font-semibold">
        Acme Store
      </p>
      <div className="bg-white p-2 rounded ring-1 ring-gray-300 shadow-md">
        <FaUser />
      </div>
    </header>
  );
};
