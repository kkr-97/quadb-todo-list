import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask, toggleCompleted } from "../../redux/taskSlice";
import {
  MdOutlineModeEdit,
  MdDeleteForever,
  MdOutlineCircle,
} from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import "./index.css";

export default function TaskItem({ task }) {
  // State to manage the input value for the task being edited
  const [editTaskInput, setEditTaskInput] = useState(task.taskInp);

  // State to toggle between edit mode and view mode
  const [isEditable, setIsEdittable] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  const handleEdit = () => {
    dispatch(updateTask({ id: task.id, taskInp: editTaskInput }));
    setIsEdittable(!isEditable);
  };

  const toggleTaskCompletion = () => {
    dispatch(toggleCompleted(task.id));
  };

  return (
    <li className="task-item">
      {/* If in edit mode, show an input field to edit the task */}
      {isEditable ? (
        <input
          type="text"
          onChange={(e) => setEditTaskInput(e.target.value)}
          value={editTaskInput}
          className="task-input"
        />
      ) : (
        <>
          {/* Display different icons based on the task completion status */}
          {task.completed ? (
            <IoMdCheckmarkCircleOutline
              className="check-btn checked"
              onClick={toggleTaskCompletion}
            />
          ) : (
            <MdOutlineCircle
              className="check-btn"
              onClick={toggleTaskCompletion}
            />
          )}
          <p className={`task-text ${task.completed ? "completed" : ""}`}>
            {task.taskInp}
          </p>
        </>
      )}
      {/* Conditionally render the Edit button or Save button based on edit mode */}
      {!isEditable ? (
        !task.completed && (
          <button onClick={handleEdit} className="task-button">
            <MdOutlineModeEdit />
          </button>
        )
      ) : (
        <button onClick={handleEdit} className="task-button save-btn">
          Save
        </button>
      )}
      {/* Delete button to remove the task */}
      <button
        onClick={() => handleDelete(task.id)}
        className="btn delete-button"
      >
        <MdDeleteForever />
      </button>
    </li>
  );
}
