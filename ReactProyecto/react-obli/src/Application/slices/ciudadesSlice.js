import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ciudades: [],
};

export const ciudadesSlice = createSlice({
  name: "ciud",
  initialState,
  reducers: {
    onInitialLoadCiud: (state, action) => {
      state.ciudades = action.payload; // [{}, {}]
    },
  },
});

export const { onInitialLoadCiud } = ciudadesSlice.actions;
export default ciudadesSlice.reducer;