import React from "react";
import HeadingWithEphesis from "../../components/HeadingWithEphesis";
import ArrowLink from "../../components/ArrowLink";

const CallToActionSection = () => {
  return (
    <section className="mb-16 flex grid-cols-[1fr_0.2fr_0.2fr_0.35fr_0.35fr_1fr] grid-rows-[0.15fr_0.3fr_0.2fr_0.45fr_0.5fr] flex-col gap-8
     xl:container xl:mx-auto lg:grid lg:gap-0 xl:px-8 2xl:px-20">
      {/* Display Text */}
      <HeadingWithEphesis
        lines={["THE ART OF", "CARRYING WELL"]}
        ephesisLetters={["O", "C", "W"]}
        className="col-span-2 col-end-7 row-span-2 mx-6 lg:text-right text-xl sm:text-4xl"
        heading
      />

      {/* Right Image */}
      <img
        src="/src/assets/cta_section/cta_img_2.png"
        alt="Left"
        className="col-end-7 row-span-2 row-end-6 ml-auto hidden self-end lg:block"
      />

      {/* Paragraph */}
      <p className="text-secondary z-1 col-span-3 col-start-2 row-start-3 hidden font-serif leading-relaxed lg:block lg:text-xl">
        ELEVATE YOUR EVERYDAY WITH TIMELESS ELEGANCE.
      </p>

      {/* Left Image */}
      <img
        src="/src/assets/cta_section/cta_img_1.png"
        alt="Left"
        className="col-span-2 col-start-1 row-span-3 row-start-2"
      />

      {/* Center Content */}
      <div className=" col-start-4 col-span-2 row-end-5 lg:self-end px-6 lg:w-64">
        <ArrowLink
          useButton
          className="bg-primary lg:text-primary w-full text-white sm:h-14 lg:border-1 lg:bg-transparent"
        >
          EXPLORE &nbsp;→
        </ArrowLink>
      </div>
    </section>
  );
};

export default CallToActionSection;
