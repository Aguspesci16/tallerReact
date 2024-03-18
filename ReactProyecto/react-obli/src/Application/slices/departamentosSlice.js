import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  departamentos: [],
};

export const departamentosSlice = createSlice({
  name: "depa",
  initialState,
  reducers: {
    onInitialLoadDep: (state, action) => {
      state.departamentos = action.payload; // [{}, {}]
    },
    // onDeleteToDo: (state, action) => {
    //   const { payload } = action; // payload contine el id del toDo a eliminar
    //   const newTodoList = state.todoList.filter((todo) => todo.id !== payload);
    //   state.todoList = newTodoList;
    // },
    // onAddToDo: (state, action) => {
    //   const { payload } = action;
    //   state.todoList = [...state.todoList, payload];
    // },
  },
});

export const { onInitialLoadDep } = departamentosSlice.actions;
export default departamentosSlice.reducer;
