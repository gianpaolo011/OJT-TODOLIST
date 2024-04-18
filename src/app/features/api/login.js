import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const login = createApi({
  reducerPath: 'login',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://10.10.10.17:8001/api' }),
  endpoints: (builder) => ({
    Login: builder.mutation({
      query: (body) => ({ url: '/login', method: 'POST', body }),
    }),
  }),
})

export const { useLoginMutation } = login
