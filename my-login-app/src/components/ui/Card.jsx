import React from "react";

const Card = ({ children, className = "", padding = "medium" }) => {
  const paddings = {
    small: "p-4",
    medium: "p-6 sm:p-8",
    large: "p-8 sm:p-10",
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-lg ${paddings[padding]} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
