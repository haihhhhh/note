// // articleSlice.ts
// import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit'
// import { ZodIssue } from 'zod'

// import { EditorFormStateCode } from '@/components/Editor'
// import { RootState } from '@/lib/store'

// export interface EditorFormState {
//   message: string
//   code: string
//   errors?: ZodIssue[]
// }

// export const initialState: EditorFormState = {
//   message: '',
//   code: EditorFormStateCode.Error,
//   errors: [],
// }
// const articleSlice = createSlice({
//   name: 'articles',
//   initialState,
//   reducers: {
//     formSubmit(state, { payload }: PayloadAction<EditorFormState>) {
//       state.message = payload.message
//       state.code = payload.code
//       state.errors = payload.errors
//     },
//   },
// })
// export const articleSliceActions = articleSlice.actions

// export const formCode = createSelector(
//   (state: RootState) => state.articles.code,
//   code => code,
// )

// // 导出reducer属性
// export default articleSlice.reducer
