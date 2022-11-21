import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL ?? "http://localhost:3111/api/v1",
    sameSite: "none",
    secure: true,
    credentials: "include",
    mode: "cors",
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
        url: "signout",
        method: "DELETE",
      }),
    }),
    signUpUser: builder.mutation({
      query: (userInfo) => ({
        url: "signup",
        method: "POST",
        body: userInfo,
      }),
    }),
    isLoggedIn: builder.query({
      query: () => "is_logged_in",
    }),
  }),
});

export default authApi;
export const {
  useSignInUserMutation,
  useSignOutUserMutation,
  useSignUpUserMutation,
  useIsLoggedInQuery,
} = authApi;
