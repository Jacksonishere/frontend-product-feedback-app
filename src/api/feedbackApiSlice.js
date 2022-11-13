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
        params: { offset, limit, category, sort: JSON.stringify(sort.value) },
      }),
    }),
    getFeedback: builder.query({
      query: (id) => ({
        url: `/feedbacks/${id}`,
        method: "GET",
      }),
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
    deleteFeedback: builder.mutation({
      query: (feedback_id) => ({
        url: `/feedbacks/${feedback_id}`,
        method: "DELETE",
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
    getParentComments: builder.query({
      query: ({ offset = 1, limit = 10, feedback_id }) => ({
        url: "/parent_comments",
        method: "GET",
        params: { offset, limit, feedback_id },
      }),
    }),
    getReplies: builder.query({
      query: ({ offset = 1, limit = 5, parent_id }) => ({
        url: "/replies",
        method: "GET",
        params: { offset, limit, parent_id },
      }),
    }),
    getStatusCount: builder.query({
      query: () => ({
        url: "/status_count",
        method: "GET",
      }),
    }),
    getFeedbacksByStatuses: builder.query({
      // keepUnusedDataFor: 30,
      query: () => ({
        url: "/feedbacks_by_statuses",
        method: "GET",
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
  useDeleteFeedbackMutation,
  useCreateCommentMutation,
  useGetParentCommentsQuery,
  useGetRepliesQuery,
  useGetStatusCountQuery,
  useGetFeedbacksByStatusesQuery,
} = feedbackApi;
