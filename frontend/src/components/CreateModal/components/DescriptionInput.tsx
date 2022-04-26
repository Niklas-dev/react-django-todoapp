import React, { useState, forwardRef, useImperativeHandle } from "react";
import { imperativeHandleDescription } from "../CreateModal";
import ErrorIcon from "./ErrorIcon";
type descriptionInputProps = {
  updateDescription: (description: string) => void;
};

const DescriptionInput = forwardRef<
  imperativeHandleDescription,
  descriptionInputProps
>(({ updateDescription }, ref) => {
  const [error, setError] = useState(false);
  const [input, setInput] = useState("");

  useImperativeHandle(ref, () => ({
    checkInput() {
      if (input === "") {
        setError(true);
      } else {
        setError(false);
      }
    },
  }));
  return (
    <div className="relative flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <label htmlFor="title">Description</label>
        <div className="text-sm">{input.length} / 200</div>
      </div>
      <textarea
        onChange={(e) => {
          updateDescription(e.target.value);
          setInput(e.target.value);
          setError(false);
        }}
        className={`rounded-md outline-none px-2 py-1 h-32 ${
          error && "placeholder:text-red-600 placeholder:font-medium pr-8"
        }`}
        placeholder={error ? "This field is required!" : ""}
        id="description"
        maxLength={200}
        style={{ resize: "none" }}
      />
      {error && <ErrorIcon />}
    </div>
  );
});
export default DescriptionInput;
