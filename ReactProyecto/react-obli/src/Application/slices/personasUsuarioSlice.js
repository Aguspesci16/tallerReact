import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listaPersonasUsu: [],
};

export const personasUsuarioSlice = createSlice({
  name: "perUsu",
  initialState,
  reducers: {
    onInitialLoadPerUsu: (state, action) => {
      state.listaPersonasUsu = action.payload; // [{}, {}]
    },
    onDeleteLoadPerUsu: (state, action) => {
      const { payload } = action; // payload contine el id del toDo a eliminar
      const newTodoList = state.listaPersonasUsu.filter(
        (todo) => todo.id !== payload
      );
      state.listaPersonasUsu = newTodoList;
    },
    onAddPerUsu: (state, action) => {
      const { payload } = action;
      state.listaPersonasUsu = [...state.listaPersonasUsu , payload];
    },
  },
});

export const { onInitialLoadPerUsu, onDeleteLoadPerUsu, onAddPerUsu } =
  personasUsuarioSlice.actions;
export default personasUsuarioSlice.reducer;
