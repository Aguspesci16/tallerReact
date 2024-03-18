import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ocupaciones: [],
};

export const ocupacionesSlice = createSlice({
  name: "ocu",
  initialState,
  reducers: {
    onInitialLoadOcu: (state, action) => {
      state.ocupaciones = action.payload; // [{}, {}]
    },
  },
});

export const { onInitialLoadOcu } = ocupacionesSlice.actions;
export default ocupacionesSlice.reducer;