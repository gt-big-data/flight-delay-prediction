import React from "react";

const Button = ({ src, handler, size = 16, customStyle = {} }) => {
  return (
    <button
      onClick={handler}
      className={`p-1 rounded-full hover:bg-gray-200 transition-colors duration-150 ${customStyle}`}
      style={{ border: "1px solid rgba(95, 99, 104, 0.20)" }}
    >
      <img
        src={src}
        alt=""
        style={{ width: `${size}px`, height: `${size}px` }}
      />
    </button>
  );
};

export default Button;
