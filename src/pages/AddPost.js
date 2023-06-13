import React, { useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const AddPost = () => {
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const onImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const addPost = () => {
    dispatch({ type: "showLoading" });
    const storage = getStorage();
    const storageRef = ref(storage, `posts/${image.name}`);
    uploadBytes(storageRef, image)
      .then((snapshot) => {
        console.log("Uploaded a blob or file!");
        dispatch({ type: "hideLoading" });
        toast.success("Image Uploaded");
      })
      .catch(() => {
        toast.error("Error while uploading");
      });
  };
  return (
    <DefaultLayout>
      <h1 className="text-3xl text-gray-600">Add New Post</h1>
      <div className="flex flex-col">
        <textarea
          className="w-1/2 md:w-full border-2 border-dashed border-gray-500 my-5 mx-0 p-5"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
      {description && image && (
        <button
          onClick={addPost}
          className="bg-primary h-10 rounded-sm text-white px-10"
        >
          UPLOAD
        </button>
      )}
    </DefaultLayout>
  );
};

export default AddPost;
