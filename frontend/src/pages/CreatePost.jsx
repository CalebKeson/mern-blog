import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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
      const res = await fetch("/api/post/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        setPublishError(data.message);
        setLoading(false);
        return;
      } else {
        setPublishError(null);
        setLoading(false);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong!", error.message);
      setLoading(false);
    }
  };
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
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
          <Select onChange={handleChange} id="category" required>
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
        {imageFileUrl && (
          <img
            src={imageFileUrl}
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
        />
        <Button
          disabled={loading}
          type="submit"
          className="bg-gradient-to-br from-purple-600 to-pink-500 text-white hover:bg-gradient-to-bl cursor-pointer w-full"
        >
          {loading ? "publishing..." : "Publish"}
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

export default CreatePost;
