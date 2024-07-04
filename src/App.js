import { useEffect } from "react";
import { useDispatch } from "react-redux";
import store from "./redux/store";
import { setInitialState } from "./redux/taskSlice";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import "./App.css";

// Default tasks to initialize the app with
const defaultTasks = [
  {
    id: "6e81b133-149d-44c8-a430-356902b2a278",
    taskInp: "CSS",
    completed: false,
  },
  {
    id: "5c10a591-8873-4557-abe4-7dc41ed974bb",
    taskInp: "HTML",
    completed: false,
  },
  {
    id: "5baa5d9d-cc55-46f4-bc9f-26d750d10285",
    taskInp: "Express",
    completed: true,
  },
  {
    id: "5e46ae9f-9b86-41f2-9c89-1779227f9ab3",
    taskInp: "Node",
    completed: true,
  },
  {
    id: "4b80a094-6155-4642-82c7-7b867acfb05c",
    taskInp: "React",
    completed: false,
  },
];

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Retrieve saved tasks from local storage or use default tasks if none are saved
    const savedTasks =
      JSON.parse(localStorage.getItem("saved-tasks")) || defaultTasks;
    dispatch(setInitialState(savedTasks));

    // Subscribe to store updates to save tasks to local storage whenever the state changes
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      localStorage.setItem("saved-tasks", JSON.stringify(state.tasks));
    });

    // Unsubscribe from the store when the component unmounts to prevent memory leaks
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <div className="App">
      <h1 className="main-heading">To-Do List</h1>
      <TaskInput />
      <hr className="hr-line" />
      <TaskList />
    </div>
  );
};

export default App;
