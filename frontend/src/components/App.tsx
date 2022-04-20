import React, { useEffect, useState } from "react";
import "../styles/index.css";
import Body from "./Body/Body";
import CreateModal from "./CreateModal/CreateModal";
import Header from "./Header/Header";

export default function App(): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="flex flex-col w-full h-full">
      <Header showModalCallback={() => setShowModal(true)} />
      <Body />
      {showModal && (
        <CreateModal hideModalCallback={() => setShowModal(false)} />
      )}
    </div>
  );
}
