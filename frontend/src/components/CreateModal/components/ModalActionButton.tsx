import React from "react";

type modalActionButtonProps = {
  isCreate: boolean;
  create: () => void;
  cancel: () => void;
};
const ModalActionButton = ({
  isCreate,
  create,
  cancel,
}: modalActionButtonProps) => {
  return (
    <>
      {isCreate ? (
        <button
          onClick={() => create()}
          className="bg-[#29138a] text-white text-lg font-medium py-1 px-2 rounded-md transition-all duration-200 hover:ring-2 ring-[#29138a] ring-0 "
        >
          Create
        </button>
      ) : (
        <button
          onClick={() => cancel()}
          className="text-gray-500 text-lg font-medium py-1 px-2 "
        >
          Cancel
        </button>
      )}
    </>
  );
};

export default ModalActionButton;
