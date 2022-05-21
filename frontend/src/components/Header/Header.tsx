import React, { useState } from "react";
import HeaderActionButton from "./components/HeaderActionButton";
import IconButton from "./components/IconButton";
type headerProps = {
  archiveMarkedTodos: () => void;
  deleteMarkedTodos: () => void;
  showModalCallback: () => void;
  setSelectedModeCallback: (value: boolean) => void;
};
const Header = ({
  showModalCallback,
  setSelectedModeCallback,
  archiveMarkedTodos,
  deleteMarkedTodos,
}: headerProps) => {
  const [selectMode, setSelectMode] = useState(false);

  return (
    <div className="fixed w-full h-fit z-20 border-white">
      <div className=" h-12  flex flex-row justify-between text-[#e81c4e] border-b-2  bg-gray-800 rounded-b-xl items-center px-4 text-2xl font-bold ">
        <h1>TodoApp</h1>
        <button
          onClick={() => window.location.reload()}
          className=" font-medium text-lg hover:text-white transition duration-300"
        >
          Refresh
        </button>
      </div>
      <div className=" w-full flex justify-center">
        <div className=" h-10 w-full  rounded-t-3xl px-4 flex justify-center items-center gap-5">
          <IconButton action={() => archiveMarkedTodos()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </IconButton>
          <div className="h-11 border-b-2 border-r-2 border-l-2 px-2 w-72 bg-gradient-to-b from-gray-800  pt-1    to-gray-900 rounded-b-xl flex justify-center gap-4">
            <HeaderActionButton
              text="Create Todo"
              action={() => showModalCallback()}
            />
            <HeaderActionButton
              text={selectMode ? "Cancel" : "Select Todos"}
              action={() => {
                setSelectedModeCallback(!selectMode);
                setSelectMode(!selectMode);
              }}
            />
          </div>
          <IconButton
            action={() => {
              deleteMarkedTodos();

              setSelectedModeCallback(false);
              setSelectMode(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </IconButton>
        </div>
      </div>
    </div>
  );
};
export default Header;
