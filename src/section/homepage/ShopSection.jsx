import React from "react";
import ArrowLink from "../../components/ArrowLink";
import HeadingWithEphesis from "../../components/HeadingWithEphesis";
import {Link} from "react-router-dom";

export default function ShopSection() {
  return (<div
      className="shop-section mx-auto mb-16 grid h-[100vh] grid-cols-16 grid-rows-9 overflow-hidden sm:mb-0 md:mb-16 md:h-[100vh] lg:mb-32 xl:mb-0 xl:container xl:px-5 2xl:px-20">
      {/* Left Image */}
      <div className="col-start-1 col-end-8 row-start-2 row-end-9 pt-10 sm:pt-5 xl:col-end-5 xl:pt-15">
        <img
          src="/src/assets/shop_section/shop_img_1.png"
          alt="Left"
          className="h-auto max-w-full lg:w-full"
        />

        <Link to="/categories/men">
          <ArrowLink
            useButton
            className="bg-primary xl:text-primary mt-3 w-full text-white sm:h-14 xl:border-1 xl:bg-transparent"
          >
            MEN&nbsp;→
          </ArrowLink>
        </Link>
      </div>

      {/* Center Content */}
      <div className="col-start-1 row-start-1">
        <HeadingWithEphesis
          lines={["Our", "collection"]}
          ephesisLetters={["O", "C", "M"]}
          className="ml-5 text-2xl sm:text-4xl"
        />
      </div>

      <p
        className="text-secondary z-1 col-start-9 col-end-16 row-start-2 py-10 font-serif leading-relaxed lg:text-2xl xl:col-start-10 xl:col-end-14">
        TIMELESS & SOPHISTICATED HANDBAG RENDERED IN FINE LEATHER.
      </p>

      {/* Right Images */}
      <div
        className="col-start-1 col-end-8 row-start-6 sm:row-start-6 md:pt-12 xl:col-start-7 xl:col-end-10 xl:row-start-5">
        <img
          src="/src/assets/shop_section/shop_img_2.png"
          alt="Right"
          className="h-auto max-w-full pt-8 sm:pt-0 lg:w-full"
        />
        <Link to="/categories/children">
          <ArrowLink
            useButton
            className="bg-primary xl:text-primary mt-3 w-full text-white sm:h-14 xl:border-1 xl:bg-transparent"
          >
            CHILDREN&nbsp;→
          </ArrowLink>
        </Link>

      </div>
      <div className="col-start-9 col-end-17 row-start-4 sm:row-start-3 xl:col-start-13 xl:row-start-2">
        <img
          src="/src/assets/shop_section/shop_img_3.png"
          alt="Right Img"
          className="mt-10 h-auto w-100 lg:w-full xl:mt-0"
        />
        <Link to="/categories/women">
          <ArrowLink
            useButton
            className="bg-primary xl:text-primary mt-3 w-full text-white sm:h-14 xl:border-1 xl:bg-transparent"
          >
            WOMEN&nbsp;→
          </ArrowLink>
        </Link>
      </div>
    </div>);
}
