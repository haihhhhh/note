// "use client";
import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'

import { rootReducer } from '@/lib/rootReducer'

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  // middleware: getDefaultMiddleware => getDefaultMiddleware({
  //   serializableCheck: false, // 禁用序列化检查
  // }).concat(logger),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof rootReducer>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
