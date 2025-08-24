import React from "react";
import ArrowLink from "./ArrowLink";
import H3 from "./H3";

export default function CollectionPreview({ title }) {
  return (
    <div className="container mx-auto mb-20 sm:px-16">
      <H3>{title} Collection</H3>
      <div className="grid grid-cols-3 gap-4">
        <p>card</p>
        <p>card</p>
        <p>card</p>
        <p>card</p>
        <p>card</p>
        <p>card</p>
      </div>
      <ArrowLink to="/explore">Explore More</ArrowLink>
    </div>
  );
}
