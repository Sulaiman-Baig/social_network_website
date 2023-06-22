import React, { useEffect } from  "react";

import DefaultLayout from "../components/DefaultLayout";

import { useState } from "react";

import { fireDB } from "../firebaseConfig";

import { collection, getDocs } from "firebase/firestore";


import { useDispatch } from "react-redux";
function Home() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch()

  const getData = async () => {
    const querySnapshot = await getDocs(collection(fireDB, "posts"));
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      let temp = [];
      temp.push({
        ...doc.data(),
        id: doc.id,
      });
      setData(temp);
      console.log(temp);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <DefaultLayout>
      <div>Home</div>
    </DefaultLayout>
  );
}

export default Home;
