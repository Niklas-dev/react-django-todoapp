import React from "react";
import "../styles/index.css";
import Body from "./Body/Body";
import Header from "./Header/Header";

export default function App(): JSX.Element {
  return (
    <div className="flex flex-col">
      <Header />
      <Body />
    </div>
  );
}
