import { Button, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null)
  const filePickerRef = useRef()

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
        setImageFile(file)
        setImageFileUrl(URL.createObjectURL(file))
    }
  };
  // console.log(imageFile, imageFileUrl);
  useEffect(() => {
    if (imageFile) {
      uploadImage()
    }

  }, [imageFile])

  const uploadImage = async () => {
    
  }

  return (
    <div className="max-w-lg mx-auto p-3 w-full ">
      <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input type="file" accept="image/*" ref={filePickerRef} onChange={handleImageChange} className="cursor-pointer" hidden/>
        <div className="w-32 h-32 self-center cursor-pointer rounded-full shadow-md overflow-hidden " onClick={()=>filePickerRef.current.click()}>
          <img
            src={imageFileUrl || currentUser?.user.profilePic}
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
