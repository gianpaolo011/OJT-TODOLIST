import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import CryptoJS from 'crypto-js'

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://10.10.10.17:8001/api',
    tagTypes: ['Todo'],
    prepareHeaders: (headers) => {
      const decryptedtoken = function () {
        const token = localStorage.getItem('token')
        console.log({ token })
        try {
          const bytes = CryptoJS.AES.decrypt(
            token,
            import.meta.env.VITE_CRYPTO_SALT_KEY,
          )

          if (bytes && bytes.sigBytes > 0) {
            const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))

            if (decryptedData) {
              return decryptedData
            }
          }
        } catch (error) {
          return null
        }
      }
      const token = decryptedtoken()
      console.log(token, 'token')

      headers.set('Accept', 'application/json')
      headers.set('Authorization', `Bearer ${token}`)
      return headers
    },
  }),
  reducerPath: 'apiSlice',

  endpoints: (builder) => ({
    getTodos: builder.query({
      query: (params) => ({ url: '/task', method: 'GET', params }),
      // transformResponse: (response) => response.sort((a, b) => b.id - a.id),
      providesTags: ['Todo'],
    }),

    addTodo: builder.mutation({
      query: (todo) => ({
        url: '/task',
        method: 'POST',
        body: todo,
      }),
      invalidatesTags: (_, error) => (error ? [] : ['Todo']),
    }),
    updateTodo: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/task/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_, error) => (error ? [] : ['Todo']),
    }),
    updateTodostatus: builder.mutation({
      query: (todo) => ({
        url: `/status_change/${todo.id}`,
        method: 'PATCH',
        body: todo,
      }),
      invalidatesTags: (_, error) => (error ? [] : ['Todo']),
    }),

    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/task/archive/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: (_, error) => (error ? [] : ['Todo']),
    }),
  }),
})

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useUpdateTodostatusMutation,
  useDeleteTodoMutation,
} = apiSlice
