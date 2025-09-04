import React from "react";
import ArrowLink from "../../components/ArrowLink";

export default function HeroSection() {
  return (
    <section className="hero-section mb-15 md:mb-30 xl:mb-0">
      {/* Desktop-first grid; collapses cleanly on smaller screens */}

      <div className="mx-auto grid h-[60vh] grid-cols-16 grid-rows-9 overflow-hidden md:h-[90vh] xl:container xl:p-8 2xl:px-20">
        {/* Left large image */}
        <div className="col-start-1 col-end-17 row-start-1 row-end-10 lg:row-start-1 lg:row-end-10 xl:col-start-1 xl:col-end-6 xl:row-start-1 xl:row-end-8">
          <img
            src="/src/assets/hero_section/hero_img_1.png"
            alt="Left"
            className="h-full w-full max-w-full object-cover object-center lg:object-bottom"
          />
        </div>

        <div className="z-10 col-start-13 col-end-17 row-start-2 hidden justify-self-end xl:block">
          <img
            src="/src/assets/hero_section/hero_img_2.png"
            alt="Right"
            className="h-auto max-w-full"
          />
        </div>

        {/* Small black bag image */}
        <div className="z-20 col-start-11 col-end-[-4] row-start-5 hidden justify-self-end xl:row-start-6 xl:block">
          <img
            src="/src/assets/hero_section/hero_img_3.png"
            alt="Bag"
            className="h-auto max-w-full"
          />
        </div>

        {/* Headline line 1: ELEgANcE */}
        <h1 className="xl:text-primary z-30 col-start-1 col-end-17 row-start-3 text-center font-serif text-5xl leading-none tracking-widest text-white uppercase sm:text-7xl lg:text-9xl xl:col-start-5 xl:row-start-1 xl:pt-5 xl:text-left xl:text-7xl 2xl:row-start-1">
          ELE
          <span className="font-[Ephesis]">g</span>
          AN
          <span className="font-[Ephesis]">c</span>E
        </h1>

        {/* Headline line 2: & QUALITY */}
        <h1 className="xl:text-primary z-30 col-start-1 col-end-17 row-start-4 pt-5 text-center font-serif text-5xl leading-none tracking-widest text-white uppercase sm:text-7xl md:pt-0 lg:pt-12 lg:text-9xl xl:col-start-7 xl:row-start-3 xl:pt-0 xl:text-left xl:text-7xl 2xl:col-end-[-4] 2xl:row-start-2 2xl:justify-self-end 2xl:pt-8">
          <span className="font-[Ephesis]">& </span>
          QUALIT
          <span className="font-[Ephesis]">y</span>
        </h1>

        {/* Copy and CTA */}
        <div className="z-30 col-start-5 col-end-13 row-start-6 text-white md:col-start-6 md:col-end-12 md:row-start-5 md:pt-1 lg:row-start-6 lg:pt-0 xl:col-start-7 xl:col-end-10 xl:row-start-5">
          <p className="xl:text-primary mb-12 hidden text-center text-lg leading-relaxed md:block lg:text-2xl xl:mb-8 xl:text-left xl:text-lg">
            A leather accessories business that has been crafting timeless and
            stylish pieces for nearly half a century.
          </p>
          <ArrowLink
            useButton
            className="bg-primary xl:text-primary w-full xl:border-1 xl:bg-transparent"
          >
            Explore&nbsp;→
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}
