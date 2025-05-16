import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const UpdatePost = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getPosts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        } else {
          setPublishError(null);
          setFormData(data.posts[0]);
        }
      };
      fetchPost();
    } catch (error) {
      console.log(error);
    }
  }, [postId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(
        `/api/post/updatePost/${formData._id}/${currentUser.user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        setPublishError(data.message);
        setLoading(false);
        return;
      } 
      if (res.ok) {
        setPublishError(null);
        setLoading(false);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong!", error.message);
      setLoading(false);
    }
  };

  console.log(formData);
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            id="title"
            className="flex-1"
            required
            value={formData.title}
            onChange={handleChange}
          />
          <Select
            onChange={handleChange}
            value={formData.category}
            id="category"
            required
          >
            <option value="uncategorized">Select</option>
            <option value="javascript">Javascript</option>
            <option value="reactjs">React</option>
            <option value="langchain">Langchain</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-gray-300 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <Button
            type="button"
            color="gray"
            size="md"
            outline
            className="cursor-pointer"
            onClick={uploadImage}
          >
            Upload image
          </Button>
        </div>
        {/* {imageFileUrl && (
          <img
            src={imageFileUrl}
            alt="Preview"
            className="w-full h-72 object-cover mb-4"
          />
        )} */}
        {/* {formData && (
          <img
            src={"https://contenthub-static.grammarly.com/blog/wp-content/uploads/2017/11/how-to-write-a-blog-post.jpeg"}
            alt="Preview"
            className="w-full h-72 object-cover mb-4"
          />
        )} */}
        {formData?.image && (
          <img
            src={formData.image}
            alt="Preview"
            className="w-full h-72 object-cover mb-4"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          onChange={(value) => {
            setFormData({
              ...formData,
              content: value,
            });
          }}
          value={formData.content}
        />
        <Button
          disabled={loading}
          type="submit"
          className="bg-gradient-to-br from-purple-600 to-pink-500 text-white hover:bg-gradient-to-bl cursor-pointer w-full"
        >
          {loading ? "updating..." : "Update"}
        </Button>
      </form>
      {publishError && (
        <Alert className="mt-5" color="failure">
          {publishError}
        </Alert>
      )}
    </div>
  );
};

export default UpdatePost;
