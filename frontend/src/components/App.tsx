import React, { useEffect, useState } from "react";
import "../styles/index.css";
import Body from "./Body/Body";
import CreateModal from "./CreateModal/CreateModal";
import Header from "./Header/Header";
import { TodoProvider } from "../shared/providers/TodosProvider";

export type todo = {
  title: string;
  content: string;
  done: boolean;
  created_at: string;
  done_at: string;
  marked?: boolean;
};

export default function App(): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const [todos, setTodos] = useState<Array<todo>>([]);
  const [selectedMode, setSelectedMode] = useState(false);

  const getTodos = async () => {
    setTodos([]);
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    };
    await fetch(
      `http://${process.env.BACKEND}:${process.env.PORT}/todos/get-todos`,
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
        if (data !== null) {
          setTodos(data["Todos"]);
        }
      });
  };

  const markTodo = (index: number) => {
    if (selectedMode) {
      let todosCopy: Array<todo> = todos;

      todosCopy[index].marked =
        todosCopy[index].marked === undefined ? true : !todosCopy[index].marked;

      setTodos([...todosCopy]);
    }
  };

  const archiveMarkedTodos = async () => {
    let todosCopy = todos;
    let archiveToTodos: Array<todo> = [];

    for (let todo in todosCopy) {
      if (todosCopy[todo].marked === true) {
        archiveToTodos.push(todosCopy[todo]);
      }
    }

    for (let dTodo in archiveToTodos) {
      await archiveTodo(archiveToTodos[dTodo].title);
    }

    await getTodos();
  };

  const deleteMarkedTodos = async () => {
    let todosCopy = todos;
    let deleteToTodos: Array<todo> = [];

    for (let todo in todosCopy) {
      if (todosCopy[todo].marked === true) {
        deleteToTodos.push(todosCopy[todo]);
      }
    }

    for (let dTodo in deleteToTodos) {
      await deleteTodo(deleteToTodos[dTodo].title);
    }

    await getTodos();
  };

  const archiveTodo = async (title: string) => {
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        title,
      }),
    };
    await fetch(
      `http://${process.env.BACKEND}:${process.env.PORT}/todos/archive-todo`,
      requestOptions
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          return null;
        }
      })
      .then((data) => console.log(data));
  };

  const deleteTodo = async (title: string) => {
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify({
        title,
      }),
    };
    await fetch(
      `http://${process.env.BACKEND}:${process.env.PORT}/todos/delete-todo`,
      requestOptions
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          return null;
        }
      })
      .then((data) => console.log(data));
  };

  useEffect(() => {
    getTodos();
    return () => {};
  }, []);

  useEffect(() => {
    if (!selectedMode) {
      let todosCopy = todos;
      for (let todo in todosCopy) {
        todosCopy[todo].marked = false;
      }
      setTodos([...todosCopy]);
    }
    return () => {};
  }, [selectedMode]);

  return (
    <div className="flex flex-col w-full h-full">
      <Header
        archiveMarkedTodos={() => archiveMarkedTodos()}
        deleteMarkedTodos={() => deleteMarkedTodos()}
        setSelectedModeCallback={(value: boolean) => setSelectedMode(value)}
        showModalCallback={() => setShowModal(true)}
      />

      <TodoProvider value={todos}>
        <Body
          markTodoCallback={(index: number) => markTodo(index)}
          updateTodosCallback={() => {
            getTodos();
          }}
        />
      </TodoProvider>

      {showModal && (
        <CreateModal
          getTodos={() => getTodos()}
          hideModalCallback={() => setShowModal(false)}
        />
      )}
      {selectedMode.toString()}
    </div>
  );
}
