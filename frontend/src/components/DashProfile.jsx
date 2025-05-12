import {
  Alert,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [formData, setFormData] = useState({});
  const [updatedUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updatedUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  const { error } = currentUser

  // console.log(currentUser);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  // console.log(imageFile, imageFileUrl);
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    console.log("Uploading image...");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleDeleteUser = async () => {
    setShowModal(false)
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method: "DELETE",
      })
      const data = await res.json()
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message))
      } else {
        dispatch(deleteUserSuccess(data))
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserSuccess(null);
    setUpdateUserError(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made!");
      return;
    }
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser?.user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateUserFailure(data));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateUserSuccess(data));
        setUpdateUserSuccess("Account updated successfully!");
        setTimeout(() => {
          setUpdateUserSuccess(null);
        }, 10000);
      }
    } catch (error) {
      dispatch(updateUserFailure(error));
      setUpdateUserError("Failed to update user's profile!");
      setTimeout(() => {
        setUpdateUserError(null);
      }, 10000);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full ">
      <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          ref={filePickerRef}
          onChange={handleImageChange}
          className="cursor-pointer"
          hidden
        />
        <div
          className="w-32 h-32 self-center cursor-pointer rounded-full shadow-md overflow-hidden "
          onClick={() => filePickerRef.current.click()}
        >
          <img
            src={imageFileUrl || currentUser?.user.profilePicture}
            alt="profile"
            className="h-full w-full rounded-full object-cover border-8 border-[lightgray]"
          />
        </div>
        <TextInput
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser?.user.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser?.user.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="*************"
          onChange={handleChange}
        />
        <Button
          type="submit"
          className="bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl cursor-pointer"
        >
          {currentUser.loading ? "Loading..." : "Update"}
        </Button>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={() => setShowModal(true)}
          className="text-red-700 cursor-pointer"
        >
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
      {updatedUserSuccess && (
        <Alert color="success" className="mt-5">
          {updatedUserSuccess}
        </Alert>
      )}
      {updatedUserError && (
        <Alert color="failure" className="mt-5">
          {updatedUserError}
        </Alert>
      )}
      {error && (
        <Alert color="failure" className="mt-5">
          {error}
        </Alert>
      )}
      {showModal && (
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          size="md"
          popup
        >
          <ModalHeader />
          <ModalBody>
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
              <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-200">
                Are you sure you want to delete your account?
              </h3>
              <div className="flex justify-center gap-4">
                <Button
                  className="bg-red-700 text-white hover:bg-red-600"
                  onClick={handleDeleteUser}
                >
                  Yes, I'm sure
                </Button>
                <Button color="light" onClick={() => setShowModal(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      )}
    </div>
  );
};

export default Profile;
