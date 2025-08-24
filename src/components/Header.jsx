import NavLink from "./NavLink";
import Brand from "./Brand";
import IconButton from "./IconButton";

export default function Header() {
  return (
    <header className="uppercase h-32 px-4">
      <div className="container mx-auto grid h-full grid-cols-3 items-center sm:px-16">
        {/* Left nav */}
        <nav className="flex justify-around">
          <NavLink to="/about">About</NavLink>
          <NavLink to="/shop">Shop</NavLink>
        </nav>
        {/* Logo centered */}
        <Brand />
        {/* Right actions */}
        <div className="flex items-center justify-around">
          <NavLink to="/contact">Contact</NavLink>
          <div className="flex gap-6">
            <IconButton name="cart" />
            <IconButton name="profile" />
          </div>
        </div>
      </div>
    </header>
  );
}
