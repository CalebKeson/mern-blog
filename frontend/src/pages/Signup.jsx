import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex gap-8 p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
        {/* left side */}
        <div className="flex-1">
          <Link
            to="/"
            className="self-center font-bold dark:text-white text-4xl"
          >
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Niaje
            </span>
            .com
          </Link>
          <p className="text-sm mt-5">
            Step into a world where ideas come alive and stories leave their
            mark. Here, every word is a spark—igniting curiosity, conversation,
            and change.
          </p>
        </div>
        {/* right side */}
        <div className="flex-1 mt-5 md:mt-0">
          <form className="flex flex-col gap-5 mt-5">
            <div>
              <Label htmlFor="username">Username</Label>
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <TextInput
                type="email"
                placeholder="example@gmail.com"
                id="email"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                required
              />
            </div>
            <Button
              type="submit"
              className="bg-gradient-to-br from-purple-600 to-pink-500 text-white hover:bg-gradient-to-bl cursor-pointer"
            >
              Sign Up
            </Button>
          </form>
          <div>
            <p className=" flex gap-2 text-sm mt-5">
              Already have an account?{" "}
              <Link
                to="/sign-in"
                className="text-blue-500 hover:underline dark:text-blue-400"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
