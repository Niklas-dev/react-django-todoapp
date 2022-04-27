import React, { useContext } from "react";
import TodoContext from "../../shared/providers/TodosProvider";
import { todo } from "../App";
import TodoItem from "./components/TodoItem";

type bodyProps = {
  updateTodosCallback: () => void;
};

const Body = ({ updateTodosCallback }: bodyProps) => {
  const todosContext: Array<todo> = useContext(TodoContext);

  return (
    <div className=" text-black mt-32 h-full w-full">
      <div className="">
        <h1 className="pl-4 text-2xl font-medium">Todos</h1>
        <div className="flex items-center gap-4 pt-4 pl-4 pr-4 overflow-x-scroll pb-2">
          {todosContext.map((todo, index) => (
            <TodoItem
              key={index}
              index={index}
              updateTodosCallback={() => updateTodosCallback()}
              todo={todo}
            />
          ))}
        </div>
      </div>
      <div className="">
        <h1 className="pl-4 text-2xl font-medium">Todos</h1>
        <div className="flex items-center gap-4 pt-4 pl-4 pr-4 overflow-x-scroll pb-2">
          <div className="w-80 shrink-0 h-56 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default Body;
