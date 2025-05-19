import { Alert, Button, Textarea } from "flowbite-react";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Comment from "./Comment";

const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);

  const navigate = useNavigate();
  const [likingCommentId, setLikingCommentId] = useState(null);
  const [lastLikeTime, setLastLikeTime] = useState(0);

  // console.log(comments);
  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);

        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("function called!");
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser?.user._id,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setComment("");
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
      console.log(error.message);
    }
  };

  // const handleLike = async (commentId) => {
  //   try {
  //     if (!currentUser) {
  //       navigate("/sig-in");
  //       return;
  //     }
  //     const res = await fetch(`/api/comment/likeComment/${commentId}`, {
  //       method: "PUT",
  //     });

  //     if (res.ok) {
  //       const data = await res.json();
  //       setComments(
  //         comments.map((comment) => {
  //           comment._id === commentId
  //             ? {
  //                 ...comment,
  //                 likes: data.likes,
  //                 numberOfLikes: data.numberOfLikes,
  //               }
  //             : comment;
  //         })
  //       );
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  //   const handleLike = async (commentId) => {
  //   try {
  //     if (!currentUser) {
  //       navigate("/sign-in");
  //       return;
  //     }
  //     const res = await fetch(`/api/comment/likeComment/${commentId}`, {
  //       method: "PUT",
  //     });

  //     if (res.ok) {
  //       const data = await res.json();
  //       setComments(
  //         comments.map((comment) =>
  //           comment._id === commentId
  //             ? {
  //                 ...comment,
  //                 likes: data.likes,
  //                 numberOfLikes: data.numberOfLikes, // Use data.numberOfLikes instead of data.likes.length
  //               }
  //             : comment
  //         )
  //       );
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const handleLike = useCallback(
    async (commentId) => {
      try {
        // Debounce check
        const now = Date.now();
        if (now - lastLikeTime < 300) return;
        setLastLikeTime(now);

        // Optimistic update
        setComments((prev) =>
          prev.map((comment) => {
            if (comment._id === commentId) {
              const isLiked = comment.likes.includes(currentUser._id);
              return {
                ...comment,
                likes: isLiked
                  ? comment.likes.filter((id) => id !== currentUser._id)
                  : [...comment.likes, currentUser._id],
                numberOfLikes: isLiked
                  ? comment.numberOfLikes - 1
                  : comment.numberOfLikes + 1,
              };
            }
            return comment;
          })
        );

        setLikingCommentId(commentId);

        const res = await fetch(`/api/comment/likeComment/${commentId}`, {
          method: "PUT",
        });

        if (!res.ok) throw new Error("Like failed");

        const data = await res.json();

        // Final sync with server
        setComments((prev) =>
          prev.map((c) => (c._id === commentId ? { ...c, ...data } : c))
        );
      } catch (error) {
        // Revert on error
        setComments(comments);
        console.error("Like error:", error);
      } finally {
        setLikingCommentId(null);
      }
    },
    [currentUser, navigate, comments, lastLikeTime]
  );
  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser?.user ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Signed in as:</p>
          <img
            className="h-5 w-5 object-cover rounded-full"
            src={currentUser.user.profilePicture}
            alt={currentUser.user.username}
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-xs text-cyan-600 hover:underline"
          >
            @{currentUser.user.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          You must be signed in to comment.
          <Link className="text-blue-500 hover:underline" to="/sign-in">
            Sign in
          </Link>
        </div>
      )}
      {currentUser?.user && (
        <form
          onSubmit={handleSubmit}
          className="border border-teal-500 rounded-md p-3"
        >
          <Textarea
            placeholder="Add a comment..."
            rows="3"
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-500 text-xs">
              {200 - comment.length} characters remaining
            </p>
            <Button
              outline
              color="teal"
              className="cursor-pointer"
              type="submit"
            >
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color="failure" className="mt-5">
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {comments.length === 0 ? (
        <p className="text-sm my-5">No comments yet!</p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-1">
            <p>Comments</p>
            <div className="border border-gray-400 py-1 px-2 rounded-sm">
              <p>{comments.length}</p>
            </div>
          </div>

          {comments.map((comment, index) => (
            <Comment key={index} comment={comment} onLike={handleLike} />
          ))}
        </>
      )}
    </div>
  );
};

export default CommentSection;
