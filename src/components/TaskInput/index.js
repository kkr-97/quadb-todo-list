import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../redux/taskSlice";
import { v4 as uuidv4 } from "uuid";
import { MdAddCircle } from "react-icons/md";
import "./index.css";

export default function TaskInput() {
  const [taskInput, setTaskInput] = useState("");
  const dispatch = useDispatch();

  const onAddTask = () => {
    // If the input is empty, do not add the task
    if (taskInput.trim() === "") return;

    // Dispatch the addTask action with a new task object
    dispatch(addTask({ id: uuidv4(), taskInp: taskInput, completed: false }));
    setTaskInput("");
  };

  return (
    <div className="task-input-container">
      <input
        type="text"
        placeholder="Add a task..."
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        className="task-input-element"
      />
      <MdAddCircle onClick={onAddTask} className="add-task-btn" />
    </div>
  );
}
