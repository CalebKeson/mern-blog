import React from "react";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  TextInput,
} from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
const Header = () => {
  const pathname = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
    // console.log("Theme toggled");
  }
  
  return ( 
    <Navbar className="border-b-2 border-gray-200 dark:bg-gray-900 dark:border-gray-700">
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
        <Button className="hidden sm:inline cursor-pointer" color="light" pill onClick={handleToggleTheme}>
          {theme === "dark" ? (<FaMoon />) : (<FaSun />)}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img={currentUser.user.profilePicture}
                rounded={true}
                className="cursor-pointer"
              />
            }
            
          >
            <DropdownHeader>
              <span className="block text-sm">@{currentUser.user.username}</span>
              <span className="block font-medium truncate">{currentUser.user.email}</span>
            </DropdownHeader>
            <Link to="/dashboard?tab=profile">
              <DropdownItem>Profile</DropdownItem>
            </Link>
            <DropdownDivider />
            <DropdownItem>Sign out</DropdownItem>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl cursor-pointer">
              Sign In
            </Button>
          </Link>
        )}
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
