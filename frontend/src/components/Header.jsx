import React from "react";
import { Button, Navbar, NavbarCollapse, NavbarLink, NavbarToggle, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

const Header = () => {
  const pathname = useLocation().pathname;
  return (
    <Navbar className="border-b-2 border-gray-200">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Niaje
        </span>
        .com
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search"
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className="lg:hidden" color="light" pill>
        <AiOutlineSearch className="w-5 h-5" />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button className="hidden sm:inline" color="light" pill>
          <FaMoon />
        </Button>
        <Link to="/sign-in">
          <Button className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800">
            Sign In
          </Button>
        </Link>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink as={Link} to="/" active={pathname === "/"}>
          Home
        </NavbarLink>
        <NavbarLink as={Link} to="/about" active={pathname === "/about"}>
          About
        </NavbarLink>
        <NavbarLink as={Link} to="/contact" active={pathname === "/contact"}>
          Contact
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
};

export default Header;