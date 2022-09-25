import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: "all",
  sort: {
    likes: "desc",
  },
};

const homeFeedConfigSlice = createSlice({
  name: "homeFeedConfig",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export default homeFeedConfigSlice.reducer;

export const { setCategory, setSort } = homeFeedConfigSlice.actions;
export const selectedCategorySelector = (state) => state.homeFeed.category;
export const selectedSortSelector = (state) => state.homeFeed.sort;
