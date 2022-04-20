import React from "react";
type descriptionInputProps = {
  updateDescription: (description: string) => void;
};
const DescriptionInput = ({ updateDescription }: descriptionInputProps) => {
  return (
    <>
      <label htmlFor="description">Description</label>
      <textarea
        onChange={(e) => updateDescription(e.target.value)}
        className="rounded-md outline-none px-2 py-1 h-32"
        id="description"
        maxLength={255}
        style={{ resize: "none" }}
      />
    </>
  );
};

export default DescriptionInput;
