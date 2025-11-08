import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavLink from "./NavLink";
import Brand from "./Brand";
import IconButton from "./IconButton";
import CartButton from "./CartButton";
import useUser from "../hooks/useUser.js"
import useCart from "../hooks/useCart.js";
import P from "../components/P";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [itemCount, setItemCount] = React.useState(0);
  const { customer, logout } = useUser();
  const { cart } = useCart();

  const isCustomerEmpty = !customer || Object.keys(customer).length === 0;

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
  };


  React.useEffect(() => {
    const count = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
    setItemCount(count);
  }, [cart]);

  return (
    <header className="py-4 xl:py-10 uppercase relative">
      <div className="mx-auto grid h-full grid-cols-3 items-center px-4 lg:px-16 xl:container 2xl:px-20">
        {/* Left nav */}
        <nav className="flex md:justify-around">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
          >
            <IconButton name="hamburger" />
          </button>
          <NavLink to="/about" className="hidden md:block">
            About
          </NavLink>
          <NavLink to="/shop" className="hidden md:block">
            Shop
          </NavLink>
        </nav>

        {/* Logo centered */}
        <Brand className="flex justify-center text-lg sm:text-xl md:text-2xl" />

        {/* Right actions */}
        <div className="flex justify-end md:justify-around items-center gap-4">
          <NavLink to="/contact" className="hidden md:block">
            Contact
          </NavLink>
          <div className="flex justify-end md:justify-around items-center gap-4">
            <CartButton itemCount={itemCount} />
            {isCustomerEmpty ? (<div className="flex justify-end md:justify-around items-center gap-4">
              <Link to="/auth" className="hidden md:block">
                Login
              </Link>
            </div>) : (<div className="relative flex items-center gap-1 cursor-pointer" onClick={toggleProfileDropdown}>
              <IconButton name="profile" />
              <P>{customer.first_name}</P>
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-20 w-40 bg-white border border-gray-300 rounded shadow-lg z-50">
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>)}
            </div>)}
          </div>
        </div>
      </div>

      {/* Sidebar overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => setMenuOpen(false)}
      ></div>

      {/* Sidebar menu */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="p-6 flex flex-col gap-6 text-lg">
          <button
            className="self-end text-2xl"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>
          <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
          <NavLink to="/shop" onClick={() => setMenuOpen(false)}>Shop</NavLink>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
        </div>
      </div>
    </header>
  );
}
