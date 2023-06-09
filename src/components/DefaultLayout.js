import React from "react";
import Header from "../components/Header";

const DefaultLayout = (props) => {
  return (
    <div>
      <Header />
      <div className="content">{props.children}</div>
    </div>
  );
};

export default DefaultLayout;
 