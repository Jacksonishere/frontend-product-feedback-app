import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: "all",
  sort: {
    label: "Most Upvotes",
    value: {
      likes: "desc",
    },
  },
  offset: 1,
  limit: 15,
  reset: 0,
};

const homeFeedConfigSlice = createSlice({
  name: "homeFeedConfig",
  initialState,
  reducers: {
    setCategory: (state, action) => ({
      ...state,
      offset: 1,
      reset: state.reset + 1, //workaround for forcing rtkquery to refresh when reclicking tag. its sort of like refreshing on clicking tag type.
      category: action.payload,
    }),
    setSort: (state, action) => ({
      ...state,
      offset: 1,
      sort: action.payload,
    }),
    setNextPage: (state) => {
      state.offset += 1;
    },
  },
});

export default homeFeedConfigSlice.reducer;

export const { setCategory, setSort, setNextPage } =
  homeFeedConfigSlice.actions;
export const selectedCategorySelector = (state) => state.homeFeed.category;
export const selectedSortSelector = (state) => state.homeFeed.sort;
export const offsetSelector = (state) => state.homeFeed.offset;
export const limitSelector = (state) => state.homeFeed.limit;
