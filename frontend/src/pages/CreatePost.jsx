import React from "react";
import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const CreatePost = () => {
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            id="title"
            className="flex-1"
            required
          />
          <Select>
            <option value="uncategorized">Select</option>
            <option value="javascript">Javascript</option>
            <option value="reactjs">React</option>
            <option value="langchain">Langchain</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-gray-300 border-dotted p-3">
          <FileInput type="file" accept="image/*" />
          <Button type="button" color="gray" size="md" outline>
            Upload image
          </Button>
        </div>
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
        />
        <Button
          type="submit"
          className="bg-gradient-to-br from-purple-600 to-pink-500 text-white hover:bg-gradient-to-bl cursor-pointer w-full"
        >
          Publish
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
