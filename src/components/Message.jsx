import React from "react";
import H4 from "./H4";

export default function Message({ children, className, ...props }) {
  return (
    <div className={`flex h-full items-center justify-center py-40 ${className || ""}`} {...props}>
      <H4>{children}</H4>
    </div>
  );
}
