import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
      query: (offset = 1, limit = 15) => ({
        url: "/feedbacks",
        method: "GET",
        params: { offset, limit },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((feedback) => ({
                type: "Feedbacks",
                id: feedback.id,
              })),
              { type: "Feedbacks" },
            ]
          : ["Feedbacks"],
    }),
    createLike: builder.mutation({
      query: (id) => ({
        url: "/likes",
        method: "POST",
        params: { likeable_type: "feedback", likeable_id: id },
      }),
      // invalidatesTags:
    }),
    destroyLike: builder.mutation({
      query: (id) => ({
        url: "/likes",
        method: "DESTROY",
        params: { likeable_type: "feedback", likeable_id: id },
      }),
    }),
  }),
});

export default feedbackApi;
export const {
  useGetFeedbacksQuery,
  useCreateLikeMutation,
  useDestroyLikeMutation,
} = feedbackApi;
