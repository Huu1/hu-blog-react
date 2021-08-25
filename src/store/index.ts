import { configureStore } from '@reduxjs/toolkit'
import categorySlice from './feature/categorySlice'
import draftSlice from './feature/draftSlice'


export default configureStore({
  reducer: {
    drafts: draftSlice,
    category: categorySlice,
  }
})