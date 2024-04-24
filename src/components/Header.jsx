import React from "react";
import Toast from "./Toast";

const Header = ({ showToast, handleClick, toastMessage, toastType }) => {
  return (
    <div className="relative">
      <div className="bg-slate-200 py-2 px-4 text-end text-sm h-14 sticky top-0 flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          BiteSpeed ChatBot Flow Builder
        </h1>
        <button
          className="bg-white border border-blue-600 text-blue-600 font-bold py-2 px-10 rounded md:mr-10"
          onClick={handleClick}
        >
          Save Changes
        </button>
      </div>
      {showToast && <Toast message={toastMessage} type={toastType} />}
    </div>
  );
};

export default Header;
