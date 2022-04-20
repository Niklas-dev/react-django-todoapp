import React from "react";

type titleInputProps = {
  updateTitle: (title: string) => void;
};
const TitleInput = ({ updateTitle }: titleInputProps) => {
  return (
    <>
      <label htmlFor="title">Title</label>
      <input
        onChange={(e) => updateTitle(e.target.value)}
        maxLength={150}
        className="rounded-md outline-none px-2 py-1"
        id="title"
        type="text"
      />
    </>
  );
};

export default TitleInput;
