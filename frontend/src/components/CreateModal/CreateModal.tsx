import React, { useEffect, useRef, useState } from "react";
import useClickedOutside from "../../shared/hooks/useClickedOutside";
import ModalActionButton from "./components/ModalActionButton";
import TitleInput from "./components/TitleInput";
import DescriptionInput from "./components/DescriptionInput";
type createModelProps = {
  hideModalCallback: () => void;
  getTodos: () => {};
};

type inputType = {
  title: string;
  description: string;
};

export type imperativeHandleTitle = {
  checkInput: () => void;
};
export type imperativeHandleDescription = {
  checkInput: () => void;
};

const CreateModal = ({ hideModalCallback, getTodos }: createModelProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const titleInputRef = useRef<imperativeHandleTitle>();
  const descriptionInputRef = useRef<imperativeHandleDescription>(null);
  const [input, setInput] = useState<inputType>({ title: "", description: "" });
  useClickedOutside({
    modalRef,
    action: () => hideModalCallback(),
  });

  useEffect(() => {
    //document.body.style.overflow = "hidden";

    return () => {
      //document.body.style.overflow = "unset";
    };
  }, []);

  const createTodo = async () => {
    if (input.description === "" || input.title === "") {
      titleInputRef.current?.checkInput();
      descriptionInputRef.current?.checkInput();
    } else {
      const requestOptions = {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",

        body: JSON.stringify({
          title: input.title,
          content: input.description,
        }),
      };
      await fetch(
        `http://${process.env.BACKEND}:${process.env.PORT}/todos/create-todo`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => console.log(data));
      getTodos();

      hideModalCallback();
    }
  };

  return (
    <div className="h-full w-full flex justify-center items-center fixed bg-black bg-opacity-30">
      <div
        ref={modalRef}
        className="bg-gray-200 w-[30rem] h-[22rem] shadow-2xl rounded-lg py-2 px-4"
      >
        <h1 className="text-center text-lg font-semibold">Create Todo</h1>

        <div className="flex flex-col">
          <div className="flex flex-col pt-6">
            <TitleInput
              ref={titleInputRef as React.RefObject<imperativeHandleTitle>}
              updateTitle={(title: string) =>
                setInput({ title, description: input.description })
              }
            />
          </div>
          <div className="flex flex-col pt-4">
            <DescriptionInput
              ref={
                descriptionInputRef as React.RefObject<imperativeHandleTitle>
              }
              updateDescription={(description: string) =>
                setInput({ description, title: input.title })
              }
            />
          </div>
          <div className="pt-4 flex flex-row gap-2">
            <ModalActionButton
              isCreate={true}
              create={() => createTodo()}
              cancel={() => hideModalCallback()}
            />
            <ModalActionButton
              isCreate={false}
              create={() => createTodo()}
              cancel={() => hideModalCallback()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
