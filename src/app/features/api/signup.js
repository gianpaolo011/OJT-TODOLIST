import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const signup = createApi({
    reducerPath: 'sign_up',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://10.10.10.17:8001/api/' }),
  endpoints: (builder) => ({
    Signup: builder.mutation({
      query: (body) => ({ url: '/users/sign_up', method: 'POST', body }),
    }),
  }),
})

export const { useSignupMutation } = signup
