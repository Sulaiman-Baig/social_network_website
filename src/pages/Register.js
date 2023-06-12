import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fireDB, app } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";

function Register() {
  const { loading } = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("loading", loading);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const register = () => {
    console.log("register was clicked");
    const auth = getAuth(app);
    dispatch({ type: "showLoading" });
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userData = {
          id: user.uid,
          email: user.email,
          profilPic: "",
          bio: "Hi, I am Sulaiman",
        };

        console.log(user);
        setDoc(doc(fireDB, "users", user.uid), userData).then((d) => {
          console.log("data after storing in firestore", d);
          toast.success("Registration Successfull");
          dispatch({ type: "hideLoading" });
          navigate("/login");
        });
      })
      .catch((error) => {
        toast.error("Something went wrong");
        dispatch({ type: "hideLoading" });
        console.log(error);
      });
  };
  useEffect(() => {
    if (localStorage.getItem("sulaiman")) {
      navigate("/");
    }
  });

  return (
    <div className="h-screen justify-between  flex flex-col overflow-x-hidden bg-primary">
      {loading && <Loader />}
      {/* top corner */}
      <div className="flex justify-start">
        <div className=" h-40  w-96 -skew-x-[25deg] -ml-10 flex items-center justify-center bg-white">
          <h1 className="text-center text-4xl font-semibold text-primary skew-x-[25deg]">
            EZ-Car
          </h1>
        </div>
      </div>
      {/* form */}
      <div className="flex justify-center">
        <div className="w-96 flex flex-col space-y-5 card p-7">
          <h1 className="text-4xl text-gray-400 font-semibold">Get---In</h1>
          <hr className="w-full h-px mx-auto my-4 bg-gray-600 border-0 rounded md:my-10 dark:bg-gray-700" />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            type="text"
            className="text-gray-400 focus:outline outline-1 border border-gray-600 h-10 rounded-md focus:ring-red-700 pl-5 bg-transparent"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            type="password"
            className="text-gray-400 focus:outline outline-1 border border-gray-600 h-10 rounded-md focus:ring-red-700 pl-5 bg-transparent"
          />
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="confirm password"
            type="password"
            className="text-gray-400 focus:outline outline-1 border border-gray-600 h-10 rounded-md focus:ring-red-700 pl-5 bg-transparent"
          />
          <div className="flex justify-end">
            <button
              onClick={register}
              className="bg-white   text-primary h-10 rounded-sm px-10 "
            >
              Register
            </button>
          </div>
          <hr className="w-full h-px mx-auto my-4 bg-gray-600 border-0 rounded md:my-10 dark:bg-gray-700" />
          <Link
            to="/login"
            className="text-[14px] flex justify-center text-gray-400"
          >
            ALREADY REGISTERED ? CLICK HERE TO LOGIN{" "}
          </Link>
        </div>
      </div>
      {/* bottom corner */}
      <div className="flex justify-end">
        <div className=" h-40  w-96 skew-x-[25deg] -mr-10 flex items-center justify-center bg-white">
          <h1 className="text-center text-4xl font-semibold  -skew-x-[25deg] text-primary">
            EZ-Car
          </h1>
        </div>
      </div>
    </div>
  );
}
export default Register;
