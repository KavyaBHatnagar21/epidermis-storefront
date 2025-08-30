import React from 'react';
import clsx from 'clsx';

const P = ({ children, variant = "dark", size = "base", className, ...props }) => {
  return (
    <p
      className={clsx(
        `text-${size} text-${variant === "dark" ? "secondary" : "white"} tracking-wider`,
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
};

export default P;
