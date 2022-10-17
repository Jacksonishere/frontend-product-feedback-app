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
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    getFeedbacks: builder.query({
      query: ({ offset = 1, limit = 15, category, sort }) => ({
        url: "/feedbacks",
        method: "GET",
        params: { offset, limit, category, sort: JSON.stringify(sort) },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((feedback) => ({
                type: "Feedback",
                id: feedback.id,
              })),
              { type: "Feedbacks", id: "LIST" },
            ]
          : [{ type: "Feedbacks", id: "LIST" }],
    }),
    getFeedback: builder.query({
      query: (id) => ({
        url: `/feedbacks/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Feedback", id }],
    }),
    createFeedack: builder.mutation({
      query: (feedback) => ({
        url: "/feedbacks",
        method: "POST",
        body: feedback,
      }),
    }),
    updateFeedback: builder.mutation({
      query: (feedback) => ({
        url: `/feedbacks/${feedback.id}`,
        method: "PATCH",
        body: feedback,
      }),
    }),
    updateLike: builder.mutation({
      query: ({ likeable_type, likeable_id }) => ({
        url: "/likes",
        method: "PATCH",
        params: { likeable_type, likeable_id },
      }),
    }),
    createComment: builder.mutation({
      query: (comment) => ({
        url: "/comments",
        method: "POST",
        body: comment,
      }),
    }),
  }),
});

export default feedbackApi;
export const {
  useGetFeedbackQuery,
  useGetFeedbacksQuery,
  useUpdateLikeMutation,
  useCreateFeedackMutation,
  useUpdateFeedbackMutation,
  useCreateCommentMutation,
} = feedbackApi;
