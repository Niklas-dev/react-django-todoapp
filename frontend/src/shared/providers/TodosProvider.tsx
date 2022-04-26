import { createContext } from "react";
import { todo } from "../../components/App";
const TodoContext = createContext<Array<todo>>([]);
export const TodoProvider = TodoContext.Provider;
export default TodoContext;
