import React, { useEffect } from "react";
import { useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

const Comment = ({ comment, onLike }) => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  const { currentUser } = useSelector((state) => state.user);
  const isLiked =
    currentUser?.user._id && comment?.likes?.includes(currentUser.user._id);

  useEffect(() => {
    const getUser = async () => {
      try {
        if (!comment?.userId) {
          // Check if userId exists
          setError("User ID not found");
          return;
        }
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        console.log(data);
        if (!res.ok) {
          setError(data.message);
        }
        // if (res.ok) {
        //     setUser(data)
        //     console.log(user)
        // }
        setUser(data);
        // console.log(user)
      } catch (error) {
        console.log(error.message);
      }
    };

    getUser();
  }, [comment]);
  return (
    <div className="flex p-4 border-b border-gray-200 dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img 
          className="w-10 h-10 rounded-full bg-gray-200"
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment?.createdAt).fromNow()}
          </span>
        </div>
        <p className="text-gray-500 mb-2">{comment?.content}</p>
        <div className="flex items-center pt-2 text-xs border-t border-gray-100 max-w-fit gap-2">
          <button
            type="button"
            onClick={() => onLike(comment?._id)}
            className={`text-gray-400 hover:text-blue-500 cursor-pointer ${
              isLiked && "!text-blue-500"
            }`}
          >
            <FaThumbsUp className="text-sm" />
          </button>
          <p className="text-gray-400">
            {comment?.numberOfLikes > 0 &&
              comment?.numberOfLikes +
                " " +
                (comment?.numberOfLikes === 1 ? "like" : "likes")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
