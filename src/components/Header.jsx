import React, { useState } from "react";

const Toast = ({ message, type }) => {
  return (
    <div
      className={`toast ${type} fixed bottom-10 left-1/2 transform -translate-x-1/2 px-6 py-4 rounded-md text-white`}
    >
      <p>{message}</p>
    </div>
  );
};

export const Header = ({ isConnected }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const handleClick = () => {
    if (isConnected) {
      setToastMessage("Saved successfully!");
      setToastType("bg-green-500");
    } else {
      setToastMessage("Error: All nodes are not connected");
      setToastType("bg-red-500");
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

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
