import React from "react";
import HeadingWithEphesis from "../../components/HeadingWithEphesis";
import ArrowLink from "../../components/ArrowLink";
const AboutSection = () => {
  return (
    <section className="mb-16 flex grid-cols-[1fr_1fr] flex-col gap-y-8 
    lg:mb-32 lg:grid lg:gap-x-16 
    xl:container xl:mx-auto xl:grid-cols-[1fr_1fr_1fr] xl:grid-rows-[0.6fr_0.32fr_1fr] xl:gap-x-32 xl:px-8 2xl:px-20">

      {/* Our Craftmanship */}
      <div className="col-span-2 col-start-2 row-start-1">
        <HeadingWithEphesis
          lines={["Our", "Craftmanship"]}
          ephesisLetters={["O", "C"]}
          className="ml-5 text-2xl sm:text-4xl lg:mb-8 lg:ml-0 xl:mb-0"
          headingClassName=""
        />
      </div>

      {/* Left Image */}
      <div className="col-start-1 row-span-3 row-start-1 hidden lg:block">
        <img
          src="/src/assets/about_section/about_img_2.png"
          alt="Left"
          className="h-auto max-w-full lg:w-full"
        />
      </div>

      {/* Right Image */}
      <div className="col-start-3 row-start-3 lg:ml-auto lg:w-80">
        <img
          src="/src/assets/about_section/about_img_3.png"
          alt="Left"
          className="h-auto w-full max-w-full"
        />
      </div>

      {/* Center Content */}
      <div className="col-start-2 row-span-2 row-start-2 px-6 lg:px-0">
        <p className="md:text-base 2xl:text-xl">
          Epidermis, takes pride in our commitment to exceptional quality and
          craftsmanship. We create our own leather and source high-quality
          leather from trusted, reliable suppliers, ensuring every piece is
          meticulously crafted with care. Our dedication to excellence is
          evident in the luxurious texture, durability, and rich character of
          our leather products. Experience the artistry and tradition that sets
          Epidermis’ Leather apart. If you are Looking for best leather goods
          manufacturers in India then you are at the right place.
        </p>
        <ArrowLink
          useButton
          className="xl:text-primary my-6 w-full bg-transparent xl:border-1"
        >
          Learn More&nbsp;→
        </ArrowLink>
      </div>
    </section>
  );
};

export default AboutSection;
