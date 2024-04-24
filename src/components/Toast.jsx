import React from "react";

// Toast component
const Toast = ({ message, type }) => {
  return (
    <div
      className={`toast ${type} fixed top-10 left-1/2 transform -translate-x-1/2 px-6 py-4 rounded-md text-white`}
    >
      <p>{message}</p>
    </div>
  );
};

export default Toast;
