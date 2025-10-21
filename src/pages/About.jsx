import React from "react";
import HeadingWithEphesis from "../components/HeadingWithEphesis";
import aboutImage from "../assets/about_page_images/about_img_1.png";
import P from "../components/P";

export default function About() {
  return (
    <div className="mb-15 flex flex-col gap-8 lg:container lg:mx-auto lg:mt-15 lg:px-8 2xl:px-20">
      <div className="lg:mb-15 lg:flex lg:flex-row lg:gap-x-15">
        <img
          src={aboutImage}
          alt="Epidermis Brand"
          className="mb-8 h-auto w-full lg:w-100"
        />

        <div className="mb-15 flex w-full flex-col px-8 text-gray-800 xl:w-xl xl:mx-auto">
          <HeadingWithEphesis
            lines={["About", "The Brand"]}
            ephesisLetters={["A"]}
            className="mb-6"
            headingClassName="text-3xl sm:text-4xl"
          />
          <p className="mb-4">
            Welcome to Epidermis, a family-run fashion accessories business that
            has been crafting timeless and stylish pieces for nearly half a
            century. We have built a reputation for our exceptional
            craftsmanship and commitment to quality, using only the finest
            materials in our creations.
          </p>
          <p className="mb-4">
            Our selection includes leather, faux leather, and fabric accessories
            that blend classic elegance with modern trends. Whether you are
            seeking a chic handbag, a sophisticated belt, or a unique wallet,
            you will find it among our meticulously designed products. We take
            pride in offering durable and fashionable accessories that cater to
            every taste, ensuring each piece becomes a cherished part of your
            wardrobe.
          </p>
          <p>
            Thank you for choosing Epidermis—we look forward to serving you with
            our passion for style and excellence.
          </p>
        </div>
      </div>

      <div className="mb-15 px-8 lg:px-0">
        <HeadingWithEphesis
          lines={["material"]}
          ephesisLetters={["M"]}
          className="mb-8"
          headingClassName="text-3xl sm:text-4xl"
        />

        <div className="flex flex-col lg:flex-row lg:gap-x-15">
          <div className="flex flex-col gap-10 order-2 lg:order-1 lg:w-1/2 lg:px-0 lg:justify-center lg:mb-20">
            <div>
              <p className="text-secondary mb-6 font-serif leading-relaxed lg:block lg:text-xl">
                BEST QUALITY INDUSTRIAL LEATHER
              </p>
              <P>
                Specially formulated, full-grain buffalo hide built for extreme
                durability. Reinforced fibre structure and advanced finishing
                provide exceptional resistance to abrasion, chemicals, heat, and
                impact — ideal for work-wear, safety gear, and heavy-use
                applications.
              </P>
            </div>
            <div>
              <p className="text-secondary mb-6 font-serif leading-relaxed lg:block lg:text-xl">
                BEST QUALITY BUFFALO CALF LEATHER
              </p>
              <P>
                Where the strength of buffalo meets the supple elegance of calf.
                Our calf leathers are carefully selected for their fine, even
                grain and luxurious softness — perfect for high-end fashion
                goods and refined accessories.
              </P>
            </div>
          </div>
          <div className="mb-12 grid grid-cols-2 order-1 lg:order-2 grid-rows-2 gap-4 lg:w-1/2 xl:w-1/3 xl:mx-auto">
            <div>
              <img
                src="/src/assets/about_page_images/about_img_material_1.png"
                alt="Left"
                className="mb-2 h-auto w-full aspect-[3/4] object-cover"
              />
              <P>Smooth Calf</P>
            </div>

            <div className="">
              <img
                src="/src/assets/about_page_images/about_img_material_2.png"
                alt="Left"
                className="mb-2 h-auto w-full aspect-[3/4] object-cover"
              />
              <P>Grained Calf</P>
            </div>

            <div>
              <img
                src="/src/assets/about_page_images/about_img_material_3.png"
                alt="Left"
                className="mb-2 h-auto w-full aspect-[3/4] object-cover"
              />
              <P>Waxy Calf</P>
            </div>

            <div>
              <img
                src="/src/assets/about_page_images/about_img_material_4.png"
                alt="Left"
                className="mb-2 h-auto w-full aspect-[3/4] object-cover"
              />
              <P>Embossed Calf</P>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:flex lg:flex-row lg:gap-x-15">
        <img
          src="/src/assets/about_page_images/about_img_2.png"
          alt="Left"
          className=" mb-8 h-auto w-full lg:w-100"
        />

        <div className="mb-6 w-full px-8 text-gray-800">
          <HeadingWithEphesis
            lines={["Why", "Choose Us"]}
            ephesisLetters={["w", "C"]}
            className="mb-6"
            headingClassName="text-3xl sm:text-4xl"
          />

          <div className="mb-15 flex flex-col gap-8">
            <div>
              <p className="text-secondary mb-2 font-serif text-lg leading-relaxed lg:block lg:text-xl">
                Specialized Expertise
              </p>
              <P>
                Three decades of developing leather for industrial end-uses. We
                are one of the best leather goods manufacturers in India.
              </P>
            </div>

            <div>
              <p className="text-secondary mb-2 font-serif text-lg leading-relaxed lg:block lg:text-xl">
                Stringent Testing
              </p>
              <P>
                In-house lab certified to ASTM and ISO standards for mechanical,
                chemical, and thermal performance.
              </P>
            </div>

            <div>
              <p className="text-secondary mb-2 font-serif text-lg leading-relaxed lg:block lg:text-xl">
                Sustainable Sourcing
              </p>
              <P>
                Ethically sourced hides and water-conserving tannery processes.
              </P>
            </div>

            <div>
              <p className="text-secondary mb-2 font-serif text-lg leading-relaxed lg:block lg:text-xl">
                Global Supply Network
              </p>
              <P>
                Reliable, scalable production with on-time delivery for both
                pilot runs and mass orders.
              </P>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
