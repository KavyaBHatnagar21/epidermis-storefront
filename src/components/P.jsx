import React from 'react';
import clsx from 'clsx';

const P = ({ children, className, ...props }) => {
  return (
    <p className={clsx('text-base text-secondary tracking-wider', className)} {...props}>
      {children}
    </p>
  );
};

export default P;
