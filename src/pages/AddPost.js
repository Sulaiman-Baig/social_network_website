import React, { useState } from "react";
import DefaultLayout from "../components/DefaultLayout";

const AddPost = () => {
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const onImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  return (
    <DefaultLayout>
      <h1 className="text-3xl text-gray-600">Add New Post</h1>
      <div className="flex flex-col">
        <textarea
          className="w-1/2 md:w-full border-2 border-dashed border-gray-500 my-5 mx-0 p-5"
          rows="3"
        ></textarea>
        <input type="file" onChange={(e) => onImageChange(e)}></input>
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Image crupted"
            className="mt-5 h-52 w-52 rounded"
          ></img>
        )}
      </div>
    </DefaultLayout>
  );
};

export default AddPost;
