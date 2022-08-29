import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  type: "",
  msg: "",
  id: 0,
  // action: null,
};

// can have predefined type of flash messages / conditional render for specific one
const flashSlice = createSlice({
  name: "flash",
  initialState,
  reducers: {
    showFlash: (_, action) => {
      return action.payload;
    },
    hideFlash: () => {
      return { show: false, type: "", msg: "" };
    },
  },
});

export default flashSlice.reducer;
export const { showFlash, hideFlash } = flashSlice.actions;
