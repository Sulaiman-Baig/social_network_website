import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fireDB, app } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const { loading } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("loading", loading);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    const auth = getAuth(app);
    dispatch({ type: "showLoading" });
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        getDoc(doc(fireDB, "users", user.uid)).then((userDate) => {
          console.log("userDate ", userDate.data());
          localStorage.setItem(
            "sulaiman",
            JSON.stringify({ ...userDate.data(), id: user.id })
          );
          toast.success("Login Successfull");
          dispatch({ type: "hideLoading" });
          navigate("/");
        });
      })
      .catch((error) => {
        toast.error("Login Failed");
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
    <div className="h-screen justify-between  flex flex-col overflow-x-hidden">
      {loading && <Loader />}
      {/* top corner */}
      <div className="flex justify-start">
        <div className=" h-40 bg-primary w-96 -skew-x-[25deg] -ml-10 flex items-center justify-center">
          <h1 className="text-center text-4xl font-semibold text-white skew-x-[25deg]">
            EZ-Car
          </h1>
        </div>
      </div>
      {/* form */}
      <div className="flex justify-center">
        <div className="w-96 flex flex-col space-y-5 card p-7">
          <h1 className="text-4xl text-primary font-semibold">Get---In</h1>
          <hr className="w-full h-px mx-auto my-4 bg-black border-0 rounded md:my-10 dark:bg-gray-700" />
          <input
            placeholder="email"
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="focus:outline outline-1 border border-gray-300 h-10 rounded-md focus:ring-red-700 pl-5"
          />
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="focus:outline outline-1 border border-gray-300 h-10 rounded-md focus:ring-red-700 pl-5"
          />
          <div className="flex justify-end">
            <button
              className="bg-primary  text-white h-10 rounded-sm px-10 "
              onClick={login}
            >
              LOGIN
            </button>
          </div>
          <hr className="w-full h-px mx-auto my-4 bg-black border-0 rounded md:my-10 dark:bg-gray-700" />
          <Link to="/register" className="text-[14px] flex justify-center">
            NOT YET REGISTERED ? CLICK HERE TO REGISTER{" "}
          </Link>
        </div>
      </div>
      {/* bottom corner */}
      <div className="flex justify-end">
        <div className=" h-40 bg-primary w-96 skew-x-[25deg] -mr-10 flex items-center justify-center">
          <h1 className="text-center text-4xl font-semibold text-white -skew-x-[25deg]">
            EZ-Car
          </h1>
        </div>
      </div>
    </div>
  );
}
export default Login;
