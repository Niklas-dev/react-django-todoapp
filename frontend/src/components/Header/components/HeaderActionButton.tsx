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
      <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#29138a] to-[#7729b6] ">
        {text}
      </p>
    </button>
  );
};

export default HeaderActionButton;
