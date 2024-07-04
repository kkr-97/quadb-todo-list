import { useSelector } from "react-redux";
import TaksItem from "../TaskItem";
import "./index.css";

export default function TakList() {
  const tasks = useSelector((state) => state.tasks);
  return (
    <ul className="tasks-list">
      {tasks.map((task) => (
        <TaksItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
