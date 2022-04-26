import React from "react";

type iconButtonProps = {
  action: () => void;
  children: JSX.Element;
};

const IconButton = ({ action, children }: iconButtonProps) => {
  return (
    <button
      onClick={() => action()}
      className="rounded-lg hover:ring-2 ring-gray-800 transition duration-200 h-8 w-8 bg-gradient-to-b from-gray-800 to-gray-900 flex justify-center items-center"
    >
      {children}
    </button>
  );
};

export default IconButton;
