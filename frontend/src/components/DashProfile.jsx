// import React from "react";
// import { useSelector } from "react-redux";

// const DashProfile = () => {
//   const { currentUser } = useSelector((state) => state.user);

//   return (
//     <div className="flex flex-col justify-center">
//       <h1 className="text-center">Profile</h1>
//       <form className="flex flex-col">
//         <div className="w-32 h-32 self-center">
//         <img src={currentUser?.user.profilePic} alt="" className="rounded-full w-full h-full object-cover border-8 border-[lightgray]"/>

//         </div>
//       </form>
//     </div>
//   );
// };

// export default DashProfile;

import { Button, TextInput } from "flowbite-react";
import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg mx-auto p-3 w-full ">
      <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <div className="w-32 h-32 self-center cursor-pointer rounded-full shadow-md overflow-hidden ">
          <img
            src={currentUser?.user.profilePic}
            alt="profile"
            className="h-full w-full rounded-full object-cover border-8 border-[lightgray]"
          />
        </div>
        <TextInput
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser?.user.username}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser?.user.email}
        />
        <TextInput type="password" id="password" placeholder="*************" />
        <Button
          type="submit"
          className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl cursor-pointer"
        >
          {currentUser.loading ? "Loading..." : "Update"}
        </Button>
     
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
