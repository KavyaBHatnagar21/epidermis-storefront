import Brand from "./Brand";
import { Link } from "react-router-dom";
import P from "./P";

export default function Footer() {
  return (
    <footer className="bg-brown">
      <div className="mx-auto grid max-w-7xl grid-cols-1 justify-items-center gap-12 px-6 py-16 md:grid-cols-3">
        <div className="col1 flex flex-col gap-2">
          <Brand variant="light" className="" />
          <div className="my-4 flex space-x-3">
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
              className="w-30"
            />
          </div>
            <P className="mt-18 text-sm" variant="light">
              © EPIDERMIS {new Date().getFullYear()} ALL RIGHTS RESERVED.
            </P>
        </div>
        <div>
          <P className="mb-6 font-semibold" variant="light">
            NAVIGATION
          </P>
          <div className="flex flex-col space-y-2 text-sm uppercase text-white">
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
        <div>
          <P className="mb-6 font-semibold" variant="light">
            SHOP
          </P>
          <div className="flex flex-col space-y-2 text-sm uppercase text-white">
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
    </footer>
  );
}
