import React from "react";

type props = {
  action: () => void;
  text: string;
};

const HeaderActionButton = ({ action, text }: props) => {
  return (
    <button
      onClick={() => action()}
      className="bg-white outline-none h-8 px-2 rounded-md hover:ring-2 ring-white transition duration-200"
    >
      <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-br from-gray-800 to-gray-900 ">
        {text}
      </p>
    </button>
  );
};

export default HeaderActionButton;
