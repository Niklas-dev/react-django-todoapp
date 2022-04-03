import React from "react";
import "../styles/index.css";

export default function App(): JSX.Element {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-1 bg-gradient-to-br from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] rounded-lg">
        <div className="bg-gray-50 rounded-lg shadow-lg p-6 flex flex-col justify-center items-center">
          <h1 className="text-xl">React App</h1>
          <h3 className="text-base">
            A React, Typescript, Tailwind and Webpack Template
          </h3>
          <a
            href="https://github.com/Niklas-dev"
            className="flex justify-center text-gray-500 text-[0.75rem] hover:text-gray-400 transition duration-200 w-fit"
          >
            by Niklas-dev
          </a>
        </div>
      </div>
    </div>
  );
}
