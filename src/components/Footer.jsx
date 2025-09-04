import Brand from "./Brand";
import { Link } from "react-router-dom";
import P from "./P";

export default function Footer() {
  return (
    <footer className="bg-brown">
      <div className="container  mx-auto grid grid-cols-2 grid-rows-2 md:grid-rows-1 px-4 pt-16 mb-16 md:grid-cols-3 md:justify-items-center">
        <div className="col1 flex flex-col gap-2 row-start-1">
          <Brand variant="light" />
          <div className="my-1 md:my-4 flex space-x-2 md:space-x-3">
            {/* TODO: Add social media links */}
            <Link
              to="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-75"
            >
              <img
                src="/src/assets/icon_instagram.svg"
                alt="Instagram"
                className="h-10 w-10"
              />
            </Link>
            <Link
              to="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-75"
            >
              <img
                src="/src/assets/icon_facebook.svg"
                alt="Facebook"
                className="h-10 w-10"
              />
            </Link>
            <Link
              to="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-75"
            >
              <img
                src="/src/assets/icon_whatsapp.svg"
                alt="WhatsApp"
                className="h-10 w-10"
              />
            </Link>
          </div>
          <div className="mt-4">
            <img
              src="/src/assets/bw_footer_img.png"
              alt="Footer"
              className="w-30 hidden md:block"
            />
          </div>
          
        </div>
        <div className='row-start-2 md:row-start-1'>
          <P className="mb-6 font-semibold" variant="light">
            NAVIGATION
          </P>
          <div className="flex flex-col space-y-2 text-sm text-white uppercase">
            <Link to="/" className="hover:underline">
              <P variant="light">Home</P>
            </Link>
            <Link to="/about" className="hover:underline">
              <P variant="light">About Us</P>
            </Link>
            <Link to="/shop" className="hover:underline">
              <P variant="light">Shop</P>
            </Link>
            <Link to="/contact" className="hover:underline">
              <P variant="light">Contact Us</P>
            </Link>
          </div>
        </div>
        <div className='row-start-2 md:row-start-1'>
          <P className="mb-6 font-semibold" variant="light">
            SHOP
          </P>
          <div className="flex flex-col space-y-2 text-sm text-white uppercase">
            {[
              { title: "Women", handle: "women" },
              { title: "Men", handle: "men" },
              { title: "Children", handle: "children" },
            ].map((category) => (
              <Link
                key={category.handle}
                to={`/shop/${category.handle}`}
                className="hover:underline"
              >
                <P variant="light">{category.title}</P>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <P className="text-sm mb-8 text-center" variant="light">
            © EPIDERMIS {new Date().getFullYear()} ALL RIGHTS RESERVED.
          </P>
    </footer>
  );
}
