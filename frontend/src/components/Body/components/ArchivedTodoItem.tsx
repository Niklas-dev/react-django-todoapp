import React from "react";
import { todo } from "../../App";
import TimeAtDisplay from "./TimeAtDisplay";
type archivedTodoItemProps = {
  todo: todo;
  index: number;
};
function ArchivedTodoItem({ todo, index }: archivedTodoItemProps) {
  return (
    <div
      className={`flex  flex-col justify-between w-72 shrink-0 h-80 py-4 px-2 bg-gray-800  rounded-lg hover:-translate-y-2 transition-all duration-200  ring-4 ${
        todo.done ? "ring-green-500" : "ring-red-500"
      }`}
    >
      <div>
        <h1
          style={{ wordWrap: "break-word" }}
          className="text-xl text-gray-200 font-semibold  w-11/12 h-fit"
        >
          {todo.title}
        </h1>
        <p
          style={{ wordWrap: "break-word" }}
          className="text-gray-200 font-medium w-5/6 h-fit"
        >
          {todo.content}
        </p>
      </div>
      <div>
        {todo.done && <TimeAtDisplay text="Done At:" time={todo.done_at} />}
        <TimeAtDisplay text="Archived At:" time={todo.archived_at!} />
      </div>
    </div>
  );
}

export default ArchivedTodoItem;
