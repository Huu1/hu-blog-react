import { configureStore } from '@reduxjs/toolkit'
import draftSlice from './feature/draftSlice'


export default configureStore({
  reducer: {
    drafts: draftSlice
  }
})