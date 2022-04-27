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
};
export default function App(): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const [todos, setTodos] = useState<Array<todo>>([]);
  const [selectedMode, setSelectedMode] = useState(false);

  const getTodos = () => {
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    };
    fetch(
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
    console.log("getting data");
  };

  useEffect(() => {
    getTodos();
    return () => {};
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
      <Header
        setSelectedModeCallback={(value: boolean) => setSelectedMode(value)}
        showModalCallback={() => setShowModal(true)}
      />

      <TodoProvider value={todos}>
        <Body updateTodosCallback={() => getTodos()} />
      </TodoProvider>

      {showModal && (
        <CreateModal hideModalCallback={() => setShowModal(false)} />
      )}
      {selectedMode.toString()}
    </div>
  );
}
