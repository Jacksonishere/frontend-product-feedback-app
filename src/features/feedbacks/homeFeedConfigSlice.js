import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: "all",
  sort: {
    likes: "desc",
  },
  offset: 1,
  limit: 15,
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
export const offsetSelector = (state) => state.homeFeed.offset;
export const limitSelector = (state) => state.homeFeed.limit;
