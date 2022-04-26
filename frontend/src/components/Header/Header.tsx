import React from "react";
import HeaderActionButton from "./components/HeaderActionButton";
import IconButton from "./components/IconButton";
type headerProps = {
  showModalCallback: () => void;
};
const Header = ({ showModalCallback }: headerProps) => {
  const createTodo = () => {
    console.log("test");
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",

      body: JSON.stringify({
        title: "Todo #2",
        content: "Content",
      }),
    };
    fetch(
      `http://${process.env.BACKEND}:${process.env.PORT}/todos/create-todo`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  return (
    <div className="fixed w-full h-fit ">
      <div className=" h-12 bg-gray-800 rounded-b-xl flex items-center px-2 text-2xl font-bold text-white">
        TodoApp
      </div>
      <div className=" w-full flex justify-center">
        <div className=" h-10 w-full rounded-t-3xl px-4 flex justify-center items-center gap-5">
          <IconButton action={() => {}}>
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
          <div className="h-11 w-72 bg-gradient-to-b from-gray-800  pt-1    to-gray-900 rounded-b-xl flex justify-center gap-4">
            <HeaderActionButton
              text="Create Todo"
              action={() => showModalCallback()}
            />
            <HeaderActionButton text="Select Todo`s" action={() => {}} />
          </div>
          <IconButton action={() => {}}>
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
