import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { http, useHttp } from 'utils/http';

// 草稿

const initialState = {
  data: [],
  status: 'idle',
  error: null
}

export const fetchCategory: any = createAsyncThunk('category/fetchCategory', async (cb: () => void = () => { }) => {
  const { errorCode: code, data } = await http('category');
  if (code === 0) {
    return data;
  } else {
    return []
  }
})

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {

  },
  extraReducers: {
    [fetchCategory.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchCategory.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload.data
    },
    [fetchCategory.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
  }
})

export default categorySlice.reducer

export const selectAllCategory = (state: { category: { data: any[]; }; }) => state.category.data;