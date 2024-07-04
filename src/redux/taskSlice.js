import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    // Reducer to set the initial state with tasks
    setInitialState: (state, action) => {
      return action.payload; // Replace the current state with the payload
    },
    // Reducer to add a new task
    addTask: (state, action) => {
      return [action.payload, ...state];
    },
    // Reducer to delete a task by its ID
    deleteTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    },
    // Reducer to update the task input of an existing task
    updateTask: (state, action) => {
      const index = state.findIndex((task) => task.id === action.payload.id);
      state[index] = { ...state[index], taskInp: action.payload.taskInp };
    },
    // Reducer to toggle the completed status of a task
    toggleCompleted: (state, action) => {
      const index = state.findIndex((task) => task.id === action.payload);
      const curStatus = state[index].completed;
      state[index] = { ...state[index], completed: !curStatus };
    },
  },
});

export const {
  addTask,
  deleteTask,
  updateTask,
  toggleCompleted,
  setInitialState,
} = taskSlice.actions;

// Export the reducer to be used in the store
export default taskSlice.reducer;
