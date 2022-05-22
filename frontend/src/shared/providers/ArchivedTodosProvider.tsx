import { createContext } from "react";
import { todo } from "../../components/App";
const ArchivedTodoContext = createContext<Array<todo>>([]);
export const ArchivedTodoProvider = ArchivedTodoContext.Provider;
export default ArchivedTodoContext;
