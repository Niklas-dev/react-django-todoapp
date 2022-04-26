import React, { useState, forwardRef, useImperativeHandle } from "react";
import { imperativeHandleTitle } from "../CreateModal";
import ErrorIcon from "./ErrorIcon";

type titleInputProps = {
  updateTitle: (title: string) => void;
};

const TitleInput = forwardRef<imperativeHandleTitle, titleInputProps>(
  ({ updateTitle }, ref) => {
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
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="relative flex flex-col"
      >
        <div className="flex flex-row justify-between items-center">
          <label htmlFor="title">Title</label>
          <div className="text-sm">{input.length} / 50</div>
        </div>

        <input
          onChange={(e) => {
            updateTitle(e.target.value);
            setInput(e.target.value);
            setError(false);
          }}
          maxLength={50}
          className={`rounded-md outline-none px-2 py-1  ${
            error && "placeholder:text-red-600 placeholder:font-medium pr-8"
          }`}
          id="title"
          placeholder={error ? "This field is required!" : ""}
          type="text"
        />
        {error && <ErrorIcon />}
      </div>
    );
  }
);

export default TitleInput;
