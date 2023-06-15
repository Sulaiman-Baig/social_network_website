import React, { useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fireDB } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const { loading } = useSelector((store) => store);
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
        getDownloadURL(ref(storage, `posts/${image.name}`)).then((url) => {
          addDoc(collection(fireDB, "posts"), {
            description,
            imageURL: url,
            likes: [],
            comments: [],
            user: JSON.parse(localStorage.getItem("sulaiman")),
          })
            .then(() => {
              toast.success("Post created successfull.");
              dispatch({ type: "hideLoading" });
              navigate("/");
            })
            .catch(() => {
              dispatch({ type: "hideLoading" });
              toast.error("Something went wrong.");
            });
        });
      })
      .catch(() => {
        toast.error("Error while uploading");
      });
  };
  return (
    <DefaultLayout>
      {loading && <Loader />}
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
          className="bg-primary h-10 rounded-sm text-white px-10 mt-10"
        >
          UPLOAD
        </button>
      )}
    </DefaultLayout>
  );
};

export default AddPost;
