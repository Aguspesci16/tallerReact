import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listaPersonasCen: [],
};

export const personasCensadasSlice = createSlice({
  name: "perCen",
  initialState,
  reducers: {
    onInitialLoadPerCen: (state, action) => {
      state.listaPersonasCen= action.payload; // [{}, {}]
    },
  },
});

export const { onInitialLoadPerCen } = personasCensadasSlice.actions;
export default personasCensadasSlice.reducer;
