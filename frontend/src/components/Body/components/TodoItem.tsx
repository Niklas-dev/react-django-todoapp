import React, { useState, useEffect } from "react";
import { todo } from "../../App";
import TimeAtDisplay from "./TimeAtDisplay";
import autosize from "autosize";

type todoItemProps = {
  todo: todo;
  updateTodosCallback: () => void;
};

const TodoItem = ({ todo, updateTodosCallback }: todoItemProps) => {
  const [done, setDone] = useState(todo.done);
  const updateTodo = () => {
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        old_title: todo.title,
        title: todo.title,
        content: todo.content,
        done: !done,
      }),
    };
    fetch(
      `http://${process.env.BACKEND}:${process.env.PORT}/todos/update-todo`,
      requestOptions
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          return null;
        }
      })
      .then((data) => {
        console.log("test");
        if ("Success" in data) {
          setDone(!done);
          updateTodosCallback();
        }
      });
  };

  useEffect(() => {
    autosize(document.getElementsByClassName("textarea") as HTMLCollection);
    return () => {};
  });

  return (
    <div className="flex flex-col justify-between w-80 shrink-0 h-96 py-4 px-4 bg-gray-800 rounded-lg hover:-translate-y-2 transition-all duration-200">
      <div>
        <div className="flex flex-row justify-between pr-1">
          {true ? (
            <textarea
              onKeyPress={(e) => {
                if (e.key === "Enter") e.preventDefault();
              }}
              defaultValue={todo.title}
              maxLength={50}
              rows={4}
              style={{ resize: "none" }}
              className="textarea outline-none bg-gray-400 text-xl text-gray-200 font-semibold h-8 pb-1"
            />
          ) : (
            <h1
              style={{ wordWrap: "break-word" }}
              className="text-xl text-gray-200 font-semibold  w-10/12 h-fit"
            >
              {todo.title}
            </h1>
          )}
          <input
            checked={done}
            onChange={() => updateTodo()}
            className="h-5 w-5"
            type="checkbox"
          />
        </div>
        <div className="pt-1">
          <p
            style={{ wordWrap: "break-word" }}
            className="text-gray-200 font-medium w-5/6 h-fit"
          >
            {todo.content}
          </p>
        </div>
      </div>
      <div>
        {todo.done && <TimeAtDisplay text="Done At:" time={todo.done_at} />}
        <TimeAtDisplay text="Created At:" time={todo.created_at} />
      </div>
    </div>
  );
};

export default TodoItem;
