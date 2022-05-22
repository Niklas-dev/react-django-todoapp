import React, { useContext } from "react";
import ArchivedTodoContext from "../../shared/providers/ArchivedTodosProvider";
import TodoContext from "../../shared/providers/TodosProvider";
import { todo } from "../App";
import ArchivedTodoItem from "./components/ArchivedTodoItem";
import TodoItem from "./components/TodoItem";

type bodyProps = {
  updateTodosCallback: () => void;
  markTodoCallback: (index: number) => void;
  deleteArchivedTodosCallback: () => {};
};

const Body = ({
  updateTodosCallback,
  markTodoCallback,
  deleteArchivedTodosCallback,
}: bodyProps) => {
  const todosContext: Array<todo> = useContext(TodoContext);
  const archivedTodosContext: Array<todo> = useContext(ArchivedTodoContext);

  const isTodos = todosContext.length > 0;
  const isArchivedTodos = archivedTodosContext.length > 0;

  return (
    <div className=" text-black mt-32 h-full w-full">
      <div className="">
        <h1 className="pl-4 text-2xl font-medium">Todos</h1>
        <div
          className={`flex items-center gap-4 pt-4 pl-4 pr-4  pb-2 ${
            isTodos && "overflow-x-scroll"
          }`}
        >
          {isTodos ? (
            <>
              {todosContext.map((todo, index) => {
                console.log(todosContext);
                return (
                  <TodoItem
                    key={index}
                    index={index}
                    markTodoCallback={(index: number) =>
                      markTodoCallback(index)
                    }
                    updateTodosCallback={() => updateTodosCallback()}
                    todo={todo}
                  />
                );
              })}
            </>
          ) : (
            <div className="text-lg text-gray-600">
              Create a Todo to see it here
            </div>
          )}
        </div>
      </div>

      <div className="pt-4">
        <div className="flex flex-row items-center gap-2">
          <h1 className="pl-4 text-2xl font-medium">Archived Todos</h1>
          {isArchivedTodos && (
            <button
              onClick={() => deleteArchivedTodosCallback()}
              className="border-2 border-gray-800 rounded-lg px-2 py-[0.15rem] shadow-md transition duration-200 hover:ring-1 ring-0 ring-gray-700"
            >
              Clear All
            </button>
          )}
        </div>
        <div
          className={`flex items-center gap-4 pt-4 pl-4 pr-4 pb-2 ${
            isArchivedTodos && "overflow-x-scroll"
          }`}
        >
          {isArchivedTodos ? (
            <>
              {archivedTodosContext.map((todo, index) => {
                console.log(archivedTodosContext);
                return (
                  <ArchivedTodoItem key={index} index={index} todo={todo} />
                );
              })}
            </>
          ) : (
            <div className="text-lg text-gray-600">
              Archive a Todo from the list above
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Body;
