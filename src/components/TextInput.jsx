
import React from "react";
import clsx from "clsx";

const TextInput = ({ type = "text", placeholder, value, onChange, className, ...props }) => {
  return (
    <input
      className={clsx(
        "w-full border border-brown px-4 py-2 placeholder-gray-500 text-gray-700 focus:outline-none",
        className
      )}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

export default TextInput;
