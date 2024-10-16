import React from "react";

const Arrow = ({ width = "140", height = "20", color = "#4a4a4a" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 200 30"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Main Line */}
      <line x1="30" y1="15" x2="170" y2="15" />
      {/* Arrowhead */}
      <polyline points="165,10 172,15 165,20" />
    </svg>
  );
};

export default Arrow;
