import React, { useState, useEffect } from "react";
import { todo } from "../../App";
import TimeAtDisplay from "./TimeAtDisplay";
import autosize from "autosize";

type todoItemProps = {
  todo: todo;
  updateTodosCallback: () => void;
  markTodoCallback: (index: number) => void;
  index: number;
};
type todoInput = {
  title: string;
  content: string;
};

const TodoItem = ({
  todo,
  updateTodosCallback,
  index,
  markTodoCallback,
}: todoItemProps) => {
  const [done, setDone] = useState(todo.done);
  const [marked, setMarked] = useState(false);
  const [titleExistsError, setTitleExistsError] = useState(false);
  const [input, setInput] = useState<todoInput>({
    title: todo.title,
    content: todo.content,
  });
  const updateTodo = (onlyDone: boolean, titleUpdate: boolean) => {
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: onlyDone
        ? JSON.stringify({
            old_title: todo.title,
            title: input.title,
            old_content: todo.content,
            content: input.content,
            title_update: titleUpdate,
            done: !done,
          })
        : JSON.stringify({
            old_title: todo.title,
            title: input.title,
            old_content: todo.content,
            content: input.content,
            title_update: titleUpdate,
            done: todo.done,
          }),
    };

    console.log("HERE");
    //todo.title !== input.title || todo.done === done
    if (true) {
      fetch(
        `http://${process.env.BACKEND}:${process.env.PORT}/todos/update-todo`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if ("Success" in data) {
            setInput({
              title: input.title,
              content: input.content,
            });

            !onlyDone && updateTodosCallback();
          } else if ("Bad Request" in data) {
            if (
              data["Bad Request"] === "Title already exists" &&
              todo.title !== input.title
            ) {
              setTitleExistsError(true);

              console.log("Title Error");
            }
          } else {
            console.log("Unexpected Error");
          }
        });
    }
  };

  useEffect(() => {
    autosize(document.getElementsByClassName("textarea") as HTMLCollection);
    return () => {};
  });

  return (
    <div
      onClick={() => markTodoCallback(index)}
      className={`flex  flex-col justify-between w-80 shrink-0 h-96 py-4 px-4 bg-gray-800  rounded-lg hover:-translate-y-2 transition-all duration-200 ${
        todo.marked && "ring-purple-600 ring-4"
      }`}
    >
      <div>
        <div className="flex flex-row justify-between ">
          {true ? (
            <textarea
              onBlur={() => {
                updateTodo(false, true);
              }}
              spellCheck={false}
              onChange={(e) => {
                setTitleExistsError(false);
                setInput({
                  title: e.target.value,
                  content: input.content,
                });
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              value={titleExistsError ? "" : input.title}
              maxLength={50}
              rows={4}
              style={{ resize: "none" }}
              placeholder={
                titleExistsError ? "This title already exists. *" : ""
              }
              className={`textarea outline-none w-5/6 bg-gray-800 text-xl font-semibold text-gray-200  h-8 pb-1 ${
                titleExistsError ? "placeholder:text-[#e81c4e]" : ""
              }`}
            />
          ) : (
            <h1
              style={{ wordWrap: "break-word" }}
              className="text-xl text-gray-200 font-semibold  w-10/12 h-fit"
            >
              {input.title}
            </h1>
          )}
          <input
            style={{ accentColor: "#e81c4e" }}
            checked={done}
            onChange={() => {
              updateTodo(true, false);
              setDone(!done);
            }}
            className="h-5 w-5"
            type="checkbox"
          />
        </div>

        <div className="pt-1">
          {true ? (
            <textarea
              onBlur={() => updateTodo(false, false)}
              spellCheck={false}
              onChange={(e) =>
                setInput({
                  title: input.title,
                  content: e.target.value,
                })
              }
              onKeyPress={(e) => {
                if (e.key === "Enter") e.preventDefault();
              }}
              defaultValue={input.content}
              maxLength={200}
              rows={4}
              style={{ resize: "none" }}
              className="textarea outline-none bg-gray-800 text-gray-200 font-medium h-8 w-5/6 pb-1"
            />
          ) : (
            <p
              style={{ wordWrap: "break-word" }}
              className="text-gray-200 font-medium w-5/6 h-fit"
            >
              {input.content}
            </p>
          )}
        </div>
      </div>

      <div>
        {done && <TimeAtDisplay text="Done At:" time={todo.done_at} />}
        <TimeAtDisplay text="Created At:" time={todo.created_at} />
      </div>
    </div>
  );
};

export default TodoItem;
