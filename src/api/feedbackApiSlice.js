import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { current } from "@reduxjs/toolkit";

window.current = current;
export const feedbackApi = createApi({
  reducerPath: "feedbackApi",
  tagTypes: ["Feedbacks", "Likes"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3111/api/v1",
    sameSite: "None",
    secure: true,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getFeedbacks: builder.query({
      query: ({ offset = 1, limit = 15, category, sort }) => ({
        url: "/feedbacks",
        method: "GET",
        params: { offset, limit, category },
      }),
      // If there are results, then the tags are the individual Feedback's with their id, and then a general tag, which is a List of Feedbacks
      providesTags: (result) =>
        result
          ? [
              ...result.map((feedback) => ({
                type: "Feedback",
                id: feedback.id,
              })),
              { type: "Feedback", id: "LIST" },
            ]
          : [{ type: "Feedback", id: "LIST" }],
    }),
    getFeedback: builder.query({
      query: (id) => ({
        url: `/feedbacks/${id}`,
        method: "GET",
      }),
      // If there are results, then the tags are the individual Feedback's with their id, and then a general tag, which is a List of Feedbacks
      providesTags: (result, error, id) => [{ type: "Feedback", id }],
    }),
    createLike: builder.mutation({
      query: ({ likeable_type, likeable_id }) => ({
        url: "/likes",
        method: "POST",
        params: { likeable_type, likeable_id },
      }),
      async onQueryStarted(
        { likeable_id },
        { dispatch, queryFulfilled, getState }
      ) {
        let patchResults = [];
        for (const {
          endpointName,
          originalArgs,
        } of feedbackApi.util.selectInvalidatedBy(getState(), [
          { type: "Feedback", id: likeable_id },
        ])) {
          patchResults.push(
            dispatch(
              feedbackApi.util.updateQueryData(
                endpointName,
                originalArgs,
                (draft) => {
                  let updateLikeable;
                  if (endpointName === "getFeedbacks") {
                    updateLikeable = draft.find(
                      (likeable) => likeable.id === likeable_id
                    );
                  } else {
                    updateLikeable = draft;
                  }
                  updateLikeable.num_likes = updateLikeable.num_likes + 1;
                  updateLikeable.user_liked = true;
                }
              )
            )
          );
        }
        queryFulfilled.catch(() => {
          patchResults.forEach((patch) => patch.undo());
        });
      },
      // Invalidate a specific feedback.
      invalidatesTags: (result, error, { likeable_type, likeable_id }) => {
        return [{ type: "Feedbacks", id: likeable_id }];
      },
    }),
    destroyLike: builder.mutation({
      query: ({ likeable_type, likeable_id }) => ({
        url: "/likes",
        method: "DELETE",
        params: { likeable_type, likeable_id },
      }),
      async onQueryStarted(
        { likeable_id },
        { dispatch, queryFulfilled, getState }
      ) {
        let patchResults = [];
        for (const {
          endpointName,
          originalArgs,
        } of feedbackApi.util.selectInvalidatedBy(getState(), [
          { type: "Feedback", id: likeable_id },
        ])) {
          patchResults.push(
            dispatch(
              feedbackApi.util.updateQueryData(
                endpointName,
                originalArgs,
                (draft) => {
                  let updateLikeable;
                  if (endpointName === "getFeedbacks") {
                    updateLikeable = draft.find(
                      (likeable) => likeable.id === likeable_id
                    );
                  } else {
                    updateLikeable = draft;
                  }
                  updateLikeable.num_likes = updateLikeable.num_likes - 1;
                  updateLikeable.user_liked = false;
                }
              )
            )
          );
        }
        queryFulfilled.catch(() => {
          patchResults.forEach((patch) => patch.undo());
        });
      },
      // Invalidate a specific feedback.
      invalidatesTags: (result, error, { likeable_type, likeable_id }) => {
        return [{ type: "Feedbacks", id: likeable_id }];
      },
    }),
  }),
});

export default feedbackApi;
export const {
  useGetFeedbackQuery,
  useGetFeedbacksQuery,
  useCreateLikeMutation,
  useDestroyLikeMutation,
} = feedbackApi;
