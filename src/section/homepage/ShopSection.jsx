import React from "react";
import ArrowLink from "../../components/ArrowLink";
import HeadingWithEphesis from "../../components/HeadingWithEphesis";

export default function ShopSection() {
  return (
    <div className="shop-section container mx-auto mb-30 grid h-[90vh] grid-cols-16 grid-rows-9 gap-4 overflow-hidden">
      {/* Left Image */}
      <div className="col-start-1 col-end-5 row-start-3 row-end-9 pt-10">
        <img
          src="/src/assets/shop_section/shop_img_1.png"
          alt="Left"
          className="h-auto max-w-full"
        />
        <ArrowLink className="text-xl">men collection</ArrowLink>
      </div>

      {/* Center Content */}
      <div className="col-start-1 row-start-1">
        <HeadingWithEphesis
          lines={["Our", "craftsmanship"]}
          ephesisLetters={["O", "C", "M"]}
        />
      </div>

      <p className="text-secondary z-1 col-span-3 col-start-11 row-start-3 max-w-md font-serif leading-relaxed">
        TIMELESS, SOPHISTICATED, SILHOUETTE HANDBAG RENDERED IN FINE LEATHER.
      </p>

      {/* Right Images */}
      <div className="col-start-7 col-end-12 row-start-5">
        <img
          src="/src/assets/shop_section/shop_img_2.png"
          alt="Right"
          className="h-auto max-w-full"
        />
        <ArrowLink className="text-xl">children collection</ArrowLink>
      </div>
      <div className="col-start-13 col-end-17 row-start-2">
        <img
          src="/src/assets/shop_section/shop_img_3.png"
          alt="Right Img"
          className="h-auto w-100"
        />
        <ArrowLink className="text-xl">women collection</ArrowLink>
      </div>
    </div>
  );
}
