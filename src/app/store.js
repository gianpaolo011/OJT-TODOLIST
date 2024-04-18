import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './features/api/apiSlice'
import { login } from './features/api/login'
import { signup } from './features/api/signup'
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [login.reducerPath]: login.reducer,
    [signup.reducerPath]: signup.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([apiSlice.middleware, login.middleware, signup.middleware]),
})
