import React from "react";
import H4 from "./H4";

export default function Message({ children }) {
  return (
    <div className="flex h-full items-center justify-center py-40">
      <H4>{children}</H4>
    </div>
  );
}
