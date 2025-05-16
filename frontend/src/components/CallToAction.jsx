import { Button } from "flowbite-react";
import React from "react";

const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Want to learn more about JavaScript?</h2>
        <p className="text-gray-500 my-2">
          Checkout these resources with 100 JavaScript Projects
        </p>
        <Button className="bg-gradient-to-br from-purple-600 to-pink-500 text-white hover:bg-gradient-to-bl rounded-tl-xl rounded-bl-none rounded-br-xl rounded-tr-none cursor-pointer">
          Learn More
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img
          src="https://publir.com/blog/wp-content/uploads/2021/08/blog.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default CallToAction;
