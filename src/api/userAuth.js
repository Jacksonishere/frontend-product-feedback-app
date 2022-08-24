import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1",
  }),
  endpoints: (builder) => ({
    signInUser: builder.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
    signOutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "DELETE",
      }),
    }),
  }),
});

export default authApi;
export const { useSignInUserQuery, useSignOutUserQuery } = authApi;
